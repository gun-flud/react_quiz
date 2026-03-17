# ⚡ Quiz React

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="NodeJS" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JS" />
</p>

---

### 📖 Description
**Quiz React** is a full-stack interactive application. It features a modern React frontend and a dedicated backend server, designed with **architectural simplicity** and clean code principles in mind.

---

### 🚀 Key Features
* 🏗️ **Full-Stack Architecture** – Separated client and server logic for better maintainability.
* ✨ **Reactive UI** – Instant feedback and state updates using React Hooks.
* 📱 **Mobile-First** – Fully responsive layout optimized for mobile devices.
* 🛠️ **Developer Friendly** – Configured with ESLint for consistent code quality.

---

### 📂 Project Structure
```text
.
├── 📁 client/          # Frontend (React application)
├── 📁 server/          # Backend (Node.js/API logic)
├── 📁 public/          # Static assets
├── 📄 eslint.config.js # Linting configuration
└── 📄 LICENSE          # Project license
```


## 📁 Client Directory Structure

This project uses a **Feature-Driven Architecture** combined with a standard React + Vite setup. Instead of grouping all files by their type (e.g., all API calls together), we group the core business logic by feature to keep the codebase modular and scalable.

All application code lives inside the `src` directory, which can be imported cleanly using the `@/` path alias configured in `jsconfig.json`.

```text
client/
├── src/                  # Main application source code
│   ├── assets/           # Global assets, CSS, and Tailwind styles
│   ├── components/       # Global, highly reusable UI components (Buttons, Inputs, etc.)
│   ├── features/         # Feature-based modules (e.g., quizzes, server-health)
│   │                     # ↳ Contains feature-specific API calls, UI, and logic
│   ├── lib/              # Third-party library configurations (e.g., base fetchers)
│   ├── pages/            # Full-page route components that assemble features together
│   ├── utils/            # Pure helper functions and mathematical/string utilities
│   ├── App.jsx           # The root React component and routing wrapper
│   └── main.jsx          # The Vite entry point that mounts React to the DOM
├── index.html            # Main HTML template
├── jsconfig.json         # Editor path alias configuration (@/*)
├── package.json          # Frontend dependencies and npm scripts
└── vite.config.js        # Vite settings, Tailwind plugins, and Backend Proxy rules
```
