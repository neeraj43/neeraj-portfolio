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
    role: 'Associate Vice President',
    period: 'Oct 2025 — Present',
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
    stack: ['Python', 'LLM APIs', 'Agent frameworks', 'RAG', 'Evals', 'TypeScript'],
    metric: { value: '', label: '' }, // e.g. { value: '40+', label: 'engineers onboarded' }
  },
  {
    company: 'Gupshup',
    role: 'Senior Software Engineer II',
    period: '2021 — 2025',
    focus: 'Conversational messaging at scale',
    summary:
      'Took a monolithic messaging product to a modular micro-frontend architecture, and owned the surface from the component library down to the Java services behind it.',
    highlights: [
      'Led the migration from a monolith to a modular micro-frontend system using Module Federation and Storybook, so teams could develop in parallel and deploy independently.',
      'Owned the UI and API layers end to end, integrating Java microservices over REST and GraphQL, and tuned rendering with lazy loading, memoisation and suspense.',
      'Shipped components and features from ideation to production in React, Next.js and TypeScript — one stretch of that work lifted user engagement 25%.',
      'Enforced the security practice on that surface: input validation, rate limiting, JWT encryption and cookie handling, backed by CI/CD and CloudWatch monitoring.',
    ],
    stack: ['React', 'Next.js', 'TypeScript', 'Module Federation', 'Java', 'GraphQL', 'AWS'],
    metric: { value: '', label: '' },
  },
  {
    company: 'Jungleworks',
    role: 'UI Lead Engineer',
    period: '2017 — 2021',
    focus: 'Real-time logistics',
    summary:
      'Led the front end of Tookan, a real-time logistics dashboard — interactive maps and live driver tracking, for products used by thousands of businesses.',
    highlights: [
      'Led full-stack work on the Tookan dashboard, delivering interactive maps and live driver tracking over WebSockets.',
      'Built reusable component libraries in React and Angular, cutting development time 40% across features reaching 5,000+ business users.',
      'Mentored junior engineers, raised code-review standards, and enforced unit and integration coverage with Jest, Jasmine and Karma.',
      'Designed backend connectors in Java and shaped the data access, storage and logging strategy.',
    ],
    stack: ['React', 'Angular', 'Java', 'WebSockets', 'MySQL'],
    metric: { value: '', label: '' },
  },
]
