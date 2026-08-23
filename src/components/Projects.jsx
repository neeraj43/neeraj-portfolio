import { ArrowUpRight, ExternalLink, FileText } from 'lucide-react'
import { Section } from './ui/Section'
import { PromptEvalDemo } from './PromptEvalDemo'
import { GitHubIcon } from './ui/Social'
import { projects } from '../data/projects'

/* A project can ship a working demo rather than a description of one. */
const DEMOS = { 'prompt-eval': PromptEvalDemo }

function StatusChip({ status }) {
  const tone =
    status === 'Open source'
      ? 'border-accent/30 bg-accent/10 text-accent'
      : 'border-line bg-subtle text-faint'
  return (
    <span className={`rounded-md border px-2 py-0.5 font-mono text-2xs uppercase ${tone}`}>
      {status}
    </span>
  )
}

function ProjectLinks({ links }) {
  const items = [
    { key: 'repo', href: links.repo, label: 'Code', Icon: GitHubIcon },
    { key: 'demo', href: links.demo, label: 'Live demo', Icon: ExternalLink },
    { key: 'writeup', href: links.writeup, label: 'Write-up', Icon: FileText },
  ].filter((i) => i.href)

  if (!items.length) return null

  return (
    <div className="flex flex-wrap items-center gap-2 pt-5">
      {items.map(({ key, href, label, Icon }) => (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-2 rounded-lg border border-line px-3 py-1.5 text-sm text-muted transition-colors hover:border-accent/50 hover:text-ink"
        >
          <Icon className="h-3.5 w-3.5" />
          {label}
          <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
        </a>
      ))}
    </div>
  )
}

function ProjectCard({ project, index }) {
  const {
    name, tagline, year, status, problem, approach, tradeoff, results, stack, links, demo,
  } = project
  const Demo = demo ? DEMOS[demo] : null

  return (
    <article
      className="reveal card card-hover overflow-hidden p-6 sm:p-8"
      data-reveal-delay={index * 70}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold sm:text-2xl">{name}</h3>
          <p className="mt-1 text-muted">{tagline}</p>
        </div>
        <div className="flex items-center gap-2">
          <StatusChip status={status} />
          <span className="font-mono text-2xs text-faint">{year}</span>
        </div>
      </div>

      <div className="mt-7 grid gap-7 lg:grid-cols-2">
        <div>
          <p className="label mb-2">The problem</p>
          <p className="text-[15px] leading-relaxed text-muted">{problem}</p>

          {tradeoff && (
            <div className="mt-6 rounded-xl border-l-2 border-accent bg-subtle p-4">
              <p className="label mb-2 text-accent">The tradeoff</p>
              <p className="text-[15px] leading-relaxed text-muted">{tradeoff}</p>
            </div>
          )}
        </div>

        <div>
          <p className="label mb-3">How I built it</p>
          <ul className="space-y-3">
            {approach.map((step, i) => (
              <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                <span className="mt-0.5 shrink-0 font-mono text-2xs text-accent">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ul>

          {results.length > 0 && (
            <>
              <p className="label mb-3 mt-6">Results</p>
              <ul className="space-y-2">
                {results.map((r, i) => (
                  <li key={i} className="flex gap-2.5 text-[15px] text-muted">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {r}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>

      {Demo && <Demo />}

      <div className="mt-7 flex flex-wrap gap-2 border-t border-line-soft pt-5">
        {stack.map((tech) => (
          <span
            key={tech}
            className="rounded-md bg-subtle px-2.5 py-1 font-mono text-2xs text-faint"
          >
            {tech}
          </span>
        ))}
      </div>

      <ProjectLinks links={links} />
    </article>
  )
}

export function Projects() {
  return (
    <Section
      id="work"
      index="02"
      title="Selected work"
      kicker={`${projects.length} projects`}
    >
      <div className="space-y-6">
        {projects.map((project, i) => (
          <ProjectCard key={project.name} project={project} index={i} />
        ))}
      </div>
    </Section>
  )
}
