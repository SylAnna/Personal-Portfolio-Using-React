import { useState } from 'react'
import './App.css'
import Nav from './Nav'
import AboutMe from './AboutMe'
import Footer from './Footer'
import Projects from './Projects'
import Contact from './Contact'
import Education from './Education'
import Skills from './Skills'
import Messages from './Messages'


function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("portfolio-theme") || ""
  })
  const searchParams = new URLSearchParams(window.location.search)
  const view = searchParams.get("view")
  const showMessages = view === "messages"

  function changeTheme(newTheme) {
    setTheme(newTheme)
    localStorage.setItem("portfolio-theme", newTheme)
  }

  return (
    <div data-theme={theme} className="portfolio-page min-h-screen bg-content-bg">
      <Nav theme={theme} setTheme={changeTheme} showMessages={showMessages} />
      <main className="flex-1">
        {showMessages ? (
          <Messages />
        ) : (
          <>
            <AboutMe />
            <Education />
            <Projects />
            <Skills />
            <Contact />
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default App
