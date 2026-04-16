const Projects = () => {
  return (
    <section id="projects" className="border-b-2 border-section-divider bg-content-bg">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-wide text-nav-accent">Projects</p>
            <h2 className="mt-3 text-3xl font-bold text-page-content sm:text-4xl">Projects</h2>
            <p className="mt-4 max-w-2xl text-page-content">
              This section is for projects I have built and what I learned from them.
            </p>
          </div>

          <a
            href="#contact"
            className="rounded-full bg-projects-btn px-6 py-3 text-center text-sm font-semibold text-white hover:opacity-90"
          >
            Contact Me
          </a>
        </div>
      </div>
    </section>
  )
}

export default Projects
