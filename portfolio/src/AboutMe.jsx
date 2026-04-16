const AboutMe = () => {
  return (
    <section id="about" className="border-b-2 border-section-divider bg-content-bg">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-8 lg:py-20">
        <div className="order-2 lg:order-1">
          <p className="mb-3 text-sm font-bold uppercase tracking-wide text-nav-accent">
            Hello, I&apos;m
          </p>
          <h1 className="text-5xl font-bold leading-none text-page-content sm:text-6xl lg:text-7xl">
            Sylvia
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-page-content sm:text-lg">
            I enjoy programming and learning new things. This portfolio is where I can show my projects, skills, and what I have been working on.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="#projects"
              className="rounded-full bg-projects-btn px-6 py-3 text-center text-sm font-semibold text-white hover:opacity-90"
            >
              View My Projects
            </a>
            <a
              href="#contact"
              className="rounded-full border border-page-content px-6 py-3 text-center text-sm font-semibold text-page-content hover:border-nav-accent hover:text-nav-accent"
            >
              Contact Me
            </a>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <div className="rounded-2xl border border-nav-accent/30 bg-nav-accent/10 p-5">
              <h2 className="text-base font-bold text-page-content">Hobbies</h2>
              <p className="mt-2 text-sm leading-6 text-page-content sm:text-base">
                I love reading, drawing, and writing.
              </p>
            </div>

            <div className="rounded-2xl border border-nav-accent/30 bg-nav-accent/10 p-5">
              <h2 className="text-base font-bold text-page-content">Background</h2>
              <p className="mt-2 text-sm leading-6 text-page-content sm:text-base">
                I was born and raised in Arkansas and went to high school in Florida.
              </p>
            </div>

            <div className="rounded-2xl border border-nav-accent/30 bg-nav-accent/10 p-5 md:col-span-2 xl:col-span-1">
              <h2 className="text-base font-bold text-page-content">Why Computer Science?</h2>
              <p className="mt-2 text-sm leading-6 text-page-content sm:text-base">
                I got interested in tech from a Unity project in middle school and later liked programming through robotics.
              </p>
            </div>
          </div>
        </div>

        <div className="order-1 flex justify-center lg:order-2">
          <div className="flex h-64 w-64 items-center justify-center rounded-full border-8 border-nav-accent bg-nav-text shadow-md sm:h-80 sm:w-80 lg:h-96 lg:w-96">
            <span className="text-7xl font-bold text-page-content sm:text-8xl lg:text-9xl">
              S
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutMe
