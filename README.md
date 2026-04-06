# ⚡ Quiz React

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="NodeJS" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JS" />
  <img src="https://img.shields.io/badge/Fastify-000000?style=for-the-badge&logo=fastify&logoColor=white" alt="Fastify" />
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

Our `src/` directory is strictly organized by responsibility.

### `assets/`
Contains global static files that do not change dynamically.
* **Contents:** Images, SVGs, global CSS (`index.css`), fonts.
* **Rule:** No JavaScript business logic resides here.

### `components/`
Contains pure, reusable UI components shared across the entire application.
* **Contents:** Buttons, inputs, modals, loading spinners, and layout wrappers.
* **Rule:** These components are "dumb". They should not contain data-fetching logic or domain-specific state. They receive data strictly via `props`.

### `features/`
The core business logic of the application, broken down by domain (e.g., `quizzes`, `users`, `auth`).
* **Contents:** Each feature folder acts as its own mini-application containing:
  * `/api`: Pure JS functions for fetching/mutating data (`getQuizzes.js`).
  * `/hooks`: React hooks that bridge the API with the UI (`useQuizzes.js`).
  * `/components`: Domain-specific UI elements that are not shared globally (`QuizCard.jsx`).
* **Rule:** Features should be self-contained. A component in the `quizzes` feature should not directly mutate state belonging to the `users` feature.

### `lib/`
Contains global infrastructure, API clients, and complex custom engines.
* **Contents:** * `apiClient.js`: The centralized fetch wrapper handling base URLs and global errors.
  * `queryCache.js`: The LRU cache instance for storing API responses.
  * `useCustomQuery.js`: The custom data-fetching engine managing `isLoading`, `error`, and `data` states.
* **Rule:** Code here must be completely agnostic. It should not know what a "Quiz" is; it only handles generic data pipelines.

### `pages/`
The routing layer. These files represent the actual screens the user navigates to.
* **Contents:** `DashboardPage.jsx`, `QuizEditorPage.jsx`.
* **Rule:** Keep these files extremely thin. They act as "assemblers" that import UI from `components/` and data from `features/`, rendering them together on the screen.

### `utils/`
Stateless, pure JavaScript helper functions.
* **Contents:** Data formatters, mathematical calculators (e.g., test grading logic), or string manipulators.
* **Rule:** No React code or Hooks (`useState`, `useEffect`) are allowed in this folder.
