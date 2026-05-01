# Personal Portfolio Using React

A personal portfolio site built with React, Vite, and Tailwind CSS. The project is organized as a portfolio application inside the `portfolio/` folder and includes sections for about, education, projects, skills, contact information, and saved contact messages.

The project also includes an Express backend and a PostgreSQL database.

## Live Site

Live link: https://personal-portfolio-using-react-1.onrender.com/

## Features

- Single-page portfolio layout
- Section-based navigation
- Responsive navigation menu for smaller screens
- Theme selector with multiple theme options
- Projects section that uses the GitHub API through Octokit
- Contact form that sends data to an Express backend
- PostgreSQL database for saved contact messages
- Email notifications with Resend
- Dedicated sections for:
  - About
  - Education
  - Projects
  - Skills
  - Contact
  - Messages

## Tech Stack

- React
- Vite
- Tailwind CSS
- JavaScript
- Node.js
- Express
- PostgreSQL
- Octokit
- Resend

## Repository Layout

The main front-end app lives in the `portfolio/` directory. The backend lives in the `server/` directory.

```text
Personal-Portfolio-Using-React/
|- package.json
|- server/
   |- index.js
   |- db.js
   |- routes/
|- portfolio/
   |- package.json
   |- vite.config.js
   |- index.html
   |- src/
   |- public/
```

## How To Run

Move into the app directory:

```bash
cd portfolio
```

Install frontend dependencies:

```bash
npm install
```

Start the frontend development server:

```bash
npm run dev
```

Open the local URL shown by Vite in your browser.

## Running The Messaging Feature

The contact form and messages page need the backend server to be running.

From the main project folder, start the backend:

```bash
npm run server
```

Then from the `portfolio/` folder, start the frontend:

```bash
npm run dev
```

Both commands need to be running for the contact form to save messages to the PostgreSQL database.

## Build For Production

Move into the app directory:

```bash
cd portfolio
```

Build the frontend:

```bash
npm run build
```

The production build is created inside the `dist/` folder.

## Notes

- The root of the repository contains the backend dependencies and scripts.
- The main portfolio frontend is inside `portfolio/`.
- The backend API is inside `server/`.
- The contact form uses the backend route `/api/messages`.
- The projects section uses the backend route `/api/projects`.
- The frontend can use `VITE_API_URL` when deployed so it knows where the backend is hosted.
