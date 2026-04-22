import { useEffect, useState } from "react";

const skills = [
  { name: "HTML", level: 90 },
  { name: "CSS", level: 85 },
  { name: "JavaScript", level: 80 },
  { name: "React", level: 75 },,
  { name: "C++", level: 80}
];

const Skills = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="skills" className="border-b-2 border-section-divider bg-content-bg">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <p className="text-sm font-bold uppercase tracking-wide text-nav-accent">Skills</p>
        <h2 className="mt-3 text-3xl font-bold text-page-content sm:text-4xl">Skills</h2>
        <p className="mt-4 max-w-2xl text-page-content">
          This section is for the tools and languages I know and the ones I am still learning.
        </p>

        <div className="mt-8 space-y-5">
          {skills.map((skill) => (
            <div key={skill.name}>
              <div className="mb-1 flex justify-between text-page-content">
                <span>{skill.name}</span>
                <span>{skill.level}%</span>
              </div>

              <div className="h-4 w-full overflow-hidden rounded-full bg-gray-50">
                <div
                  className="h-full rounded-full bg-page-accent transition-all duration-1000 ease-in-out"
                  style={{ width: animate ? `${skill.level}%` : "0%" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
