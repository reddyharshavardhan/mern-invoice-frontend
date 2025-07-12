# 🚀 MERN Invoice Generator

![Demo Screenshot](./screenshots/demo.png)

A full-stack Invoice Generator web app using the **MERN stack** (MongoDB, Express, React, Node) with PDF export, user authentication, and modern UI.

[🌐 Live Demo (Frontend on Vercel)](https://mern-invoice-frontend-bi4kmngn1-reddyharshavardhans-projects.vercel.app/) • 

---

## ✨ Features

- 🔐 User registration, login and secure JWT authentication  
- 🛍️ Add multiple products, set price and quantity  
- 🧮 Instant GST calculation  
- 🧾 PDF Invoice generation (using Puppeteer)  
- 🌙 Beautiful dark-mode UI (React + Tailwind CSS)  
- 📧 Email-based password reset  
- 📱 Mobile-responsive design  

---

## 📸 Screenshots

<div align="center">
  <img src="./screenshots/register.png" width="30%" alt="Register Screenshot" />
  <img src="./screenshots/products.png" width="30%" alt="Products Screenshot" />
  <img src="./screenshots/pdfgen.png" width="30%" alt="PDF Generation Screenshot" />
</div>


---

## 🏗️ Tech Stack

- **Frontend:** React + Vite + Tailwind CSS + Redux Toolkit  
- **Backend:** Node.js + Express + TypeScript  
- **Database:** MongoDB (hosted, e.g. Railway Mongo Plugin)  
- **PDFs:** Puppeteer for server-side dynamic PDF creation  
- **Deployment:**
  - Backend: [Railway.app](https://railway.app/)
  - Frontend: [Vercel.com](https://vercel.com/)
- **Email:** Nodemailer + SMTP (Gmail or custom provider)  
- **Docker:** Full Docker support for backend  

---

## 🚀 Getting Started (Local Development)

### 1. Clone the repo:

```bash
git clone https://github.com/YOUR_USERNAME/mern-invoice-backend.git
```

---

### 2. Install backend dependencies:

```bash
cd backend
npm install
```

---

### 3. Setup environment variables:

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-secret
SMTP_HOST=smtp.gmail.com
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-email-password
```

---

### 4. Run backend locally:

```bash
npm run dev
```

---

### 5. Frontend setup:

```bash
cd ../frontend
npm install
npm run dev
```

> Make sure to set the API base URL in `frontend/src/utils/api.ts` to your local or deployed backend URL.

---

## 🌏 Deployment

### 🚀 Backend on Railway:
- Build with the provided `Dockerfile` in `/backend`
- Set environment variables in Railway dashboard

### 🌐 Frontend on Vercel:
- Import your GitHub repo at [vercel.com](https://vercel.com/)
- Optionally set `VITE_API_BASE_URL` in Vercel project settings

---

## 🤝 Acknowledgements

- 🟣 [Render](https://render.com) and [Railway](https://railway.app) for generous free tiers!  
- ⚡ [Vercel](https://vercel.com) for stellar frontend hosting  
- 🎨 [Radix UI](https://www.radix-ui.com/) and [Tailwind CSS](https://tailwindcss.com/) for awesome UI components

---
