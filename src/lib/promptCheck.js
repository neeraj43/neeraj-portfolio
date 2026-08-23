/**
 * The deterministic half of the prompt evaluator, running in the browser.
 *
 * An honest boundary matters here. The skill's percentage comes from a model
 * judging things like "is this task clearly stated" — judgement no regex can
 * do, and pretending otherwise would make the demo a lie. So this file
 * implements only the checks that are genuinely mechanical:
 *
 *   • structural signals — does the prompt contain a file reference, a
 *     verification step, a boundary, an output contract, grounding context
 *   • REMOVE patterns — the named things that cost you, each one quotable
 *
 * Those are real findings, computed live on whatever you type. The dimension
 * scores shown for the sample prompts are recorded output from the actual
 * skill, and the UI labels them as such. The gap between the two halves is
 * the argument for the tool being a skill and not a web form.
 *
 * Mirrors: prompt-eval/skill/references/remove.md
 */

const FILE_EXT =
  'js|jsx|ts|tsx|py|go|rs|java|kt|rb|php|cs|css|scss|html|json|ya?ml|md|sql|sh|toml|swift'

/** Structural signals — presence or absence, no judgement required. */
export const SIGNALS = [
  {
    id: 'target',
    label: 'Target',
    want: 'a file, path, symbol or error string to locate the work by',
    test: (t) =>
      new RegExp(`\\b[\\w@./-]+\\.(${FILE_EXT})\\b`).test(t) ||
      /\b(src|lib|app|components?|pages?|services?)\/[\w./-]+/.test(t) ||
      /`[^`]+`/.test(t),
  },
  {
    id: 'grounding',
    label: 'Grounding',
    want: 'the symptom, an error, a version — something only you know',
    test: (t) =>
      // an error, a version, or a described symptom — "X is not doing Y",
      // "keeps happening", "still broken". Symptom descriptions are the most
      // common form and the easiest to miss.
      /\b(error|exception|throws?|fails?|failing|broken|returns?|500|404|401|stack trace|repro|steps to reproduce|currently|instead of|rather than|expected)\b/i.test(
        t,
      ) ||
      // Third-person negated states describe a symptom ("does not rotate").
      // Bare imperatives do not — "do not use jargon" is an instruction, and
      // "don't change the API" is a boundary. Both were false positives here.
      /\b(is|are|was|were|does|has|have)\s+(not|n't)\s+\w+/i.test(t) ||
      /\b(isn'?t|aren'?t|doesn'?t|wasn'?t|weren'?t)\s+\w+/i.test(t) ||
      /\bkeeps?\s+\w+ing\b|\bstill\s+\w+|\beven (after|when|though)\b/i.test(t) ||
      /\bv?\d+\.\d+(\.\d+)?\b/.test(t),
  },
  {
    id: 'success',
    label: 'Success criteria',
    want: 'how you will know it worked — a test, a command, an observable',
    test: (t) =>
      /\b(test|tests|testing|verify|verified|verification|passes?|npm run|yarn |pnpm |pytest|jest|vitest|assert|acceptance|done when|definition of done|so that it)\b/i.test(
        t,
      ),
  },
  {
    id: 'boundaries',
    label: 'Boundaries',
    want: 'what must not change',
    test: (t) =>
      /\b(don'?t change|do not change|do not touch|don'?t touch|without (changing|breaking|touching)|must (keep|stay|remain|continue)|keep the|preserve|unchanged|leave .{1,30} (alone|as is)|out of scope|only change|scope(d)? to)\b/i.test(
        t,
      ),
  },
  {
    id: 'contract',
    label: 'Output contract',
    want: 'what you want handed back, and in what shape',
    test: (t) =>
      /\b(patch|diff|pull request|\bPR\b|plan first|propose|proposal|json|yaml|markdown|table|bullet|list|paragraphs?|words|summary|report|checklist|screenshot)\b/i.test(
        t,
      ),
  },
  {
    id: 'reason',
    label: 'Reason',
    want: 'why — the constraint behind the request',
    test: (t) => /\b(because|so that|since|in order to|the reason|we need to|otherwise)\b/i.test(t),
  },
]

/**
 * Patterns worth removing. Each carries the cost, not just the name — a
 * finding you cannot explain is not a finding.
 */
const REMOVALS = [
  {
    id: 'contradiction',
    label: 'Contradiction',
    cost: 'the model resolves this arbitrarily, so you are rolling dice',
    find: (t) => {
      const pairs = [
        [/\bconcise|brief|short|succinct\b/i, /\bcomprehensive|exhaustive|detailed|thorough|in-?depth\b/i],
        [/\bcreative|original|surprising\b/i, /\b(exactly|strictly) (follow|match|adhere)|template\b/i],
        [/\bsimple|minimal\b/i, /\bcover (all|every)|complete\b/i],
      ]
      const hits = []
      for (const [a, b] of pairs) {
        const ma = t.match(a)
        const mb = t.match(b)
        if (ma && mb) hits.push(`"${ma[0]}" + "${mb[0]}"`)
      }
      return hits
    },
  },
  {
    id: 'pressure',
    label: 'Pressure language',
    cost: 'flattens priority — when everything is critical, nothing is, and the reply hedges',
    find: (t) => {
      const hits = (t.match(/\b(CRITICAL|MUST|NEVER|ALWAYS|IMPORTANT|URGENT|MANDATORY)\b/g) || [])
        .map((m) => `"${m}"`)
      if (/!{2,}/.test(t)) hits.push('"!!"')
      return [...new Set(hits)]
    },
  },
  {
    id: 'incantation',
    label: 'Reasoning incantation',
    cost: 'redundant on a model that reasons natively; asking it to reproduce reasoning can degrade the answer',
    find: (t) => {
      const m = t.match(
        /think step[- ]by[- ]step|take a deep breath|show your (reasoning|work|thinking)|<\/?(scratchpad|thinking)>/gi,
      )
      return m ? [...new Set(m.map((x) => `"${x}"`))] : []
    },
  },
  {
    id: 'persona',
    label: 'Persona preamble',
    cost: 'a costume in place of context — flag it when it is the only context given',
    find: (t) => {
      const m = t.match(
        /\b(you are|act as|pretend to be)\s+(a|an|the)\s+(world[- ]class|expert|senior|professional|master|experienced|10x|best)[^.!?\n]*/i,
      )
      return m ? [`"${m[0].trim().slice(0, 60)}…"`] : []
    },
  },
  {
    id: 'virtue',
    label: 'Generic virtues',
    cost: 'restates trained defaults; spends tokens and teaches nothing',
    find: (t) => {
      const m = t.match(
        /\bbe (accurate|thorough|clear|helpful|professional|detailed)\b|\bhigh[- ]quality\b|\bbest practices\b|\bworld[- ]class\b/gi,
      )
      return m ? [...new Set(m.map((x) => `"${x}"`))] : []
    },
  },
  {
    id: 'prohibitions',
    label: 'Prohibition wall',
    cost: 'describing failure anchors toward it — say what good looks like instead',
    find: (t) => {
      const m = t.match(/\b(do not|don'?t|never|avoid)\b/gi) || []
      return m.length >= 3 ? [`${m.length} prohibitions`] : []
    },
  },
  {
    id: 'wordcap',
    label: 'Hard word cap',
    cost: 'caps starve reasoning; use one only when the number is a real constraint',
    find: (t) => {
      const m = t.match(/\b(at most|no more than|maximum of|max|under)\s+\d+\s+(words|sentences|characters|lines)\b/gi)
      return m ? m.map((x) => `"${x}"`) : []
    },
  },
]

export function checkPrompt(text) {
  const trimmed = (text ?? '').trim()
  const words = trimmed ? trimmed.split(/\s+/).length : 0

  const signals = SIGNALS.map((s) => ({
    id: s.id,
    label: s.label,
    want: s.want,
    present: trimmed ? s.test(trimmed) : false,
  }))

  const removals = REMOVALS.flatMap((r) => {
    const hits = trimmed ? r.find(trimmed) : []
    return hits.length ? [{ id: r.id, label: r.label, cost: r.cost, hits }] : []
  })

  return {
    words,
    signals,
    removals,
    covered: signals.filter((s) => s.present).length,
    /* A prompt this short cannot carry the information, whatever it says. */
    tooShort: words > 0 && words < 15,
  }
}
