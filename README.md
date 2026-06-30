# AI Mock Interview Platform

A full-stack MERN app that generates role-specific technical interview questions using AI, collects answers, and gives instant structured feedback.

**Live Demo:** _coming soon_

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
├── client/   # React frontend
└── server/   # Express backend
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
cd server
npm install
```
Create `.env`:
```
PORT=3000
MONGO_URI=your_mongodb_uri
ACCESS_TOKEN_SECRET=your_secret
REFRESH_TOKEN_SECRET=your_secret
GROQ_API_KEY=your_groq_key
```
```bash
npm run dev
```

**Frontend**
```bash
cd client
npm install
npm run dev
```

## Author
**Achyut** — [GitHub](https://github.com/achyutranaut)