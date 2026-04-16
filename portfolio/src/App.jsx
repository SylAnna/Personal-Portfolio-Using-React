import { useState } from 'react'
import './App.css'
import Nav from './Nav'
import AboutMe from './AboutMe'
import Footer from './Footer'
import Projects from './Projects'
import Contact from './Contact'
import Education from './Education'
import Skills from './Skills'

function App() {
  const [theme, setTheme] = useState('')

  return (
    <div data-theme={theme} className="min-h-screen bg-content-bg">
      <Nav theme={theme} setTheme={setTheme} />
      <main className="flex-1">
          <AboutMe />
          <Education />
          <Projects />
          <Skills />
          <Contact />
      </main>

      <Footer />
    </div>
  )
}

export default App
