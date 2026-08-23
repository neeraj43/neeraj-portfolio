/* ==================================================================
   PROJECTS — the most important content on this site.

   These four entries are SCAFFOLDS. The structure is what matters:
   it is the shape a senior reviewer is scanning for. Replace the
   prose with your real work.

   What makes a project card land, in priority order:
     1. problem   — the real constraint, stated plainly
     2. approach  — your architecture, specific enough to be checked
     3. tradeoff  — what you gave up and why. THIS is the senior
                    signal. Anyone can list what they built; leads
                    explain what they chose not to build.
     4. results   — measured, defensible outcomes
     5. links     — a repo or demo beats every adjective on the page

   Leave `results` empty rather than inventing a number. Empty
   results simply don't render.

   Two real projects beat six thin ones. Delete what you don't have.
   ================================================================== */

export const projects = [
  {
    name: 'Prompt Evaluator',
    tagline: 'A prompt reviewer that can read your repo',
    year: '2026',
    status: 'Open source',
    featured: true,
    demo: 'prompt-eval', // renders the live panel below
    problem:
      'Prompts fail for boring, fixable reasons — no success criteria, no boundaries, a target the agent has to go hunting for — and you only find out after the run is spent. Hosted prompt graders can name the symptom but never the fix, because the most useful advice ("reference src/auth/session.ts") requires seeing the codebase they are not in.',
    approach: [
      'Built as a Claude Code skill rather than an app, so it runs where the code is: it resolves the nouns in a prompt to real paths, checks that paths the prompt already cites still exist, and flags when "the auth module" matches four directories.',
      'Five rubrics chosen by prompt type — agent task, one-shot, system prompt, extraction, research — because scoring "write me a poem" against "needs file references" is nonsense. Each is a weighted set of dimensions, and the percentage is arithmetic over them rather than an impression.',
      'Anchored 0/3/6/8/10 levels and a committed calibration set, including a deliberately well-written prompt that still scores 52, because the real failure mode is letting one fluent sentence pull the whole score up.',
    ],
    tradeoff:
      'Chose a Claude Code skill over a shareable web tool, trading reach for repo access — a link anyone can open would have been the better portfolio artifact and the worse instrument. Second call: the default answer for "what should I remove" is nothing. Weak prompts are starved, not bloated, and a shortening pass deletes exactly the highest-value words, so REMOVE only fires on named patterns that cost you something.',
    results: [
      'Grade inflation is the whole engineering problem: ask any model to score a prompt and it returns 70-85% almost regardless of input, which makes the number worthless. Anchors, scoring dimensions before totals, and a worked calibration set are what hold the scale honest.',
      'Ships with a not-findings list — length, politeness, structure, jargon you do not recognise — because a review that flags those is a review people stop asking for.',
    ],
    stack: ['Claude Code', 'Skills', 'Prompt engineering', 'Bash'],
    links: { repo: 'https://github.com/neeraj43/prompt-eval', demo: '', writeup: '' },
  },
  {
    name: 'Agent Evaluation Harness',
    tagline: 'Regression testing for non-deterministic systems',
    year: '2025',
    status: 'Internal',
    featured: true,
    problem:
      'Agent behaviour drifts silently. A prompt tweak, a model version bump or a changed tool description can degrade quality with nothing failing in CI — and in a regulated environment "it looked fine in the demo" is not a release criterion.',
    approach: [
      'Golden dataset of real task traces, versioned alongside the agent code so a change set carries its own evidence.',
      'Deterministic scorers for anything checkable — schema validity, tool-call correctness, citation grounding — with LLM-as-judge reserved for genuinely subjective dimensions.',
      'Runs as a CI gate: score deltas against the previous release are surfaced on the pull request, so quality regressions block merge the same way test failures do.',
    ],
    tradeoff:
      'Deliberately kept LLM-as-judge to a minority of the score. It is cheap to add and expensive to trust — judges drift too, and a scoring layer nobody believes is worse than no scoring layer at all.',
    results: [], // TODO: e.g. 'Cut agent regressions caught in production to near zero'
    stack: ['Python', 'LLM APIs', 'Pytest', 'CI/CD'],
    links: { repo: '', demo: '', writeup: '' },
  },
  {
    name: 'Grounded RAG Pipeline',
    tagline: 'Retrieval that admits when it does not know',
    year: '2025',
    status: 'Open source',
    featured: true,
    problem:
      'Naive RAG confidently answers from irrelevant chunks. For anything compliance-adjacent, a plausible wrong answer is far more dangerous than no answer.',
    approach: [
      'Hybrid retrieval — dense vectors plus BM25 — then a cross-encoder rerank, because lexical matching still wins on identifiers, codes and exact terminology.',
      'Every claim in the response carries a span-level citation back to source; uncited output is treated as a failure, not a stylistic preference.',
      'An explicit abstention path: below a relevance threshold the system says it cannot answer rather than degrading gracefully into invention.',
    ],
    tradeoff:
      'Reranking added meaningful latency per query. Kept it anyway — for this use case a slower correct answer beats a fast wrong one, and the retrieval step was cached to claw back most of the cost on repeat queries.',
    results: [], // TODO
    stack: ['Python', 'FastAPI', 'Vector DB', 'Embeddings', 'Reranking'],
    links: { repo: '', demo: '', writeup: '' },
  },
  {
    name: 'MCP Tool Server',
    tagline: 'Safe tool access for agents',
    year: '2025',
    status: 'Open source',
    featured: false,
    problem:
      'Agents need real tools to be useful, and every tool is a new blast radius. Handing a model unscoped access to internal systems is not an option.',
    approach: [
      'Model Context Protocol server exposing internal capabilities as typed, individually-scoped tools.',
      'Per-tool permissions with human approval required for any mutating call.',
      'Full audit trail of every invocation — arguments, result, and the decision that led to it — because "why did it do that?" needs an answer.',
    ],
    tradeoff:
      'Chose narrow, explicit tools over a small number of flexible ones. More surface to maintain, but each call is reviewable and the model has far less room to improvise.',
    results: [],
    stack: ['Python', 'MCP', 'TypeScript'],
    links: { repo: '', demo: '', writeup: '' },
  },
  {
    name: 'LLM Cost & Latency Observability',
    tagline: 'Making token spend visible before finance does',
    year: '2024',
    status: 'Internal',
    featured: false,
    problem:
      'LLM costs are invisible until the invoice lands. Teams had no per-feature view of token spend, and no way to tell whether a latency spike came from their code or the model provider.',
    approach: [
      'Traced every call with token counts, latency and cache-hit status, attributed down to feature and team.',
      'Dashboards and budget alerts that fire on trend, not just on threshold.',
      'Prompt-caching and model-routing recommendations derived from the traffic actually observed.',
    ],
    tradeoff:
      'Sampled full request/response payloads rather than capturing everything — storage and privacy exposure both scale badly, and aggregate metrics answered most questions on their own.',
    results: [],
    stack: ['Python', 'OpenTelemetry', 'Grafana'],
    links: { repo: '', demo: '', writeup: '' },
  },
]
