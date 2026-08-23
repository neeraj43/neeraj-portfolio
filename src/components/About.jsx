import { Section } from './ui/Section'
import { profile } from '../data/profile'

export function About() {
  return (
    <Section id="about" index="01" title="About">
      <div className="grid gap-10 lg:grid-cols-[1.6fr,1fr]">
        <div className="reveal space-y-5">
          {profile.about.map((para, i) => (
            <p
              key={i}
              className={
                i === 0
                  ? 'text-lg leading-relaxed text-ink'
                  : 'text-[17px] leading-relaxed text-muted'
              }
            >
              {para}
            </p>
          ))}
        </div>

        <aside className="reveal space-y-3" data-reveal-delay="120">
          <div className="card p-5">
            <p className="label mb-3">Currently</p>
            <p className="text-[15px] leading-relaxed text-muted">
              Software Engineer III at{' '}
              <span className="text-ink">JPMorgan Chase</span>, working on
              agentic AI and the tooling that makes it safe to ship.
            </p>
          </div>

          <div className="card p-5">
            <p className="label mb-3">Working hours</p>
            <p className="text-[15px] leading-relaxed text-muted">
              {profile.timezone}
            </p>
          </div>

          <div className="card p-5">
            <p className="label mb-3">Looking for</p>
            <p className="text-[15px] leading-relaxed text-muted">
              A lead role owning AI systems end to end — architecture,
              evaluation culture, and the engineers building it.
            </p>
          </div>
        </aside>
      </div>
    </Section>
  )
}
