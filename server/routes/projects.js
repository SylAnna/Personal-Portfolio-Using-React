const express = require("express");
const { Octokit } = require("octokit");

// This file handles the API route for the Projects section on the frontend.
const router = express.Router();
// Octokit is GitHub's API helper. It lets this backend request my public repositories.
const octokit = new Octokit();

router.get("/", async (req, res) => {
  // GET /api/projects runs when the React Projects component asks for repo data.
  try {
    // This route asks GitHub for my public repos and sends them back to the Projects component.
    const { data } = await octokit.request("GET /users/{username}/repos", {
      // This is my GitHub username, so the API knows whose repos to return.
      username: "SylAnna",
      // Sort by recently updated so newer work appears first.
      sort: "updated",
      per_page: 100,
    });

    // Send the GitHub data back to React as JSON.
    res.json(data);
  } catch (error) {
    console.error("Projects route error:", error);

    if (error.status === 403) {
      // GitHub can rate limit requests, so this gives a clearer error when that happens.
      return res.status(500).json({ error: "GitHub rate limit reached." });
    }

    res.status(500).json({ error: "Failed to fetch repos from GitHub" });
  }
});

module.exports = router;
