import { useCallback, useEffect, useState } from "react";

// I use the same backend links as the contact form because this page reads the saved form messages.
// The Render link works online, and localhost works when I am testing on my computer.
const apiUrls = [
  import.meta.env.VITE_API_URL || "",
  "http://localhost:3001",
];

const Messages = () => {
  // messages starts empty, then gets filled with rows from the database.
  const [messages, setMessages] = useState([]);
  // loading is true while I am waiting for the backend to respond.
  const [loading, setLoading] = useState(true);
  // error stays blank unless something goes wrong while loading or deleting.
  const [error, setError] = useState("");

  const getMessages = useCallback(async () => {
    // When this runs, I ask the backend for every saved message.
    setLoading(true);
    setError("");

    try {
      let response;
      let data;

      // Try each backend URL until one of them answers.
      for (const url of apiUrls) {
        try {
          response = await fetch(`${url}/api/messages`);
          data = await response.json();
          break;
        } catch {
          response = null;
        }
      }

      if (!response) {
        // If none of the URLs worked, show a clearer error for the page.
        throw new TypeError("Messages server is not reachable");
      }

      if (!response.ok) {
        throw new Error(data.error || "Failed to load messages");
      }

      setMessages(data);
    } catch (error) {
      if (error instanceof TypeError) {
        setError("Could not reach the messages server. Run `npm run dev` from the main project.");
      } else {
        setError(error.message || "Failed to load messages");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  async function deleteMessage(id) {
    // Before deleting, ask first so I do not remove a message by mistake.
    const confirmDelete = window.confirm("Delete this message?");

    if (!confirmDelete) {
      return;
    }

    try {
      let response;
      let data;

      // Send a DELETE request to the backend with the message id in the URL.
      for (const url of apiUrls) {
        try {
          response = await fetch(`${url}/api/messages/${id}`, {
            method: "DELETE",
          });
          data = await response.json();
          break;
        } catch {
          response = null;
        }
      }

      if (!response) {
        throw new TypeError("Messages server is not reachable");
      }

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete message");
      }

      setMessages((prev) => prev.filter((message) => message.id !== id));
    } catch (error) {
      setError(error.message || "Failed to delete message");
    }
  }

  useEffect(() => {
    // Load the saved messages when this page first opens.
    getMessages();
  }, [getMessages]);

  // Since the backend sorts newest first, the first message is the newest one.
  const newestMessage = messages[0];

  return (
    <section className="border-b-2 border-section-divider bg-content-bg">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-wide text-nav-accent">Messages</p>
              <h2 className="mt-3 text-3xl font-bold text-page-accent sm:text-4xl">Contact Messages</h2>
              <p className="mt-4 max-w-2xl leading-7 text-page-content">
                See the messages other people have sent regarding the portfolio
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="/"
                className="rounded-full border-2 border-page-content px-6 py-3 text-center text-sm font-semibold text-page-content hover:border-nav-accent hover:text-nav-accent duration-300"
              >
                Back Home
              </a>
              <button
                type="button"
                onClick={getMessages}
                className="cursor-pointer rounded-full bg-projects-btn px-6 py-3 text-sm font-semibold text-white shadow-md shadow-section-divider/30 hover:bg-page-accent hover:text-page-content duration-300"
              >
                Refresh Messages
              </button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {/* These boxes summarize the message list before showing every full message. */}
            <div className="border-l-4 border-page-accent bg-nav-accent/10 p-5 shadow-md shadow-section-divider/20">
              <p className="text-3xl font-bold text-page-accent">{messages.length}</p>
              <p className="mt-1 text-sm font-bold text-page-content">Total messages</p>
            </div>
            <div className="border-l-4 border-page-accent bg-nav-accent/10 p-5 shadow-md shadow-section-divider/20">
              <p className="text-3xl font-bold text-page-accent">{loading ? "..." : "Live"}</p>
              <p className="mt-1 text-sm font-bold text-page-content">Form inbox status</p>
            </div>
            <div className="border-l-4 border-page-accent bg-nav-accent/10 p-5 shadow-md shadow-section-divider/20">
              <p className="text-lg font-bold text-page-accent">
                {newestMessage ? new Date(newestMessage.created_at).toLocaleDateString() : "None yet"}
              </p>
              <p className="mt-1 text-sm font-bold text-page-content">Newest message</p>
            </div>
          </div>

          {loading && (
            <div className="border-l-4 border-page-accent bg-nav-accent/10 p-5 text-page-content shadow-md shadow-section-divider/20">
              Loading messages...
            </div>
          )}

          {error && (
            <div className="border-l-4 border-red-500 bg-red-500/10 p-5 text-red-500 shadow-md shadow-section-divider/20">
              {error}
            </div>
          )}

          {!loading && !error && messages.length === 0 && (
            <div className="border-l-4 border-page-accent bg-nav-accent/10 p-6 shadow-md shadow-section-divider/20">
              <h3 className="text-xl font-bold text-page-content">No messages yet</h3>
              <p className="mt-2 leading-7 text-page-content">
               Previous submissions...
              </p>
            </div>
          )}

          <div className="grid gap-4">
            {/* I use map so each message row from the database becomes one message card. */}
            {messages.map((message) => (
              <div
                key={message.id}
                className="border border-nav-accent/30 bg-content-bg p-5 shadow-md shadow-section-divider/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-section-divider/40 duration-300"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="mb-4 h-2 w-16 rounded-full bg-page-accent"></div>
                    <h3 className="text-2xl font-bold text-page-content">{message.name}</h3>
                    <a
                      href={`mailto:${message.email}`}
                      className="mt-2 inline-block break-all text-sm font-bold text-nav-accent hover:text-page-accent"
                    >
                      {message.email}
                    </a>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row lg:items-center">
                    <p className="w-fit rounded-full border border-nav-accent/40 bg-nav-accent/10 px-3 py-2 text-sm text-page-content">
                      {new Date(message.created_at).toLocaleString()}
                    </p>
                    <button
                      type="button"
                      onClick={() => deleteMessage(message.id)}
                      className="w-fit cursor-pointer rounded-full border border-red-500 px-4 py-2 text-sm font-bold text-red-500 hover:bg-red-500 hover:text-white duration-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <p className="mt-5 whitespace-pre-wrap border-l-4 border-page-accent bg-nav-accent/10 p-4 leading-7 text-page-content">
                  {message.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Messages;
