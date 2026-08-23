import { ArrowUpRight, Calendar, Mail, MapPin } from 'lucide-react'
import { profile } from '../data/profile'
import { GitHubIcon, LeetCodeIcon, LinkedInIcon } from './ui/Social'

export function Contact() {
  const { links } = profile
  const year = new Date().getFullYear()

  const socials = [
    { href: links.github, label: 'GitHub', Icon: GitHubIcon },
    { href: links.linkedin, label: 'LinkedIn', Icon: LinkedInIcon },
    { href: links.leetcode, label: 'LeetCode', Icon: LeetCodeIcon },
  ]

  return (
    <section id="contact" className="scroll-mt-28">
      <div className="reveal card relative overflow-hidden p-8 sm:p-12">
        {/* Sits above the card background, below the content. A negative
            z-index here would paint behind the opaque card and vanish. */}
        <div
          aria-hidden="true"
          className="ambient pointer-events-none absolute inset-0"
        />

        <div className="relative grid gap-10 lg:grid-cols-[1.4fr,auto] lg:items-center">
          <div>
            <p className="label mb-4">05 — Contact</p>
            <h2 className="max-w-xl text-3xl font-semibold sm:text-4xl">
              Building something with agents? Let's talk.
            </h2>
            <p className="mt-4 max-w-lg text-lg text-muted">
              I'm open to lead and staff AI engineering roles, and always happy
              to compare notes on getting LLM systems into production.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="group inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-3 text-sm font-medium text-bg transition-opacity hover:opacity-90"
              >
                <Mail className="h-4 w-4" />
                {profile.email}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              {links.calendar && (
                <a
                  href={links.calendar}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-line px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-accent/50"
                >
                  <Calendar className="h-4 w-4" />
                  Book a call
                </a>
              )}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-line-soft pt-8">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-line px-3.5 py-2 text-sm text-muted transition-colors hover:border-accent/50 hover:text-ink"
                >
                  <Icon className="h-3.5 w-3.5" />
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* The same face that opened the page, closing it. Decorative —
              hidden from assistive tech, since the name is right beside it. */}
          <div className="hidden shrink-0 text-center lg:block">
            <img
              src="/neeraj-480.jpg"
              alt=""
              aria-hidden="true"
              width={480}
              height={480}
              loading="lazy"
              decoding="async"
              className="h-36 w-36 rounded-2xl border border-line object-cover shadow-[0_16px_40px_-20px_rgb(var(--glow)/0.6)] dark:brightness-[0.9]"
            />
            <p className="mt-4 text-sm font-medium text-ink">{profile.name}</p>
            <p className="font-mono text-2xs uppercase tracking-[0.12em] text-faint">
              {profile.role}
            </p>
          </div>
        </div>
      </div>

      <footer className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-line-soft pt-8 text-sm text-faint sm:flex-row sm:items-center">
        <span>© {year} {profile.name}</span>
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" />
          {profile.location}
        </span>
      </footer>
    </section>
  )
}
