const express = require("express");
const { Octokit } = require("octokit");

const router = express.Router();
const octokit = new Octokit();

router.get("/", async (req, res) => {
  try {
    const { data } = await octokit.request("GET /users/{username}/repos", {
      username: "SylAnna",
      sort: "updated",
      per_page: 100,
    });

    res.json(data);
  } catch (error) {
    console.error("Projects route error:", error);

    if (error.status === 403) {
      return res.status(500).json({ error: "GitHub rate limit reached." });
    }

    res.status(500).json({ error: "Failed to fetch repos from GitHub" });
  }
});

module.exports = router;
