/* ------------------------------------------------------------------
   Ordered deliberately: AI first. A reader who stops after the first
   group should already have the right impression.
   ------------------------------------------------------------------ */

export const skills = [
  {
    group: 'AI & Machine Learning',
    icon: 'Sparkles',
    primary: true,
    items: [
      'LLM application design',
      'Agentic workflows & tool use',
      'RAG & vector search',
      'Evaluation harnesses',
      'Guardrails & safety',
      'Prompt engineering',
      'Model Context Protocol',
      'Fine-tuning & adapters',
      'LLM observability',
    ],
  },
  {
    group: 'Languages',
    icon: 'Code2',
    items: ['Python', 'TypeScript', 'JavaScript', 'Java', 'C#', 'SQL'],
  },
  {
    group: 'Backend & Data',
    icon: 'Database',
    items: [
      'FastAPI',
      '.NET Core',
      'Node.js',
      'GraphQL',
      'PostgreSQL',
      'Vector databases',
      'Redis',
      'Event streaming',
    ],
  },
  {
    group: 'Frontend',
    icon: 'Layout',
    items: ['React', 'Angular', 'RxJS', 'TypeScript', 'Tailwind CSS', 'Android'],
  },
  {
    group: 'Platform & Delivery',
    icon: 'Settings2',
    items: ['Docker', 'Kubernetes', 'CI/CD', 'Ansible', 'AWS', 'Observability'],
  },
  {
    group: 'Leadership',
    wide: true, // spans the row — the lead signal shouldn't read as a footnote
    icon: 'Users',
    items: [
      'Technical direction',
      'Mentoring & enablement',
      'Architecture review',
      'Cross-team adoption',
      'Hiring & interviewing',
    ],
  },
]
