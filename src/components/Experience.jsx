import { Section } from './ui/Section'
import { experience } from '../data/experience'

function Role({ role, index }) {
  return (
    <article
      className="reveal group relative grid gap-5 border-b border-line-soft pb-10 last:border-0 sm:grid-cols-[10rem,1fr] sm:gap-10"
      data-reveal-delay={index * 80}
    >
      <div className="sm:pt-1">
        <p className="font-mono text-2xs uppercase text-faint">{role.period}</p>
        {role.current && (
          <span className="mt-2 inline-flex items-center gap-1.5 text-2xs font-medium uppercase tracking-wider text-ok">
            <span className="h-1.5 w-1.5 rounded-full bg-ok" />
            Current
          </span>
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold">
          {role.role}
          <span className="text-faint"> · </span>
          <span className="text-accent">{role.company}</span>
        </h3>
        <p className="mt-1 font-mono text-2xs uppercase text-faint">{role.focus}</p>

        <p className="mt-4 text-[17px] leading-relaxed text-ink">{role.summary}</p>

        {role.metric?.value && (
          <div className="mt-5 inline-flex items-baseline gap-2 rounded-xl border border-line bg-subtle px-4 py-2">
            <span className="font-mono text-2xl font-semibold text-ink">
              {role.metric.value}
            </span>
            <span className="text-sm text-muted">{role.metric.label}</span>
          </div>
        )}

        <ul className="mt-5 space-y-3">
          {role.highlights.map((h, i) => (
            <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-muted">
              <span className="mt-[0.6rem] h-1 w-1 shrink-0 rounded-full bg-accent" />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-2">
          {role.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-subtle px-2.5 py-1 font-mono text-2xs text-faint"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}

export function Experience() {
  return (
    <Section id="experience" index="03" title="Experience" kicker="9 years">
      <div className="space-y-10">
        {experience.map((role, i) => (
          <Role key={role.company} role={role} index={i} />
        ))}
      </div>
    </Section>
  )
}
