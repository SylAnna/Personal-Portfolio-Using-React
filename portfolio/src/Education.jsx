import Resume from './assets/Sylvia_Anderson_Resume.pdf'

const Education = () => {
  return (
    <section id="education" className="border-b-2 border-section-divider bg-content-bg">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20 flex flex-col gap-1">
        {/* I start with the main education heading so people know this section is about school. */}
        <p className="text-sm font-bold uppercase tracking-wide text-nav-accent">Education</p>
        <h2 className="mt-3 text-3xl font-bold text-page-content sm:text-4xl">Education</h2>
        <p className="mt-4 max-w-2xl text-page-content">
          My education is focused on computer science, cybersecurity, networking, and mathematics.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="border-l-4 border-page-accent pl-6">
            {/* This left side is the main degree information. */}
            <p className="text-sm font-bold uppercase tracking-wide text-nav-accent">Arkansas Tech University</p>
            <h1 className="mt-2 text-page-content text-2xl font-bold">Bachelor of Science in Computer Science</h1>
            <p className="mt-3 text-page-content">Expected May 2027</p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {/* These little boxes make the important school details easier to scan. */}
              <p className="bg-nav-accent/10 p-4 text-page-content shadow-sm">
                <b>GPA:</b> 3.86
              </p>
              <p className="bg-nav-accent/10 p-4 text-page-content shadow-sm">
                <b>Focus:</b> Software Development
              </p>
              <p className="bg-nav-accent/10 p-4 text-page-content shadow-sm">
                <b>Learning:</b> Cybersecurity
              </p>
              <p className="bg-nav-accent/10 p-4 text-page-content shadow-sm">
                <b>Goal:</b> Keep improving
              </p>
            </div>

            <p className="mt-6 leading-7 text-page-content">
              Maintaining strong academic standing throughout the program while building projects and continuing to improve my programming skills.
            </p>
          </div>

          <div className="bg-nav-accent/10 p-6 shadow-md shadow-section-divider/30">
            {/* This right side lists the extra credentials I am working on or have finished. */}
            <h3 className="font-bold text-page-content text-xl">Additional credentials</h3>
            <p className="mt-2 text-page-content">In progress at Arkansas Tech University</p>

            <section className="mt-5 grid gap-3">
              <span className="border-l-4 border-page-accent bg-content-bg p-3 text-sm text-page-content shadow-sm">A.S Information Technology</span>
              <span className="border-l-4 border-page-accent bg-content-bg p-3 text-sm text-page-content shadow-sm">A.S Cybersecurity</span>
              <span className="border-l-4 border-page-accent bg-content-bg p-3 text-sm text-page-content shadow-sm">Certificate in Mathematics</span>
              <span className="border-l-4 border-page-accent bg-content-bg p-3 text-sm text-page-content shadow-sm">Certificate in Computer Networking</span>
              <span className="border-l-4 border-page-accent bg-content-bg p-3 text-sm text-page-content shadow-sm">Certificate in Computer Programming &#183; Completed 2025</span>
            </section>
          </div>
        </div>

        
        {/* I imported the resume PDF at the top, then use it here as the link for the download button. */}
        <a className="mt-8 w-fit rounded-full bg-projects-btn px-6 py-3 text-center text-sm font-semibold text-white hover:opacity-90" href={Resume} download={Resume}>Download Resume</a>

      </div>
    </section>
  )
}

export default Education
