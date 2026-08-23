/* Sample prompts with the scores the skill actually gave them.
   These are the calibration set from prompt-eval/skill/references/calibration.md —
   recorded model output, not computed on the page. The demo labels them as such. */

export const promptExamples = [
  {
    id: 'weak',
    chip: '17% · vague bug report',
    type: 'agent-task',
    score: 17,
    text: 'fix the login bug',
    dimensions: [
      { name: 'Task clarity', score: 2, note: '"fix" — which behaviour is wrong?' },
      { name: 'Context', score: 1, note: 'no symptom, no repro, no error text' },
      { name: 'Target resolution', score: 1, note: 'nothing to locate the code by' },
      { name: 'Success criteria', score: 0, note: 'unstated' },
      { name: 'Boundaries', score: 0, note: 'nothing said about what must not change' },
      { name: 'Output contract', score: 3, note: 'patch, explanation, or a plan first?' },
      { name: 'Signal-to-noise', score: 7, note: 'nothing to remove — starved, not bloated' },
    ],
    verdict:
      'The canonical starved prompt. Note signal-to-noise is high: there is nothing here to cut.',
  },
  {
    id: 'bloated',
    chip: '34% · bloated blog brief',
    type: 'one-shot',
    score: 34,
    text: 'You are a world-class expert technical writer with 20 years of experience. CRITICAL: Write a professional blog post about AI agents. It MUST be engaging and comprehensive but also concise. Think step by step before writing. Do not be boring. Do not use jargon. Do not ramble.',
    dimensions: [
      { name: 'Task clarity', score: 4, note: 'about AI agents — arguing what, to whom?' },
      { name: 'Audience & register', score: 2, note: '"professional" is not an audience' },
      { name: 'Source material', score: 1, note: 'no facts, no product, no experience to draw on' },
      { name: 'Output contract', score: 3, note: 'no length, no structure, no venue' },
      { name: 'Constraints & taste', score: 3, note: 'prohibitions, but no example of good' },
      { name: 'Scope', score: 5, note: 'one artifact, at least' },
      { name: 'Signal-to-noise', score: 2, note: 'contradiction, pressure language, an incantation' },
    ],
    verdict:
      'Ten times the words of the 17% prompt for seventeen more points. Length is not information.',
  },
  {
    id: 'mid',
    chip: '52% · reads well, still mid',
    type: 'agent-task',
    score: 52,
    text: "In src/auth/session.ts, refresh tokens aren't being rotated on use. Fix it so each refresh issues a new token and invalidates the old one.",
    dimensions: [
      { name: 'Task clarity', score: 8, note: 'one outcome, plainly stated' },
      { name: 'Context', score: 5, note: 'symptom given, no repro or prior attempt' },
      { name: 'Target resolution', score: 9, note: 'exact file named' },
      { name: 'Success criteria', score: 4, note: 'no test, no command, no observable' },
      { name: 'Boundaries', score: 2, note: 'may existing sessions be invalidated? Real user impact.' },
      { name: 'Output contract', score: 5, note: 'unstated' },
      { name: 'Signal-to-noise', score: 8, note: 'clean' },
    ],
    verdict:
      'The example the calibration set exists for: a fluent opening sentence must not pull the whole score up.',
  },
  {
    id: 'strong',
    chip: '78% · strong, not perfect',
    type: 'agent-task',
    score: 78,
    text: 'In `src/auth/session.ts`, refresh tokens are not rotated on use — the same token keeps working after refresh (see the failing case in `tests/auth/session.test.ts`). Make each refresh issue a new token and invalidate the old one, with reuse of an invalidated token revoking the whole session family.\n\nExisting valid sessions must keep working through the deploy; we cannot log everyone out. Don\'t change the public shape of `SessionService`.\n\nVerify with `npm test -- auth`. Hand back a patch plus a note on the migration path.',
    dimensions: [
      { name: 'Task clarity', score: 9, note: 'outcome and edge behaviour both stated' },
      { name: 'Context', score: 8, note: 'symptom, failing test, the constraint' },
      { name: 'Target resolution', score: 9, note: 'file and test both named' },
      { name: 'Success criteria', score: 9, note: 'a command that decides it' },
      { name: 'Boundaries', score: 8, note: 'API shape and live sessions both protected' },
      { name: 'Output contract', score: 8, note: 'patch plus migration note' },
      { name: 'Signal-to-noise', score: 8, note: 'nothing to cut' },
    ],
    verdict:
      '78 and not 95: it never says why sessions must survive, and says nothing about the token store, where invalidation actually has to live. There is almost always a next ten points.',
  },
]
