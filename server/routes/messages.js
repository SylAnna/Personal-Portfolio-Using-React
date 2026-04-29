const express = require("express");
const { Resend } = require("resend");
const { getPool } = require("../db");

const router = express.Router();
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

function cleanHtml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function databaseError(error) {
  return (
    error.code === "ECONNREFUSED" ||
    error.code === "ECONNRESET" ||
    error.code === "28P01" ||
    error.code === "3D000"
  );
}

async function sendEmail(name, email, message) {
  if (!resend || !process.env.CONTACT_EMAIL || !process.env.RESEND_FROM_EMAIL) {
    console.warn("Resend email skipped. Check your .env.local file.");
    return;
  }

  const { data, error } = await resend.emails.send({
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
  try {
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
  const name = req.body.name?.trim();
  const email = req.body.email?.trim().toLowerCase();
  const message = req.body.message?.trim();

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required" });
  }

  if (!email.includes("@") || !email.includes(".")) {
    return res.status(400).json({ error: "Please enter a valid email address" });
  }

  if (name.length > 120) {
    return res.status(400).json({ error: "Name must be 120 characters or fewer" });
  }

  if (message.length > 5000) {
    return res.status(400).json({ error: "Message must be 5000 characters or fewer" });
  }

  try {
    const result = await getPool().query(
      "INSERT INTO contact_messages (name, email, message) VALUES ($1, $2, $3) RETURNING *",
      [name, email, message]
    );
    let emailSent = false;
    let emailError = "";

    try {
      await sendEmail(name, email, message);
      emailSent = true;
    } catch (error) {
      console.error("Resend email error:", error);
      emailError = error.message || "Resend could not send the email";
    }

    res.status(201).json({
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
  const id = Number(req.params.id);

  if (!id) {
    return res.status(400).json({ error: "Message id is required" });
  }

  try {
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
