import { useEffect, useState } from 'react'

/**
 * Returns the id of the section currently nearest the top of the
 * viewport, for highlighting the nav.
 */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length) return

    const onScroll = () => {
      const line = window.innerHeight * 0.32
      let current = ids[0]
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= line) current = section.id
      }
      setActive(current)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [ids])

  return active
}
