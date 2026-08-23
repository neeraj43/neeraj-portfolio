import { About } from './components/About'
import { Contact } from './components/Contact'
import { Experience } from './components/Experience'
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { Projects } from './components/Projects'
import { Toolkit } from './components/Toolkit'
import { useReveal } from './hooks/useReveal'
import { useTheme } from './hooks/useTheme'

export default function App() {
  const { dark, toggle } = useTheme()
  useReveal()

  return (
    <>
      <Nav dark={dark} onToggleTheme={toggle} />

      <main>
        <Hero />

        <div className="mx-auto max-w-content space-y-28 px-6 py-24 lg:px-8 lg:py-32">
          <About />
          <Projects />
          <Experience />
          <Toolkit />
          <Contact />
        </div>
      </main>
    </>
  )
}
