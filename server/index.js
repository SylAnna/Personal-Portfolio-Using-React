require("dotenv").config({ path: ".env.local" });
require("dotenv").config();

const express = require("express");
const { initDb } = require("./db");

const projectsRouter = require("./routes/projects");
const messagesRouter = require("./routes/messages");

const app = express();
const PORT = process.env.PORT || 3001;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");

    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }

    next();
});

app.use(express.json());

app.get("/api/health", (req, res) => {
    res.json({ ok: true });
});

app.use("/api/projects", projectsRouter);
app.use("/api/messages", messagesRouter);

async function startServer() {
    try {
        await initDb();
        console.log("Database is ready.");
    } catch (error) {
        console.error("Database init failed:", error);
        console.error("Messages API will not work until PostgreSQL is running and reachable.");
    }

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

startServer();
