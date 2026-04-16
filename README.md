# Personal Portfolio Using React

A personal portfolio site built with React, Vite, and Tailwind CSS. The project is organized as a portfolio application inside the `portfolio/` folder and includes sections for about, education, projects, skills, and contact information.

## Features

- Single-page portfolio layout
- Section-based navigation
- Responsive navigation menu for smaller screens
- Theme selector with multiple theme options
- Dedicated sections for:
  - About
  - Education
  - Projects
  - Skills
  - Contact

## Tech Stack

- React
- Vite
- Tailwind CSS
- JavaScript

## Repository Layout

The main front-end app lives in the `portfolio/` directory.

```text
Personal-Portfolio-Using-React/
|- package.json
|- portfolio/
   |- package.json
   |- vite.config.js
   |- src/
   |- public/
```

## How To Run

1. Move into the app directory:

```bash
cd portfolio
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open the local URL shown by Vite in your browser.

## Build For Production

```bash
cd portfolio
npm run build
```

## Notes

- The root of the repository contains additional package metadata, but the main portfolio app is inside `portfolio/`.
- The nested `portfolio/README.md` is still the default Vite template, while this root README describes the repository as a whole.
