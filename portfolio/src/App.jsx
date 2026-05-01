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
  // I start by checking localStorage to see if the user already picked a theme before.
  // If not, the theme starts as an empty string, which means the default theme is used.
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("portfolio-theme") || ""
  })

  // Here I check the URL for ?view=messages.
  // I did this instead of adding React Router because I only needed one extra view.
  const searchParams = new URLSearchParams(window.location.search)
  const view = searchParams.get("view")
  const showMessages = view === "messages"

  function changeTheme(newTheme) {
    // When the user picks a new theme, I update state and also save it for next time.
    setTheme(newTheme)
    localStorage.setItem("portfolio-theme", newTheme)
  }

  return (
    <div data-theme={theme} className="portfolio-page min-h-screen bg-content-bg">
      <Nav theme={theme} setTheme={changeTheme} showMessages={showMessages} />
      <main className="flex-1">
        {/* This is where I decide which page content to show based on the URL. */}
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
