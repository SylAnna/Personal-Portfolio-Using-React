require("dotenv").config({ path: ".env.local" });
require("dotenv").config();

// This file is the main starting point for my backend server.
// The frontend sends API requests here, and this server decides which route should handle them.
const express = require("express");
const { initDb } = require("./db");

// I separated the routes into their own files so this page does not get too crowded.
const projectsRouter = require("./routes/projects");
const messagesRouter = require("./routes/messages");

// app is the Express application. It is what receives requests like /api/messages.
const app = express();
// Render gives the app a PORT when deployed. Locally, I use 3001.
const PORT = process.env.PORT || 3001;

// I add CORS because the React frontend and Express backend may run on different websites.
// Without these headers, the browser can block the frontend from calling the backend.
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");

    if (req.method === "OPTIONS") {
        // Browsers can send an OPTIONS request before the real request, so I answer it quickly.
        return res.sendStatus(204);
    }

    next();
});

// This lets Express understand JSON request bodies.
// Without this, req.body would be undefined when the contact form sends data.
app.use(express.json());

// This test route lets me open /api/health and make sure the backend is awake.
app.get("/api/health", (req, res) => {
    res.json({ ok: true });
});

// Any request that starts with /api/projects gets sent to routes/projects.js.
app.use("/api/projects", projectsRouter);
// Any request that starts with /api/messages gets sent to routes/messages.js.
app.use("/api/messages", messagesRouter);

async function startServer() {
    try {
        // Before listening for requests, I try to make sure the database/table exists.
        await initDb();
        console.log("Database is ready.");
    } catch (error) {
        // The projects API can still work without the database, but messages need PostgreSQL.
        console.error("Database init failed:", error);
        console.error("Messages API will not work until PostgreSQL is running and reachable.");
    }

    app.listen(PORT, () => {
        // This prints the local backend link in the terminal when the server starts.
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

startServer();
