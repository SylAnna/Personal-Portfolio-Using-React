const Contact = () => {
  return (
    <section id="contact" className="bg-content-bg">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="rounded-2xl border border-nav-accent/30 bg-nav-bg px-6 py-10 text-nav-text sm:px-10">
          <p className="text-sm font-bold uppercase tracking-wide text-nav-accent">Contact</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Contact Me</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 opacity-85 sm:text-lg">
            You can reach me here when I add my email and other links.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="mailto:hello@example.com"
              className="rounded-full bg-projects-btn px-6 py-3 text-center text-sm font-semibold text-white hover:opacity-90"
            >
              Email Me
            </a>
            <a
              href="#about"
              className="rounded-full border border-nav-text px-6 py-3 text-center text-sm font-semibold text-nav-text hover:text-nav-accent"
            >
              Back to Top
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
