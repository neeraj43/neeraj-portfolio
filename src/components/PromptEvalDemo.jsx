import { useMemo, useState } from 'react'
import { Check, Minus, X } from 'lucide-react'
import { promptExamples } from '../data/promptExamples'
import { checkPrompt } from '../lib/promptCheck'

/**
 * Live panel for the prompt evaluator.
 *
 * The honest split is the point of the design: the structural checks and the
 * removal patterns genuinely run on whatever you type, here, now. The
 * percentage and the dimension scores come from a model, so for the sample
 * prompts they are shown as recorded skill output and labelled that way —
 * and for your own prompt they are simply not shown. Faking that number would
 * undercut the one claim the project makes.
 */

const BAND = (n) =>
  n < 40 ? 'weak' : n < 60 ? 'workable' : n < 80 ? 'solid' : n < 90 ? 'strong' : 'publishable'

function Bar({ value, max = 10, tone }) {
  return (
    <span className="inline-flex h-1.5 w-14 shrink-0 overflow-hidden rounded-full bg-line align-middle">
      <span
        className={`h-full rounded-full ${tone} transition-[width] duration-500`}
        style={{ width: `${(value / max) * 100}%` }}
      />
    </span>
  )
}

export function PromptEvalDemo() {
  const [text, setText] = useState(promptExamples[0].text)

  const result = useMemo(() => checkPrompt(text), [text])
  const example = useMemo(
    () => promptExamples.find((e) => e.text.trim() === text.trim()) ?? null,
    [text],
  )

  return (
    <div className="mt-7 overflow-hidden rounded-xl border border-line bg-subtle/40">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-line px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-ok" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-ok" />
          </span>
          <p className="label !text-ink">Live · checks run in your browser</p>
        </div>
        <p className="ml-auto font-mono text-2xs text-faint">
          {result.words} {result.words === 1 ? 'word' : 'words'}
        </p>
      </div>

      {/* ------------------------------------------------------------- input */}
      <div className="border-b border-line px-4 py-3">
        <div className="mb-2.5 flex flex-wrap gap-1.5">
          {promptExamples.map((e) => (
            <button
              key={e.id}
              type="button"
              onClick={() => setText(e.text)}
              className={`rounded-md border px-2 py-1 font-mono text-2xs transition-colors ${
                example?.id === e.id
                  ? 'border-accent/40 bg-accent/10 text-accent'
                  : 'border-line text-muted hover:border-accent/50 hover:text-ink'
              }`}
            >
              {e.chip}
            </button>
          ))}
        </div>

        <label className="sr-only" htmlFor="prompt-input">
          Prompt to evaluate
        </label>
        <textarea
          id="prompt-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          spellCheck={false}
          placeholder="Paste a prompt…"
          className="w-full resize-y rounded-lg border border-line bg-elev px-3 py-2 font-mono text-[13px] leading-relaxed text-ink outline-none transition-colors placeholder:text-faint focus:border-accent/50"
        />
      </div>

      {/* ----------------------------------------------------------- signals */}
      <div className="grid gap-x-8 gap-y-5 px-4 py-4 lg:grid-cols-2">
        <div>
          <p className="label mb-2.5">
            Structural signals · {result.covered}/{result.signals.length}
          </p>
          <ul className="space-y-1.5">
            {result.signals.map((s) => (
              <li key={s.id} className="flex items-baseline gap-2 text-[13px]">
                {s.present ? (
                  <Check className="h-3 w-3 shrink-0 translate-y-0.5 text-ok" />
                ) : (
                  <X className="h-3 w-3 shrink-0 translate-y-0.5 text-bad" />
                )}
                <span className={`shrink-0 whitespace-nowrap ${s.present ? 'text-ink' : 'text-muted'}`}>
                  {s.label}
                </span>
                {!s.present && <span className="text-faint">— {s.want}</span>}
              </li>
            ))}
          </ul>
          {result.tooShort && (
            <p className="mt-2.5 text-[13px] text-muted">
              Under 15 words. There is not room for the information — this is
              almost never above 40%.
            </p>
          )}
        </div>

        <div>
          <p className="label mb-2.5">
            Worth removing · {result.removals.length || 'nothing'}
          </p>
          {result.removals.length === 0 ? (
            <p className="flex items-baseline gap-2 text-[13px] text-muted">
              <Minus className="h-3 w-3 shrink-0 translate-y-0.5 text-faint" />
              {text.trim()
                ? 'Nothing worth cutting. Weak prompts are usually starved, not bloated.'
                : 'Paste a prompt to check.'}
            </p>
          ) : (
            <ul className="space-y-2">
              {result.removals.map((r) => (
                <li key={r.id} className="text-[13px]">
                  <span className="text-bad">{r.label}</span>{' '}
                  <span className="font-mono text-2xs text-muted">{r.hits.join(' · ')}</span>
                  <p className="text-faint">{r.cost}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* --------------------------------------------- recorded model scoring */}
      {example ? (
        <div className="border-t border-line px-4 py-4">
          <div className="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="font-mono text-sm font-semibold text-ink">
              {example.score}%
            </span>
            <span className="font-mono text-2xs uppercase tracking-[0.12em] text-accent">
              {BAND(example.score)}
            </span>
            <span className="font-mono text-2xs text-faint">type: {example.type}</span>
            <span className="ml-auto font-mono text-2xs text-faint">
              recorded from the skill — not computed here
            </span>
          </div>

          <ul className="grid gap-x-8 gap-y-1.5 lg:grid-cols-2">
            {example.dimensions.map((d) => (
              <li key={d.name} className="flex items-baseline gap-2 text-[13px] leading-snug">
                <span className="w-28 shrink-0 text-muted">{d.name}</span>
                <Bar
                  value={d.score}
                  tone={d.score >= 8 ? 'bg-ok' : d.score >= 5 ? 'bg-accent' : 'bg-bad'}
                />
                <span className="w-7 shrink-0 text-right font-mono text-2xs tabular-nums text-faint">
                  {d.score}
                </span>
                <span className="min-w-0 flex-1 text-faint">{d.note}</span>
              </li>
            ))}
          </ul>

          <p className="mt-3 border-t border-line-soft pt-3 text-[13px] text-muted">
            {example.verdict}
          </p>
        </div>
      ) : (
        <div className="border-t border-line px-4 py-4">
          <p className="text-[13px] leading-relaxed text-muted">
            The weighted percentage needs a model to judge whether the task is
            actually clear — no regex does that, so it is not shown for your own
            text. Pick a sample above to see a real scored report, or run{' '}
            <code className="font-mono text-2xs text-accent">/prompt-eval</code>{' '}
            in your own repo, where it can also resolve the files your prompt
            implies.
          </p>
        </div>
      )}

      <div className="border-t border-line bg-elev/50 px-4 py-2.5">
        <p className="font-mono text-2xs leading-relaxed text-faint">
          structural signals + removal patterns computed live · dimension scores
          recorded from the skill · nothing sent anywhere
        </p>
      </div>
    </div>
  )
}
