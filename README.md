# AI Chat App With Saved History

Full-stack AI chat application with persistent history using Mistral AI via HuggingFace.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
# Backend
cd backend && npm install

# Frontend (new terminal)
cd frontend && npm install
```

### 2. Configure Environment

Create `backend/.env`:
```env
HF_MODEL_URL=https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2
HF_API_TOKEN=hf_your_token_here
PORT=3000
```

**Get token:** https://huggingface.co/settings/tokens (free, just sign up)

### 3. Run

```bash
# Terminal 1 - Backend
cd backend && npm start

# Terminal 2 - Frontend
cd frontend && npm run dev
```

Open http://localhost:5173

## 📁 Project Structure

```
├── frontend/          # React + Vite + Tailwind
│   └── src/
│       ├── components/
│       ├── api.js
│       └── App.jsx
├── backend/           # Node.js + Express
│   ├── server.js
│   ├── aiService.js
│   └── storage/
└── README.md
```

## ✨ Features

- 💬 Real-time chat with AI
- 💾 Persistent chat history (JSON file)
- 🤖 Mistral AI via HuggingFace
- 📱 Mobile responsive
- ⚡ Auto-scroll, typing indicator

## 🛠️ Tech Stack

**Frontend:** React, Vite, Tailwind CSS  
**Backend:** Node.js, Express  
**AI:** Mistral-7B-Instruct via HuggingFace API

## 📡 API Endpoints

- `GET /history` - Get chat history
- `POST /message` - Send message, get AI response

## 🚀 Deployment

### Backend (Render)
1. Connect GitHub repo
2. Set root directory: `backend`
3. Add env vars: `HF_MODEL_URL`, `HF_API_TOKEN`, `PORT`
4. Add persistent disk for `storage/` folder

### Frontend (Vercel)
1. Import project
2. Set root directory: `frontend`
3. Add env var: `VITE_API_URL` (your Render backend URL)

## 📝 Notes

- Mistral model requires HuggingFace token (free)
- Chat history stored in `backend/storage/chatHistory.json`
- See `DEPLOYMENT_GUIDE.md` for detailed deployment steps

---

**Built for Fubotics Software & AI Internship Assignment**
