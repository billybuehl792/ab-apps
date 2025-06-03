# 🚀 AB Apps

This is the official frontend codebase for the **[AB Apps]** web application, built using **Vite** and **React**. It is intended **only for internal use** by the development team working on this project.

> ⚠️ **Note:** This repository is **not** a boilerplate or template for general use. Please do not clone or reuse outside of the project context.

---

## 🧱 Tech Stack

- **Framework:** [React](https://reactjs.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Language:** TypeScript
- **Styling:** MaterialUI
- **Routing:** Tanstack Router

---

## 🛠️ Getting Started

### Prerequisites

- Node.js (version X.X.X or higher)
- npm or yarn

### Installation

```bash
# Clone the repo (internal only)
git clone git@github.com:billybuehl792/ab-apps.git

# Navigate into the project
cd ab-apps

# Install dependencies
npm install
# or
yarn
```

### Running Locally

```bash
npm run dev
# or
yarn dev
```

The app will start on `http://localhost:5173/` (or another available port).

---

## 🧪 Scripts

| Command            | Description                   |
| ------------------ | ----------------------------- |
| `dev`              | Start local dev server        |
| `build`            | Build for production          |
| `preview`          | Preview production build      |
| `lint`             | Run linter                    |
| `test`             | Run test suite                |
| `emulators:start`  | Run firebase emulators        |
| `emulators:export` | Export firebase emulator data |

---

## 📁 Project Structure

```
src/
├── components/    # Reusable React components
├── config/        # Client side configuration
├── constants/     # Variables used throughout app
├── containers/    # Feature components
├── context/       # Context files
├── hooks/         # Custom hooks
├── lib/           # API or external services
├── routes/        # Route-based components
├── App.tsx        # Root component
├── main.tsx       # Entry point
```

---

## 🔐 Environment Variables

Environment-specific variables should be defined in `.env`, `.env.local`, `.env.production`, etc. files:

```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_APP_ID
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_MEASUREMENT_ID
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_RECAPTCHA_SITE_KEY
VITE_GOOGLE_MAPS_API_KEY

```

> Never commit `.env` files with sensitive data to the repo.

---

## 👥 Contributors

This project is maintained by me. For questions or onboarding support, contact me.

---

## 📄 License

This project is proprietary and confidential. All rights reserved © AB Apps 2023.

---
