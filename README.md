# 🚀 Task Master Pro

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![MERN Stack](https://img.shields.io/badge/MERN-Stack-green)
![Status](https://img.shields.io/badge/Status-Deployed-brightgreen)

**Task Master Pro** is a robust, full-stack task management application designed to boost productivity. Built with the **MERN Stack** (MongoDB, Express, React, Node.js) and **TypeScript**, it features secure authentication, real-time updates, and a beautiful, responsive UI.

---

## 🌐 Live Demo

- **Frontend (Vercel):** https://task-master-pro-lime.vercel.app  
- **Backend (Render):** https://task-master-api-u5xy.onrender.com  

---

## ✨ Key Features

- 🔐 Secure Authentication (JWT)
- 📊 Interactive Dashboard
- ✅ Task CRUD (Create, Read, Update, Delete)
- 🏷️ Task Categories
- ⚡ Real-time Updates
- 🎨 Responsive Tailwind UI
- ⚙️ Profile & Avatar Settings

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- TypeScript
- Tailwind CSS
- Axios
- Recharts

### Backend
- Node.js
- Express.js
- MongoDB
- JWT
- Bcrypt.js

---

## 📸 Screenshots

| Login Page | Dashboard |
|-----------|-----------|
| ![Login](./assets/login-preview.png) | ![Dashboard](./assets/dashboard-preview.png) |

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/3ayomidepeter/Task-Master-Pro.git
cd Task-Master-Pro
```

---

### 2️⃣ Backend Setup
```bash
cd server
npm install
```

Create a `.env` file inside **server**:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start backend:
```bash
npm run dev
```

---

### 3️⃣ Frontend Setup
```bash
cd client
npm install
npm run dev
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login user |
| PUT | `/api/auth/profile` | Update profile |
| GET | `/api/tasks` | Get tasks |
| POST | `/api/tasks` | Create task |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |

---

## 📄 License

MIT License
