
import { Octokit } from 'octokit'
import { useState, useEffect } from "react"


const Projects = () => {
  const octokit = new Octokit();
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    async function getRepos() {
      const {data} = await octokit.request("GET /users/{username}/repos",{
        username: "SylAnna",
        sort:"updated",
        per_page:100,
    
      });
      setRepos(data);
    }
    getRepos();
  }, []);


  return (
    <section id="projects" className="border-b-2 border-section-divider bg-content-bg">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20" >
        <div className="flex flex-col gap-4 lg:flex-col lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-wide text-nav-accent">Projects</p>
            <h2 className="mt-3 text-3xl font-bold text-page-content sm:text-4xl">Projects</h2>
            <p className="mt-4 max-w-2xl text-page-content">
              This section is for projects I have built and what I learned from them.
            </p>
          </div>
         

          <a
            href="#contact"
            className="ml-0  rounded-full bg-projects-btn px-6 py-3 text-center text-sm font-semibold text-white hover:opacity-90 lg:w-100 "
          >
            Contact Me
          </a>

          <div className="mt-10 grid gap-4 md:grid-cols-3 lg:grid-cols-4">
            
            {repos.map((repo) => (
              <div key={repo.id} className=" bg-content-bg rounded-2xl border border-nav-accent/30 p-5 shadow-md shadow-section-divider/50">
                <h3 className='text-xl font-bold text-page-content'>{repo.name}</h3>
                <p className='mt-2 text-page-content'> {repo.description}</p>
                <a
                  href={repo.html_url}
                  target= "_blank"
                  rel="noreferrer"
                  className='mt-4 inline-block text-nav-accent'
                
                
                >View Repo
                </a>
                </div>
            ))}
      

          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects
