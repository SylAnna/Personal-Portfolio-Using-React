import { useState, useEffect } from "react"

// I read API errors carefully because sometimes the server sends text instead of JSON.
// This helper lets the page keep going instead of breaking if that happens.
async function parseJsonSafely(response) {
  const text = await response.text()
  if (!text) {
    return {}
  }

  try {
    return JSON.parse(text)
  } catch {
    return {}
  }
}

async function fetchGithubReposDirectly() {
  // This is the backup way to load projects. If my own backend route is not working,
// I can still ask GitHub directly for my public repositories.
  const response = await fetch(
    "https://api.github.com/users/SylAnna/repos?sort=updated&per_page=100"
  )

  if (!response.ok) {
    throw new Error("Failed to load projects")
  }

  return response.json()
}

const Projects = () => {
  // repos starts as an empty array because nothing has loaded from GitHub yet.
  // After the fetch works, setRepos fills this with project objects.
  const [repos, setRepos] = useState([]);
  // error stays blank unless the backend and the backup GitHub request both fail.
  const [error, setError] = useState("");

  useEffect(() => {
    // I use useEffect because I want the projects to load after this component appears.
    // That way the page can render first, then the project cards get added when the data comes back.
    async function getRepos() {
      try {
        // VITE_API_URL is the Render backend link when the site is live.
        // If it is empty while coding locally, Vite sends /api/projects to localhost through the proxy.
        const apiUrl = import.meta.env.VITE_API_URL || ""
        const response = await fetch(`${apiUrl}/api/projects`)

        if (!response.ok) {
          // If the server says the request failed, try to read the error message it sent back.
          const data = await parseJsonSafely(response)
          throw new Error(data.error || "Failed to load projects")
        }

        // If everything worked, turn the response into JavaScript data and save it in state.
        const data = await response.json()
        setRepos(data)
      } catch (err) {
        try {
          // If my backend fails, I try GitHub directly before showing an error on the page.
          const fallbackRepos = await fetchGithubReposDirectly()
          setRepos(fallbackRepos)
          setError("")
        } catch {
          setError(err.message)
        }
      }
    }
    getRepos()
  }, [])

  function formatDate(date) {
    // GitHub gives the updated date in a computer format, so I format it for people to read.
    if (!date) {
      return "Recently updated"
    }

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <section id="projects" className="border-b-2 border-section-divider bg-content-bg">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-wide text-nav-accent">Projects</p>
              <h2 className="mt-3 text-3xl font-bold text-page-content sm:text-4xl">Projects</h2>
              <p className="mt-4 max-w-2xl leading-7 text-page-content">
                These projects show different parts of how I learn and build. Some focus on web design, some focus on programming logic, and others are practice projects where I try new ideas and improve how I organize my code.
              </p>
            </div>

            <a
              href="#contact"
              className="w-fit rounded-full bg-projects-btn px-6 py-3 text-center text-sm font-semibold text-white shadow-md shadow-section-divider/30 hover:bg-page-accent hover:text-page-content duration-300"
            >
              Contact Me
            </a>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {/* These summary boxes use the loaded repo count and a few quick project notes. */}
            <div className="border-l-4 border-page-accent bg-nav-accent/10 p-5 shadow-md shadow-section-divider/20">
              <p className="text-3xl font-bold text-section-divider">{repos.length}</p>
              <p className="mt-1 text-sm font-bold text-page-content">GitHub repositories loaded</p>
            </div>
            <div className="border-l-4 border-page-accent bg-nav-accent/10 p-5 shadow-md shadow-section-divider/20">
              <p className="text-3xl font-bold text-section-divider">Builds</p>
              <p className="mt-1 text-sm font-bold text-page-content">Websites, classwork, and personal practice</p>
            </div>
            <div className="border-l-4 border-page-accent bg-nav-accent/10 p-5 shadow-md shadow-section-divider/20">
              <p className="text-3xl font-bold text-section-divider">Growth</p>
              <p className="mt-1 text-sm font-bold text-page-content">Each project helps me practice a new skill</p>
            </div>
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* I loop through repos with map, and each repo becomes one project card. */}
            {repos.map((repo) => (
              <div key={repo.id} className="flex min-h-64 flex-col justify-between border border-nav-accent/30 bg-content-bg p-5 shadow-md shadow-section-divider/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-section-divider/40 duration-300">
                <div>
                  <div className="mb-4 h-2 w-16 rounded-full bg-page-accent"></div>
                  <h3 className="break-words text-xl font-bold text-page-content">{repo.name}</h3>
                  <p className="mt-3 leading-6 text-page-content">
                    {repo.description || "A project repository I am using to practice, build, and improve my coding skills."}
                  </p>
                </div>

                <div className="mt-6">
                  <div className="mb-4 flex flex-wrap gap-2">
                    {repo.language && (
                      <span className="rounded-full border border-nav-accent/40 bg-nav-accent/10 px-3 py-1 text-sm text-page-content">
                        {repo.language}
                      </span>
                    )}
                    <span className="rounded-full border border-nav-accent/40 bg-nav-accent/10 px-3 py-1 text-sm text-page-content">
                      Updated {formatDate(repo.updated_at)}
                    </span>
                  </div>

                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block rounded-full border-2 border-page-content px-5 py-2 text-sm font-bold text-page-content hover:border-nav-accent hover:text-nav-accent duration-300"
                  >
                    View Repo
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects
