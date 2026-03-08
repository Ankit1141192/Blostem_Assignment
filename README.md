# Task Manager

Simple task app built with React and Express. Made to learn about AI code generation with Copilot.

## Setup

### Backend
```bash
cd backend
npm install
npm start
```
Runs on `http://localhost:5000`

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Runs on `http://localhost:5173`

## What It Does

- Add/delete tasks
- Mark as complete/incomplete
- Filter by status (all, active, completed)
- Priority levels (low, medium, high)

## Stack

- Frontend: React + Vite
- Backend: Node.js + Express
- Storage: In-memory (resets on restart)

## API Endpoints

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create task
- `PATCH /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## Notes

- Copilot generated ~80% of the code
- Had to fix: race condition, null checks, console logs, XSS sanitization
- See `code-review.md` for bugs found
- See `reflection.md` for full thoughts on AI coding

---
Made March 2026