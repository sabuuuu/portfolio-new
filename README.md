# Portfolio 2.0

A modern, interactive developer portfolio built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**. Features 3D graphics, internationalization, and smooth animations.

## Features

- ⚡️ Fast Vite-based development
- 🎨 Styled with Tailwind CSS
- 🌍 Multi-language support (English & French)
- 🖼️ 3D graphics using react-three-fiber, drei, and rapier
- 📄 Downloadable resume (PDF)
- 💬 Contact form
- 🧩 Modular, reusable components
- 🌓 Dark UI

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- pnpm (or npm/yarn)

### Installation

```bash
pnpm install
# or
npm install
```

### Development

```bash
pnpm dev
# or
npm run dev
```

## Project Structure

- `src/components/sections/` – Main page sections (Hero, Projects, Stack, Contact, etc.)
- `src/components/bits/` – Animation and 3D components
- `src/pages/Home.tsx` – Main landing page
- `src/locales/` – Translation files (`en.json`, `fr.json`)
- `public/` – Static assets (PDF resumes, images)

## Customization

- Update your resume in `public/en.pdf` and `public/fr.pdf`.
- Edit translations in `src/locales/en.json` and `src/locales/fr.json`.
- Modify sections/components in `src/components/sections/`.

## License

This project is for personal portfolio use. Feel free to fork and adapt!
