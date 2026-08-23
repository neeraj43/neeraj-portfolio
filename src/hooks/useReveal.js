import { useEffect } from 'react'

/**
 * Reveals `.reveal` elements as they scroll into view.
 *
 * Fail-safe by design: the hiding styles are scoped to `.js-reveal` on
 * <html>, which this hook adds only once it is certain it can observe.
 * If JS fails, IntersectionObserver is missing, or motion is reduced,
 * nothing is ever hidden — content just appears. Permanently invisible
 * content is far worse than a missing animation.
 */
export function useReveal() {
  useEffect(() => {
    const root = document.documentElement
    const nodes = document.querySelectorAll('.reveal')

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!nodes.length || reduced || !('IntersectionObserver' in window)) return

    root.classList.add('js-reveal')

    const show = (el) => el.classList.add('is-visible')

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const delay = Number(entry.target.dataset.revealDelay || 0)
          setTimeout(() => show(entry.target), delay)
          io.unobserve(entry.target)
        })
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0 },
    )

    nodes.forEach((n) => io.observe(n))

    // Backstop: if the observer has revealed nothing at all after 2.5s,
    // assume it is broken and drop the hiding styles entirely.
    const backstop = setTimeout(() => {
      if (!document.querySelector('.reveal.is-visible')) {
        root.classList.remove('js-reveal')
      }
    }, 2500)

    return () => {
      io.disconnect()
      clearTimeout(backstop)
      root.classList.remove('js-reveal')
    }
  }, [])
}
