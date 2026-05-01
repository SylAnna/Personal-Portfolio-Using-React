const express = require("express");
const { Resend } = require("resend");
const { getPool } = require("../db");

// This file handles the contact form API.
// It can save messages, load saved messages, delete messages, and send email notifications.
const router = express.Router();
// Resend is only created if the API key exists, so the app can still run without email setup.
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// I clean user text before putting it in an email so typed symbols do not turn into HTML.
function cleanHtml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function databaseError(error) {
  // These error codes helped me tell the difference between a database problem and a normal app problem.
  return (
    error.code === "ECONNREFUSED" ||
    error.code === "ECONNRESET" ||
    error.code === "28P01" ||
    error.code === "3D000"
  );
}

async function sendEmail(name, email, message) {
  // Sending an email is extra. If Resend is not set up, the database part can still work.
  if (!resend || !process.env.CONTACT_EMAIL || !process.env.RESEND_FROM_EMAIL) {
    console.warn("Resend email skipped. Check your .env.local file.");
    return;
  }

  const { data, error } = await resend.emails.send({
    // These email values come from .env.local or from Render environment variables.
    from: process.env.RESEND_FROM_EMAIL,
    to: process.env.CONTACT_EMAIL,
    replyTo: email,
    subject: `New portfolio message from ${name}`,
    html: `
      <h2>New portfolio contact message</h2>
      <p><strong>Name:</strong> ${cleanHtml(name)}</p>
      <p><strong>Email:</strong> ${cleanHtml(email)}</p>
      <p><strong>Message:</strong></p>
      <p>${cleanHtml(message).replaceAll("\n", "<br />")}</p>
    `,
  });

  if (error) {
    throw new Error(error.message || "Resend could not send the email");
  }

  return data;
}

router.get("/", async (req, res) => {
  // GET /api/messages is used by the Messages page to show saved submissions.
  try {
    // This gets all saved contact messages and puts the newest message first.
    const result = await getPool().query(
      "SELECT * FROM contact_messages ORDER BY created_at DESC"
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Messages fetch error:", error);

    if (databaseError(error)) {
      return res.status(500).json({
        error: "Database connection failed. Ensure that PostgreSQL is running",
      });
    }

    res.status(500).json({ error: "Failed to load messages" });
  }
});

router.post("/", async (req, res) => {
  // POST /api/messages is used by the contact form when someone clicks Send Message.
  // req.body contains the JSON that came from the React form.

  // First I clean up the form fields so extra spaces are not saved.
  const name = req.body.name?.trim();
  const email = req.body.email?.trim().toLowerCase();
  const message = req.body.message?.trim();

  if (!name || !email || !message) {
    // The frontend has required fields, but the backend checks again for safety.
    return res.status(400).json({ error: "Name, email, and message are required" });
  }

  if (!email.includes("@") || !email.includes(".")) {
    // This is a simple email check. The input type=email helps on the frontend too.
    return res.status(400).json({ error: "Please enter a valid email address" });
  }

  if (name.length > 120) {
    // Length limits keep the database values reasonable.
    return res.status(400).json({ error: "Name must be 120 characters or fewer" });
  }

  if (message.length > 5000) {
    return res.status(400).json({ error: "Message must be 5000 characters or fewer" });
  }

  try {
    // The $1, $2, and $3 placeholders are where the form values go.
    // This is safer than putting typed text directly into the SQL string.
    const result = await getPool().query(
      "INSERT INTO contact_messages (name, email, message) VALUES ($1, $2, $3) RETURNING *",
      [name, email, message]
    );
    // These values tell the frontend whether the email part worked after the database save.
    let emailSent = false;
    let emailError = "";

    try {
      // After the database save works, try to send me an email notification.
      await sendEmail(name, email, message);
      emailSent = true;
    } catch (error) {
      console.error("Resend email error:", error);
      emailError = error.message || "Resend could not send the email";
    }

    res.status(201).json({
      // result.rows[0] is the message row that was just inserted into PostgreSQL.
      ...result.rows[0],
      emailSent,
      emailError,
    });
  } catch (error) {
    console.error("Messages route error:", error);

    if (databaseError(error)) {
      return res.status(500).json({
        error: "Database connection failed. Check that PostgreSQL",
      });
    }

    res.status(500).json({ error: "Failed to save message" });
  }
});

router.delete("/:id", async (req, res) => {
  // DELETE /api/messages/:id removes one message.
  // The :id part becomes req.params.id.

  // This route deletes one saved message using the id from the URL.
  const id = Number(req.params.id);

  if (!id) {
    // If the id cannot become a number, the backend should not run the delete query.
    return res.status(400).json({ error: "Message id is required" });
  }

  try {
    // RETURNING * gives back the deleted row so I know whether anything was actually deleted.
    const result = await getPool().query(
      "DELETE FROM contact_messages WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Message not found" });
    }

    res.json({ message: "Message deleted" });
  } catch (error) {
    console.error("Message delete error:", error);

    if (databaseError(error)) {
      return res.status(500).json({
        error: "Database connection failed. Ensure that PostgreSQL is running",
      });
    }

    res.status(500).json({ error: "Failed to delete message" });
  }
});

module.exports = router;
