import { useState } from "react";

const apiUrls = [
  import.meta.env.VITE_API_URL || "",
  "http://localhost:3001",
];

const contactDetails = [
  {
    title: "Best for",
    text: "Project questions, collaboration, and portfolio feedback.",
  },
  {
    title: "Response",
    text: "Messages are saved through the contact form.",
  },
  {
    title: "Also building",
    text: "React projects, backend routes, and stronger cybersecurity skills.",
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function sendMessage() {
    for (const url of apiUrls) {
      try {
        const response = await fetch(`${url}/api/messages`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        return { response, data };
      } catch {
        // Try the next API url.
      }
    }

    throw new TypeError("Messages server is not reachable");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("");
    setIsSubmitting(true);

    try {
      const { response, data } = await sendMessage();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      if (data.emailSent) {
        setStatus("Message sent successfully!");
      } else {
        setStatus(`Message saved, but the email did not send. ${data.emailError || "Check the backend terminal for the Resend error."}`);
      }
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      if (error instanceof TypeError) {
        setStatus("Could not reach the server. Make sure `npm run dev` is running from the main project folder, or make sure the backend is running on http://localhost:3001.");
      } else {
        setStatus(error.message || "Failed to send message");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="bg-content-bg">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="border-l-4 border-page-accent bg-nav-accent/10 p-6 shadow-md shadow-section-divider/30">
            <p className="text-sm font-bold uppercase tracking-wide text-nav-accent">Contact</p>
            <h2 className="mt-3 text-3xl font-bold text-page-content sm:text-4xl">Contact Me</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-page-content sm:text-lg">
              If you want to reach out, send me a message here. This is a good place for project questions, feedback, or anything related to my portfolio.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row lg:flex-col">
              <a
                href="mailto:saanderson050@gmail.com"
                className="rounded-full bg-projects-btn px-6 py-3 text-center text-sm font-semibold text-white shadow-md shadow-section-divider/30 hover:bg-page-accent hover:text-page-content duration-300"
              >
                Email Me
              </a>
              <a
                href="#about"
                className="rounded-full border-2 border-page-content px-6 py-3 text-center text-sm font-semibold text-page-content hover:border-nav-accent hover:text-nav-accent duration-300"
              >
                Back to Top
              </a>
            </div>

            <div className="mt-8 grid gap-4">
              {contactDetails.map((detail) => (
                <div key={detail.title} className="bg-content-bg p-4 shadow-sm">
                  <h3 className="font-bold text-page-content">{detail.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-page-content">{detail.text}</p>
                </div>
              ))}
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 border border-nav-accent/30 bg-content-bg p-6 text-page-content shadow-md shadow-section-divider/40"
          >
            <div>
              <label htmlFor="name" className="text-sm font-bold">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                maxLength={120}
                required
                className="mt-2 w-full rounded-md border border-nav-accent/40 bg-white px-4 py-3 text-black outline-none focus:border-page-accent focus:ring-2 focus:ring-page-accent/30"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="text-sm font-bold">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-md border border-nav-accent/40 bg-white px-4 py-3 text-black outline-none focus:border-page-accent focus:ring-2 focus:ring-page-accent/30"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="text-sm font-bold">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                maxLength={5000}
                required
                className="mt-2 h-52 w-full resize-none rounded-md border border-nav-accent/40 bg-white px-4 py-3 text-black outline-none focus:border-page-accent focus:ring-2 focus:ring-page-accent/30"
                placeholder="Type your message here..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 cursor-pointer rounded-full bg-projects-btn px-6 py-3 text-sm font-semibold text-white shadow-md shadow-section-divider/30 hover:bg-page-accent hover:text-page-content duration-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>

            {status && (
              <p aria-live="polite" className="border-l-4 border-page-accent bg-nav-accent/10 p-3 text-sm font-medium text-page-content">
                {status}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
