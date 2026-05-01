import { useEffect, useState } from "react";

// I put the skills in an array because the card layout repeats.
// This way, changing a skill only means editing this list instead of editing the JSX below.
const skills = [
  { name: "HTML", level: 90, detail: "Semantic pages and structured content" },
  { name: "CSS", level: 85, detail: "Responsive layouts, themes, and styling" },
  { name: "JavaScript", level: 80, detail: "Interactivity, DOM logic, and APIs" },
  { name: "React", level: 75, detail: "Components, state, props, and Vite apps" },
  { name: "C++", level: 80, detail: "Problem solving and programming fundamentals" },
  { name: "Tailwind CSS", level: 75, detail: "Utility classes and custom theme variables" },
  { name: "Git/GitHub", level: 70, detail: "Repositories, commits, and project tracking" },
  { name: "Node/Express", level: 60, detail: "Backend routes and connecting frontend data" }
];

const skillGroups = [
  // These groups are for the smaller category cards on the right side of the Skills section.
  {
    title: "Frontend",
    items: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS"]
  },
  {
    title: "Programming",
    items: ["C++", "JavaScript", "Problem Solving", "Debugging"]
  },
  {
    title: "Tools",
    items: ["GitHub", "VS Code", "NetBeans", "ExpressJs", "SQLLite"]
  },
  {
    title: "Learning Next",
    items: ["Cybersecurity", "Networking", "APIs", "Databases"]
  }
];

const Skills = () => {
  // animate starts false so the bars begin at 0 width.
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // After the component loads, I change animate to true so the bars grow to their percentages.
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="skills" className="border-b-2 border-section-divider bg-content-bg">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <p className="text-sm font-bold uppercase tracking-wide text-nav-accent">Skills</p>
        <h2 className="mt-3 text-3xl font-bold text-page-content sm:text-4xl">Skills</h2>
        <p className="mt-4 max-w-2xl leading-7 text-page-content">
          These are the tools, languages, and concepts I am using in my projects. I am strongest with frontend development, and I am also building more backend, cybersecurity, and networking experience.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-5">
            {/* I use map here so every item in the skills array creates one progress bar. */}
            {skills.map((skill) => (
              <div key={skill.name} className="border-l-4 border-page-accent bg-nav-accent/10 p-4 shadow-md shadow-section-divider/20">
                <div className="mb-2 flex justify-between gap-4 text-page-content">
                  <div>
                    <h3 className="text-lg font-bold">{skill.name}</h3>
                    <p className="mt-1 text-sm leading-6">{skill.detail}</p>
                  </div>
                  <span className="font-bold text-nav-accent">{skill.level}%</span>
                </div>

                <div className="h-4 w-full overflow-hidden rounded-full bg-white/80">
                  <div
                    className="h-full rounded-full bg-page-accent transition-all duration-1000 ease-in-out"
                    // If animate is false the bar is 0%. When it becomes true, it grows to the skill level.
                    style={{ width: animate ? `${skill.level}%` : "0%" }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-5">
            <div className="bg-page-accent/20 p-6 shadow-md shadow-section-divider/30">
              <h3 className="text-2xl font-bold text-page-content">What I can build</h3>
              <p className="mt-3 leading-7 text-page-content">
                I can create responsive websites, style theme-based interfaces, build React components, connect to APIs, and organize projects so they are easier to improve over time.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {/* These group cards are also made with map so the list can grow later. */}
              {skillGroups.map((group) => (
                <div key={group.title} className="bg-content-bg p-5 shadow-md shadow-section-divider/20 border border-nav-accent/30">
                  <h3 className="text-lg font-bold text-page-content">{group.title}</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span key={item} className="rounded-full border border-nav-accent/40 bg-nav-accent/10 px-3 py-2 text-sm text-page-content">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-l-4 border-page-accent bg-nav-accent/10 p-5 shadow-md shadow-section-divider/20">
              <h3 className="text-lg font-bold text-page-content">Currently improving</h3>
              <p className="mt-2 leading-7 text-page-content">
                I am working on writing cleaner React code, understanding backend routes better, and building stronger cybersecurity and networking knowledge through my classes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
