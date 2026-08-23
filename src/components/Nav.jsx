import { useEffect, useState } from 'react'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { useActiveSection } from '../hooks/useActiveSection'
import { profile } from '../data/profile'

const SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'toolkit', label: 'Toolkit' },
  { id: 'contact', label: 'Contact' },
]
const IDS = SECTIONS.map((s) => s.id)

export function Nav({ dark, onToggleTheme }) {
  const active = useActiveSection(IDS)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Don't let the page scroll behind the open mobile sheet.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-bg"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'border-b border-line bg-bg/80 backdrop-blur-xl'
            : 'border-b border-transparent'
        }`}
      >
        <nav className="mx-auto flex max-w-content items-center gap-6 px-6 py-4 lg:px-8">
          <a
            href="#top"
            className="font-mono text-sm font-medium text-ink transition-colors hover:text-accent"
          >
            NW<span className="text-accent">.</span>
          </a>

          <ul className="ml-auto hidden items-center gap-1 md:flex">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  aria-current={active === s.id ? 'true' : undefined}
                  className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
                    active === s.id
                      ? 'bg-subtle text-ink'
                      : 'text-muted hover:text-ink'
                  }`}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="ml-auto flex items-center gap-2 md:ml-0">
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
              className="rounded-lg border border-line p-2 text-muted transition-colors hover:border-accent/50 hover:text-ink"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            <a
              target="_blank"
              rel="noreferrer"
              href={profile.links.resume}
              className="hidden rounded-lg bg-ink px-4 py-2 text-sm font-medium text-bg transition-opacity hover:opacity-90 sm:block"
            >
              Resume
            </a>

            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="rounded-lg border border-line p-2 text-muted transition-colors hover:text-ink md:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile sheet — the previous site had no mobile nav at all */}
      <div
        className={`fixed inset-0 z-40 bg-bg/95 backdrop-blur-xl transition-opacity duration-300 md:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <ul className="flex h-full flex-col justify-center gap-2 px-8">
          {SECTIONS.map((s, i) => (
            <li key={s.id} style={{ transitionDelay: `${i * 40}ms` }}>
              <a
                href={`#${s.id}`}
                onClick={() => setOpen(false)}
                className="block border-b border-line-soft py-4 text-3xl font-semibold text-ink"
              >
                <span className="mr-4 font-mono text-sm text-accent">
                  0{i + 1}
                </span>
                {s.label}
              </a>
            </li>
          ))}
          <li className="pt-6">
            <a
              target="_blank"
              rel="noreferrer"
              href={profile.links.resume}
              className="inline-block rounded-lg bg-ink px-5 py-3 font-medium text-bg"
            >
              Download resume
            </a>
          </li>
        </ul>
      </div>
    </>
  )
}
