import { useState } from 'react'

const Nav = ({ theme, setTheme, showMessages }) => {
  // I need state here because the mobile menu changes when someone clicks the menu button.
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b border-nav-text bg-nav-bg">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        {/* The name works like a logo. On the messages page it takes the user back home. */}
        <a href={showMessages ? "/" : "#about"} className="text-lg font-semibold text-nav-text uppercase tracking-wider hover:text-nav-accent">
          Sylvia
        </a>

        <ul className="hidden items-center gap-6 text-sm lg:flex">
          {/* If I am on the messages page, the normal section links would not help, so I show Home instead. */}
          {showMessages ? (
            <li>
              <a className="text-nav-text hover:text-nav-accent" href="/">Home</a>
            </li>
          ) : (
            <>
              <li>
                <a className="text-nav-text hover:text-nav-accent" href="#about">About</a>
              </li>
              <li>
                <a className="text-nav-text hover:text-nav-accent" href="#education">Education</a>
              </li>
              <li>
                <a className="text-nav-text hover:text-nav-accent" href="#projects">Projects</a>
              </li>
              <li>
                <a className="text-nav-text hover:text-nav-accent" href="#skills">Skills</a>
              </li>
              <li>
                <a className="text-nav-text hover:text-nav-accent" href="#contact">Contact</a>
              </li>
            </>
          )}
          <li>
            <a className="text-nav-text hover:text-nav-accent" href="/?view=messages">Messages</a>
          </li>
        </ul>

        <div className="hidden lg:block">
          <select
            // This dropdown calls setTheme from App.jsx so the whole page theme can change.
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="rounded-sm border border-nav-text bg-nav-bg px-4 py-2 text-sm text-nav-text outline-none hover:text-nav-accent"
          >
            <option value="">Default Theme</option>
            <option value="dark">Dark</option>
            <option value="cozy">Cozy</option>
            <option value="bubblegum">Bubblegum</option>
            <option value="cyberpunk">Cyberpunk</option>
          </select>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          {/* This is the smaller theme dropdown for phone/tablet screens. */}
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="w-28 rounded-sm border border-nav-text bg-nav-bg px-3 py-2 text-xs text-nav-text outline-none hover:text-nav-accent sm:w-32 sm:text-sm"
          >
            <option value="">Default Theme</option>
            <option value="dark">Dark</option>
            <option value="cozy">Cozy</option>
            <option value="bubblegum">Bubblegum</option>
            <option value="cyberpunk">Cyberpunk</option>
          </select>

          <button
            type="button"
            // Clicking this flips the menu from closed to open, or open to closed.
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex h-10 w-10 items-center justify-center text-nav-text hover:text-nav-accent"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            <span className="flex w-5 flex-col gap-1.5">
              <span className="h-0.5 rounded bg-current"></span>
              <span className="h-0.5 rounded bg-current"></span>
              <span className="h-0.5 rounded bg-current"></span>
            </span>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="border-t border-nav-text bg-nav-bg lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-4 py-4 sm:px-6">
            {/* When the menu is open, I show the same links as desktop but stacked vertically. */}
            {showMessages ? (
              <a className="border-b border-nav-text px-2 py-3 text-nav-text hover:text-nav-accent" href="/" onClick={() => setIsMenuOpen(false)}>Home</a>
            ) : (
              <>
                <a className="border-b border-nav-text px-2 py-3 text-nav-text hover:text-nav-accent" href="#about" onClick={() => setIsMenuOpen(false)}>About</a>
                <a className="border-b border-nav-text px-2 py-3 text-nav-text hover:text-nav-accent" href="#education" onClick={() => setIsMenuOpen(false)}>Education</a>
                <a className="border-b border-nav-text px-2 py-3 text-nav-text hover:text-nav-accent" href="#projects" onClick={() => setIsMenuOpen(false)}>Projects</a>
                <a className="border-b border-nav-text px-2 py-3 text-nav-text hover:text-nav-accent" href="#skills" onClick={() => setIsMenuOpen(false)}>Skills</a>
                <a className="border-b border-nav-text px-2 py-3 text-nav-text hover:text-nav-accent" href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
              </>
            )}
            <a className="border-b border-nav-text px-2 py-3 text-nav-text hover:text-nav-accent" href="/?view=messages" onClick={() => setIsMenuOpen(false)}>Messages</a>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Nav
