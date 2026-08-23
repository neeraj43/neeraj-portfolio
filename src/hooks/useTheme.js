import { useCallback, useEffect, useState } from 'react'

/**
 * Theme state, kept in sync with the class the inline script in
 * index.html already applied before first paint.
 */
export function useTheme() {
  const [dark, setDark] = useState(() =>
    typeof document !== 'undefined'
      ? document.documentElement.classList.contains('dark')
      : true,
  )

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    try {
      localStorage.setItem('theme', dark ? 'dark' : 'light')
    } catch {
      /* private mode — the class is still applied, we just can't remember it */
    }
  }, [dark])

  const toggle = useCallback(() => setDark((d) => !d), [])
  return { dark, toggle }
}
