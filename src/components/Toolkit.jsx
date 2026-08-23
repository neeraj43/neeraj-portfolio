import { Code2, Database, Layout, Settings2, Sparkles, Users } from 'lucide-react'
import { Section } from './ui/Section'
import { skills } from '../data/skills'

const ICONS = { Sparkles, Code2, Database, Layout, Settings2, Users }

function Group({ group, index }) {
  const Icon = ICONS[group.icon] ?? Code2

  return (
    <div
      className={`reveal card p-6 ${
        group.primary ? 'border-accent/30 bg-accent/[0.03]' : ''
      } ${group.primary || group.wide ? 'sm:col-span-2' : ''}`}
      data-reveal-delay={index * 60}
    >
      <div className="mb-4 flex items-center gap-2.5">
        <Icon
          className={`h-4 w-4 ${group.primary ? 'text-accent' : 'text-faint'}`}
        />
        <h3 className="text-sm font-semibold uppercase tracking-wider">
          {group.group}
        </h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {group.items.map((item) => (
          <span
            key={item}
            className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
              group.primary
                ? 'bg-accent/10 text-accent'
                : 'bg-subtle text-muted hover:text-ink'
            }`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

export function Toolkit() {
  return (
    <Section id="toolkit" index="04" title="Toolkit" kicker="AI first, then the rest">
      <div className="grid gap-4 sm:grid-cols-2">
        {skills.map((group, i) => (
          <Group key={group.group} group={group} index={i} />
        ))}
      </div>
    </Section>
  )
}
