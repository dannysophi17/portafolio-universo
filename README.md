# Daniela Coavas — Interactive 3D Portfolio

<div align="center">

![Portfolio Preview](public/projects/preview-portfolio.png)

### [View Live Portfolio](https://dcoavas.com/)

[![CI](https://github.com/dannysophi17/portafolio-universo/actions/workflows/ci.yml/badge.svg)](https://github.com/dannysophi17/portafolio-universo/actions/workflows/ci.yml)
![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![Three.js](https://img.shields.io/badge/Three.js-3D-black?style=flat-square&logo=three.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss)
![AWS Amplify](https://img.shields.io/badge/AWS_Amplify-Deployed-FF9900?style=flat-square&logo=awsamplify)

</div>

---

## About

My personal portfolio is an interactive 3D web experience inspired by a small universe.

Instead of navigating through traditional pages, visitors explore planets representing the main sections of the portfolio: About, Journey, Skills, Projects, Certifications, and Contact.

The application combines modern frontend development with real-time 3D graphics, responsive design, bilingual content, and cloud deployment.

## Features

- Interactive 3D planetary navigation
- Dynamic camera transitions and focus modes
- Responsive experience for desktop, tablet, and mobile
- Spanish and English language support
- Project showcase with image galleries and live demos
- Technical skills organized by category
- Professional journey and certifications
- Contact form powered by EmailJS
- Optimized images with Next.js Image
- Automated code-quality validation with GitHub Actions
- Continuous deployment through AWS Amplify

## Tech Stack

| Area       | Technologies                      |
| ---------- | --------------------------------- |
| Framework  | Next.js 16                        |
| UI         | React 19                          |
| Language   | TypeScript                        |
| 3D         | Three.js, React Three Fiber, Drei |
| Styling    | Tailwind CSS 4                    |
| Email      | EmailJS                           |
| Quality    | ESLint, Prettier, TypeScript      |
| CI         | GitHub Actions                    |
| Deployment | AWS Amplify                       |
| Domain     | Route 53                          |

## Architecture

```text
Visitor
	│
	▼
Route 53
	│
	▼
AWS Amplify
	│
	▼
Next.js Application
	│
	├── React UI
	├── Three.js / React Three Fiber
	├── Portfolio content
	├── Project assets
	└── EmailJS contact integration
```

The portfolio is currently generated as static content by Next.js and deployed automatically from the `main` branch through AWS Amplify.

## Project Structure

```text
.
├── .github/
│   └── workflows/
│       └── ci.yml
├── app/
│   ├── components/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── translations.ts
├── public/
│   └── projects/
├── .editorconfig
├── .nvmrc
├── .prettierignore
├── .prettierrc.json
├── eslint.config.mjs
├── next.config.ts
├── package.json
└── tsconfig.json
```

## Local Development

### Requirements

- Node.js 24
- npm

### Installation

```bash
git clone https://github.com/dannysophi17/portafolio-universo.git
cd portafolio-universo
npm ci
```

Start the development server:

```bash
npm run dev
```

Then open:

```bash
http://localhost:3000
```

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run lint:fix
npm run typecheck
npm run format
npm run format:check
npm run check
```

Before opening a pull request, run:

```bash
npm run check
```

This validates TypeScript, ESLint, formatting, and the production build.

## CI/CD

Pull requests and pushes to `main` are validated automatically with GitHub Actions.

The CI workflow runs:

```bash
npm ci
npm run check
```

The `main` branch is protected and requires the quality checks to pass before changes are merged.

After a successful merge to `main`, AWS Amplify automatically builds and deploys the portfolio.

## Languages

The interface is available in:

- Spanish
- English

Translations are maintained in:

```bash
app/translations.ts
```

## Deployment

Production is hosted with **AWS Amplify** and served through the custom domain:

**[https://dcoavas.com](<>)**

The production branch is:

```bash
main
```

Automatic deployments are enabled.

## Author

**Daniela Sophia Coavas Barboza**

- Portfolio: [https://dcoavas.com](<>)
- GitHub: [https://github.com/dannysophi17](https://github.com/dannysophi17)

## License

Copyright © 2026 Daniela Sophia Coavas Barboza. All rights reserved.

The source code is publicly visible for portfolio and review purposes. No permission is granted to copy, modify, redistribute, or reuse the code without explicit authorization from the author.
