/* ------------------------------------------------------------------
   Roles, framed around impact and leadership rather than tech lists.

   NOTE ON NUMBERS: every `metric` below is intentionally left blank.
   Fill them only with figures you can defend in an interview and are
   cleared to share. An empty metric is simply not rendered — that is
   far better than a number you have to walk back.
   ------------------------------------------------------------------ */

export const experience = [
  {
    company: 'JPMorgan Chase & Co.',
    role: 'Software Engineer III', // TODO: confirm exact title
    period: '2024 — Present',
    current: true,
    focus: 'Agentic AI · Developer platforms',
    summary:
      'Driving adoption of AI agents across engineering teams — building the evaluation harnesses, guardrails and internal tooling that let developers ship LLM-backed features inside a regulated bank.',
    highlights: [
      'Designed and built agent workflows that automate engineering tasks previously done by hand, with human-in-the-loop checkpoints at every step that touches customer or regulated data.',
      'Built the evaluation layer — golden datasets, regression suites and scoring — so agent changes are measured before release rather than judged by demo.',
      'Established guardrail patterns for prompt injection, PII handling and output validation that other teams now adopt as a baseline.',
      'Act as the bridge between engineers new to LLMs and the platform: reviewing designs, running enablement sessions, and turning one-off experiments into reusable internal components.',
    ],
    stack: ['Python', 'LLM APIs', 'Agent frameworks', 'RAG', 'Evals', 'Angular', '.NET'],
    metric: { value: '', label: '' }, // e.g. { value: '40+', label: 'engineers onboarded' }
  },
  {
    company: 'Gupshup',
    role: 'Lead Full-Stack Developer',
    period: '2021 — 2024',
    focus: 'High-throughput messaging platforms',
    summary:
      'Led a team modernising high-traffic messaging infrastructure — breaking a monolith into services that could absorb conversational load at scale.',
    highlights: [
      'Led the decomposition of a legacy messaging monolith into independently deployable services, sequencing the migration so production traffic was never at risk.',
      'Replaced brittle REST surfaces with a typed GraphQL gateway, cutting the round trips clients needed and simplifying downstream integration.',
      'Owned technical direction and code review for the team, and mentored engineers through the shift to distributed thinking.',
    ],
    stack: ['Node.js', 'GraphQL', 'React', 'Docker', 'Microservices'],
    metric: { value: '', label: '' },
  },
  {
    company: 'Jungleworks',
    role: 'Software Engineer — Full-Stack',
    period: '2017 — 2021',
    focus: 'Real-time logistics',
    summary:
      'Built real-time location and dispatch systems for logistics products, plus the Android and web clients consuming them.',
    highlights: [
      'Built ingestion pipelines handling continuous location streams from field devices without dropping events under peak load.',
      'Shipped Android and web clients end to end, from API design through to release.',
      'Cut dashboard load times substantially by reworking how data was aggregated and delivered to the front end.',
    ],
    stack: ['Java', 'Android', 'Angular', 'WebSockets', 'MySQL'],
    metric: { value: '', label: '' },
  },
]
