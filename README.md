# TTFCHAT — White Chat UI (Vite + React)

This is a minimal Chat UI (white, modern) frontend + a Vercel-compatible serverless API route at `/api/chat.js`
that proxies requests to the OpenAI API.  

## Setup (local)

1. Copy `.env.example` to `.env` and add your OpenAI API key.
2. Install dependencies:
   ```
   npm install
   ```
3. Run dev server:
   ```
   npm run dev
   ```
4. The frontend runs at http://localhost:5173 and the serverless function is available under `/api/chat` when deployed on Vercel.

## Deploying to Vercel

- Push this repository to GitHub.
- On Vercel, import the project and choose the **Vite** framework preset.
- Add an Environment Variable on Vercel named `OPENAI_API_KEY` with your OpenAI secret key.
- Deploy — Vercel will run `npm run build` and host the site. Serverless function at `api/chat` will use the environment variable.

