import { useState } from 'react'

const Nav = ({ theme, setTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b border-nav-text bg-nav-bg">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <a href="#about" className="text-lg font-bold text-nav-text hover:text-nav-accent">
          Sylvia
        </a>

        <ul className="hidden items-center gap-6 text-sm lg:flex">
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
        </ul>

        <div className="hidden lg:block">
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="rounded-sm border border-nav-text bg-nav-bg px-4 py-2 text-sm text-nav-text outline-none hover:text-nav-accent"
          >
            <option value="">Default Theme</option>
            <option value="dark">Dark</option>
            <option value="cozy">Cozy</option>
          </select>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="w-28 rounded-sm border border-nav-text bg-nav-bg px-3 py-2 text-xs text-nav-text outline-none hover:text-nav-accent sm:w-32 sm:text-sm"
          >
            <option value="">Theme</option>
            <option value="dark">Dark</option>
            <option value="cozy">Cozy</option>
          </select>

          <button
            type="button"
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
            <a className="border-b border-nav-text px-2 py-3 text-nav-text hover:text-nav-accent" href="#about" onClick={() => setIsMenuOpen(false)}>About</a>
            <a className="border-b border-nav-text px-2 py-3 text-nav-text hover:text-nav-accent" href="#education" onClick={() => setIsMenuOpen(false)}>Education</a>
            <a className="border-b border-nav-text px-2 py-3 text-nav-text hover:text-nav-accent" href="#projects" onClick={() => setIsMenuOpen(false)}>Projects</a>
            <a className="border-b border-nav-text px-2 py-3 text-nav-text hover:text-nav-accent" href="#skills" onClick={() => setIsMenuOpen(false)}>Skills</a>
            <a className="border-b border-nav-text px-2 py-3 text-nav-text hover:text-nav-accent" href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Nav
