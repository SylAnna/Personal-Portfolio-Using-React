const Education = () => {
  return (
    <section id="education" className="border-b-2 border-section-divider bg-content-bg">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <p className="text-sm font-bold uppercase tracking-wide text-nav-accent">Education</p>
        <h2 className="mt-3 text-3xl font-bold text-page-content sm:text-4xl">Education</h2>
        <p className="mt-4 max-w-2xl text-page-content">
          I can use this section to talk about school, classes I have taken, and anything else related to my education.
        </p>

      <h1 className="text-page-content text-xl font-bold mt-10">Bachelor of Science in Computer Science</h1>
        <span className="text-page-content font-bold mt-5">College:</span>
        <span className="text-page-content"> Arkansas Tech University &#183; Expected May 2027 </span>
        <p className="text-page-content"> <b>GPA: </b> 3.86</p>
        <p className="text-page-content">Maintaining strong academic standing throughout the program</p>
        <br />
        <h3 className="font-bold text-page-content text-md">Additional credentials in progress at Arkansas Tech University</h3>
        <section className="flex flex-row flex-wrap gap-1 mt-2">
        <span className="text-sm text-page-content p-2 border rounded-full bg-page-accent/50 "> A.S Information Technology</span>
        <span className="text-sm text-page-content p-2 border rounded-full bg-page-accent/50 "> A.S Cybersecurity</span>
        <span className="text-sm text-page-content p-2 border rounded-full bg-page-accent/50 "> Cerificiate in Mathematics</span>
        <span className="text-sm text-page-content p-2 border rounded-full bg-page-accent/50 "> Certificate in Computer Networking</span>
        <span className="text-sm text-page-content p-2 border rounded-full bg-page-accent/50 "> Certificate in Computer Programming &#183; Completed 2025</span>
        </section>

      </div>
    </section>
  )
}

export default Education
