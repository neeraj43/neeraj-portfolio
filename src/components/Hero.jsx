import { useState } from 'react'
import { ArrowUpRight, FileText, Mail, MapPin } from 'lucide-react'
import { profile } from '../data/profile'
import { GitHubIcon, LinkedInIcon } from './ui/Social'

/**
 * Headshot. The JPEGs in /public are generated from assets/neeraj-original.png
 * (see README). Falls back to initials if the file ever goes missing, so the
 * layout is never broken by a 404.
 */
function Portrait() {
  const [failed, setFailed] = useState(false)

  return (
    <div className="relative w-40 shrink-0 sm:w-48 lg:w-full lg:max-w-[22rem]">
      {/* Colour wash lifted straight out of the photo: navy from the
          blazer, warm sand from the window light behind him. */}
      <div
        aria-hidden="true"
        className="absolute -inset-6 -z-10 rounded-full bg-[radial-gradient(circle_at_30%_25%,rgb(var(--glow)/0.35),transparent_65%),radial-gradient(circle_at_78%_70%,rgb(var(--glow-warm)/0.3),transparent_65%)] blur-2xl"
      />

      <div className="relative aspect-square overflow-hidden rounded-[1.75rem] border border-line bg-subtle shadow-[0_20px_60px_-24px_rgb(var(--glow)/0.55)]">
        {failed ? (
          <div className="flex h-full w-full items-center justify-center font-mono text-4xl font-medium text-faint">
            NW
          </div>
        ) : (
          <img
            src="/neeraj-960.jpg"
            srcSet="/neeraj-480.jpg 480w, /neeraj-960.jpg 960w"
            sizes="(min-width: 1024px) 352px, 192px"
            alt={`${profile.name}, ${profile.role}`}
            width={960}
            height={960}
            fetchPriority="high"
            decoding="async"
            onError={() => setFailed(true)}
            className="h-full w-full object-cover dark:brightness-[0.88] dark:contrast-[1.03]"
          />
        )}

        {/* Hairline inset, plus a scrim that stops the photo's bright office
            wall from punching a hole in the dark theme. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-ink/10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden bg-gradient-to-t from-bg/55 via-bg/5 to-transparent dark:block"
        />
      </div>

      {/* Small caption card — anchors the face to the claim */}
      <div className="absolute -bottom-4 -left-3 hidden items-center gap-2 rounded-xl border border-line bg-elev/90 px-3 py-2 shadow-sm backdrop-blur lg:inline-flex">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
        <span className="font-mono text-2xs uppercase tracking-[0.12em] text-muted">
          JPMorgan Chase
        </span>
      </div>
    </div>
  )
}

export function Hero() {
  const { links, status } = profile

  return (
    <section id="top" className="relative overflow-hidden pt-28 sm:pt-36">
      <div aria-hidden="true" className="ambient absolute inset-0 -z-10" />
      <div aria-hidden="true" className="grid-lines absolute inset-0 -z-10" />

      <div className="mx-auto max-w-content px-6 pb-16 lg:px-8">
        <div className="flex flex-col gap-10 lg:grid lg:grid-cols-[1fr,auto] lg:items-center lg:gap-16">
          {/* Photo sits first on mobile (small), right-hand column on desktop */}
          <div className="order-first animate-fade-up lg:order-last">
            <Portrait />
          </div>

          <div className="animate-fade-up" style={{ animationDelay: '60ms' }}>
            {status.available && (
              <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-line bg-elev px-3.5 py-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-ok" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-ok" />
                </span>
                <span className="text-sm text-muted">{status.text}</span>
              </div>
            )}

            <p className="label mb-3">{profile.role}</p>
            <h1 className="text-[2.5rem] font-semibold leading-[1.05] sm:text-6xl">
              <span className="text-gradient">{profile.headline}</span>
            </h1>

            <p
              className="mt-7 max-w-2xl text-lg leading-relaxed text-muted animate-fade-up"
              style={{ animationDelay: '120ms' }}
            >
              {profile.subhead}
            </p>

            <div
              className="mt-9 flex flex-wrap items-center gap-3 animate-fade-up"
              style={{ animationDelay: '180ms' }}
            >
              <a
                href={`mailto:${profile.email}`}
                className="group inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-3 text-sm font-medium text-bg transition-opacity hover:opacity-90"
              >
                <Mail className="h-4 w-4" />
                Get in touch
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                target="_blank"
                rel="noreferrer"
                href={links.resume}
                className="inline-flex items-center gap-2 rounded-xl border border-line px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-accent/50"
              >
                <FileText className="h-4 w-4" />
                Resume
              </a>

              <div className="flex items-center gap-2">
                <a
                  href={links.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="rounded-xl border border-line p-3 text-muted transition-colors hover:border-accent/50 hover:text-ink"
                >
                  <GitHubIcon className="h-4 w-4" />
                </a>
                <a
                  href={links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="rounded-xl border border-line p-3 text-muted transition-colors hover:border-accent/50 hover:text-ink"
                >
                  <LinkedInIcon className="h-4 w-4" />
                </a>
              </div>

              <span className="ml-1 inline-flex items-center gap-1.5 text-sm text-faint">
                <MapPin className="h-4 w-4" />
                {profile.location}
              </span>
            </div>
          </div>
        </div>

        {/* What the four themes below actually are, stated once, up front */}
        <ul
          className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4 animate-fade-up"
          style={{ animationDelay: '240ms' }}
        >
          {profile.pillars.map((pillar) => (
            <li key={pillar.title} className="bg-elev p-5">
              <p className="font-mono text-2xs uppercase tracking-[0.12em] text-accent">
                {pillar.title}
              </p>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">
                {pillar.body}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Keyword marquee — breadth at a glance, without a logo wall */}
      {/* <div className="border-y border-line-soft py-4">
        <div className="fade-edges flex overflow-hidden">
          <div className="flex shrink-0 animate-marquee items-center gap-8 pr-8">
            {[...profile.keywords, ...profile.keywords].map((k, i) => (
              <span
                key={i}
                className="flex shrink-0 items-center gap-8 whitespace-nowrap font-mono text-2xs uppercase text-faint"
              >
                {k}
                <span aria-hidden="true" className="text-accent/80">/</span>
              </span>
            ))}
          </div>
        </div>
      </div> */}
    </section>
  )
}
