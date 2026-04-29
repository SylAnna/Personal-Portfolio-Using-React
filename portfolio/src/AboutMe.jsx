const AboutMe = () => {
  return (
    <section id="about" className="border-b-2 border-section-divider bg-content-bg">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-12 lg:px-8 lg:py-20">
        <div className="order-2 lg:order-1">
          <div className="mb-4 h-2 w-24 rounded-full bg-page-accent"></div>
          <h1 className="theme-display-font inline-block w-0 overflow-hidden whitespace-nowrap border-r-2 border-page-content text-5xl font-bold leading-none text-page-accent animate-typewriter-name sm:text-6xl lg:text-7xl">
            Sylvia
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-page-content sm:text-lg">
            I am a computer science student who enjoys building things that feel useful, organized, and personal. I like the process of taking an idea from a rough thought to a working project, especially when it teaches me something new about design, logic, or how people interact with technology.
          </p>

          <div className="mt-7 flex flex-col gap-4 sm:flex-row">
            <a
              href="#projects"
              className="rounded-full bg-projects-btn px-6 py-3 text-center text-sm font-semibold text-white shadow-md shadow-section-divider/30 hover:bg-page-accent hover:text-page-content duration-300"
            >
              View My Projects
            </a>
            <a
              href="#contact"
              className="rounded-full border-2 border-page-content px-6 py-3 text-center text-sm font-semibold text-page-content hover:border-nav-accent hover:text-nav-accent duration-300"
            >
              Contact Me
            </a>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <div className="border-l-4 border-page-accent bg-nav-accent/10 p-5 shadow-md shadow-section-divider/20">
              <h2 className="text-lg font-bold text-page-content">Hobbies</h2>
              <p className="mt-2 text-sm leading-6 text-page-content sm:text-base">
                Outside of coding, I enjoy reading, drawing, and music. Those creative interests influence how I think about layout, color, and the small details that make a website feel more complete.
              </p>
            </div>

            <div className="border-l-4 border-page-accent bg-nav-accent/10 p-5 shadow-md shadow-section-divider/20">
              <h2 className="text-lg font-bold text-page-content">Background</h2>
              <p className="mt-2 text-sm leading-6 text-page-content sm:text-base">
                I was born and raised in Arkansas and went to high school in Florida. Moving through different environments helped me become adaptable, independent, and open to learning from new experiences.
              </p>
            </div>

            <div className="border-l-4 border-page-accent bg-nav-accent/10 p-5 shadow-md shadow-section-divider/20">
              <h2 className="text-lg font-bold text-page-content">Why Computer Science?</h2>
              <p className="mt-2 text-sm leading-6 text-page-content sm:text-base">
                My interest in technology started with a Unity project in middle school and grew stronger through robotics. I liked seeing code turn into something interactive, and that made programming feel both creative and practical.
              </p>
            </div>

            <div className="border-l-4 border-page-accent bg-nav-accent/10 p-5 shadow-md shadow-section-divider/20">
              <h2 className="text-lg font-bold text-page-content">About Me</h2>
              <p className="mt-2 text-sm leading-6 text-page-content sm:text-base">
                I am still growing as a developer, but I try to be intentional with every project. My goal is to write cleaner code, build stronger user interfaces, and keep improving the way I solve problems.
              </p>
            </div>
          </div>
        </div>

        <div className="order-1 flex justify-center lg:order-2">
          <div className="relative flex h-72 w-72 items-center justify-center rounded-full border-8 border-nav-accent bg-nav-text shadow-2xl shadow-section-divider/40 sm:h-80 sm:w-80 lg:h-96 lg:w-96">
            <span className="text-[150px] text-center font-bold text-page-accent sm:text-8xl lg:text-9xl">
              S
            </span>
            <div className="absolute -bottom-4 left-6 rounded-full border border-nav-accent bg-content-bg px-5 py-3 text-sm font-bold text-page-content shadow-md">
              CS Student
            </div>
            <div className="absolute -right-4 top-10 rounded-full border border-nav-accent bg-page-accent px-5 py-3 text-sm font-bold text-page-content shadow-md">
              Programmer
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutMe
