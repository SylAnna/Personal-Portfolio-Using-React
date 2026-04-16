const Footer = () => {
  const date = new Date()

  return (
    <footer className="border-t-2 border-section-divider bg-footer-bg ">
      <div className="mx-auto max-w-6xl px-4 py-5 text-center text-sm text-nav-text sm:px-6 lg:px-8">
        Copyright &copy; {date.getFullYear()} Sylvia&apos;s Personal Portfolio
      </div>
    </footer>
  )
}

export default Footer
