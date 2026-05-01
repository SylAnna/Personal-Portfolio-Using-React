const Footer = () => {
  // I make a new Date object so JavaScript can tell me what year it is right now.
  const date = new Date()

  return (
    <footer className="border-t-2 border-section-divider bg-footer-bg ">
      <div className="mx-auto max-w-6xl px-4 py-5 text-center text-sm text-nav-text sm:px-6 lg:px-8">
        {/* Then I use getFullYear() so the footer updates itself instead of me typing a year. */}
        Copyright &copy; {date.getFullYear()} Sylvia's Personal Portfolio
      </div>
    </footer>
  )
}

export default Footer
