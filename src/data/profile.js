/* ------------------------------------------------------------------
   Everything personal lives here. Edit this file, not the components.
   Items marked TODO need your real values before you deploy.
   ------------------------------------------------------------------ */

export const profile = {
  name: 'Neeraj Wadhwani',
  role: 'AI Engineer & Lead',

  // The one line that has to land in three seconds.
  headline: 'I build agentic AI systems that survive production.',

  subhead:
    "Nine years shipping software across the stack. Today I'm embedding AI agents across engineering teams at JPMorgan Chase — with the evaluations, guardrails and cost controls a regulated bank actually demands.",

  status: {
    available: true,
    text: 'Open to Lead / Staff AI engineering roles',
  },

  location: 'Indore, India',
  timezone: 'IST (UTC+5:30) · overlaps EU fully, US mornings',
  email: 'neerajwadhwani43@gmail.com',

  links: {
    github: 'https://github.com/neeraj43',
    linkedin: 'https://www.linkedin.com/in/neeraj-wadhwani-a55085115/',
    leetcode: 'https://leetcode.com/u/Neeraj43/',
    resume: '/Neeraj-Wadhwani-Resume.pdf', // TODO: drop the PDF into /public
    calendar: '', // optional — a Cal.com / Calendly link converts far better than email
  },

  about: [
    "I spent nine years learning how software breaks in the real world — React, Next.js and Angular front ends, Java services behind them, and the deployment plumbing underneath all of it. That range was never the plan; it was the job. But it turned out to be the best possible preparation for what I do now.",

    "Because building with LLMs is not really a modelling problem. It's a systems problem wearing a new hat. Non-deterministic output, latency you can't predict, costs that scale with usage, and failure modes that look nothing like a stack trace. The engineers who handle that well are the ones who have already shipped and operated real systems.",

    "At JPMorgan Chase I work on getting AI agents into the hands of engineering teams — building the evaluation harnesses, guardrails and internal tooling that make LLM features safe to ship inside a bank. The hard part is rarely the prompt. It's proving the thing is reliable, auditable and affordable before it touches anything that matters.",

    "I'm looking for a lead role where I can own that end to end: the architecture, the evaluation culture, and the engineers building it.",
  ],

  /* The four things every section on this site has to keep proving.
     Stated plainly up front so a recruiter sees the shape in one glance.
     No numbers here on purpose — see the note in experience.js. */
  pillars: [
    {
      title: 'Evals',
      body: 'Golden sets, regression suites and scoring, so agent changes are measured before release — not judged by demo.',
    },
    {
      title: 'Guardrails',
      body: 'Prompt injection, PII handling and output validation, designed for a bank that has to answer for every response.',
    },
    {
      title: 'Cost & latency',
      body: 'Routing, caching and context budgets that keep an agent affordable once real traffic finds it.',
    },
    {
      title: 'Adoption',
      body: 'Turning one-off experiments into reusable components other teams ship on — the part that makes it a lead role.',
    },
  ],

  // Shown as a quiet marquee — signals breadth without a wall of logos.
  keywords: [
    'Agentic systems',
    'RAG',
    'LLM evaluation',
    'Guardrails',
    'Python',
    'Model Context Protocol',
    'Vector search',
    'Prompt engineering',
    'Observability',
    'Cost & latency tuning',
    'Distributed systems',
    'Team leadership',
  ],
}
