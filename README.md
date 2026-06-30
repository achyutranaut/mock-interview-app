# AI Mock Interview Platform

A full-stack MERN app that generates role-specific technical interview questions using AI, collects answers, and gives instant structured feedback.

**Live Demo:** https://mock-interview-app-swart.vercel.app

## Features
- JWT auth (access + refresh tokens, HTTP-only cookies)
- AI-generated interview questions based on role
- AI-evaluated feedback — score, strengths, gaps, model answer
- Protected routes for the interview flow
- Clean Tailwind UI

## Tech Stack
**Frontend:** React (Vite), React Router, Axios, Tailwind CSS
**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcrypt
**AI:** Groq API (`llama-3.3-70b-versatile`)

## How It Works
1. User registers/logs in
2. Enters a target role → AI generates 5 questions
3. User answers each question
4. AI evaluates every answer and returns a feedback report

## Project Structure
```
mock-interview-app/
├── frontend/   # React frontend
└── backend/    # Express backend
```

## API Endpoints
| Method | Endpoint | Protected |
|---|---|---|
| POST | `/api/register` | No |
| POST | `/api/auth` | No |
| GET | `/api/refresh` | No |
| GET | `/api/logout` | No |
| POST | `/api/interview/generate` | Yes |
| POST | `/api/interview/feedback` | Yes |

## Setup

**Backend**
```bash
cd backend
npm install
```
Create `.env`:
```
PORT=3000
MONGODB_URI=your_mongodb_uri
ACCESS_TOKEN_SECRET=your_secret
REFRESH_TOKEN_SECRET=your_secret
GROQ_API_KEY=your_groq_key
```
```bash
npm run dev
```

**Frontend**
Create `.env` inside `frontend`:
```
VITE_API_URL=http://localhost:3000
```
```bash
cd frontend
npm install
npm run dev
```

## Author
**Achyut** — [GitHub](https://github.com/achyutranaut)