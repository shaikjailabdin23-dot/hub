# Hub Learning Platform 🎓

A full-stack learning and student tracking platform featuring technical curricula, interactive quizzes, student dashboards, and project hubs.

---

## ⚡ Quick Start

### Option A: Run Both Together (Recommended)
From the project root:
```bash
npm run dev
```
> Runs both the backend API and frontend Vite server concurrently in a single terminal.

---

### Option B: Run Individually in Separate Terminals

#### 1. Start the Backend Server (Port 5000)
```bash
npm run dev:backend
# or: cd backend && npm run dev
```
> The backend runs on `http://localhost:5000` with automated in-memory MongoDB and auto-seeding.

#### 2. Start the Frontend Dev Server (Port 5173 / 5174)
```bash
npm run dev:frontend
# or: cd frontend && npm run dev
```
> Access the application in your browser at `http://localhost:5173` (or `http://localhost:5174` if 5173 is occupied).

---

## 🛠️ Architecture & Port Mapping

| Service | Directory | Port | Description |
|---|---|---|---|
| **Frontend** | `/frontend` | `5173` / `5174` | React + Vite client with Axios proxying `/api` requests to backend |
| **Backend** | `/backend` | `5000` | Express REST API + JWT authentication + MongoDB data storage |

---

## 🔍 Common Issues & Solutions

### `[vite] http proxy error: /api/auth/register (ECONNREFUSED 127.0.0.1:5000)`
- **Why this happens:** Vite is trying to proxy `/api/auth/register` to `http://127.0.0.1:5000`, but the Node backend server is not running.
- **Solution:** Open a terminal in `/backend` and execute `npm run dev` or `npm start`.
