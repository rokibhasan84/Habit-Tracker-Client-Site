

# 🧠 Habit Tracking Application  
A full-stack MERN Habit Tracking Web App with image upload, habit details page, streak system, progress tracking, public habits, filtering, searching, updating, and real-time UI updates.

---

## 🚀 Live Links

### 🔹 Client (Frontend – Netlify)
👉 

### 🔹 Server (Backend – Vercel)
👉 

---

# 📌 Project Overview

This Habit Tracking Web Application allows users to:

- Create daily habits  
- Upload images via URL or device  
- Mark habits as completed (once per day)  
- Add completed history & streak  
- Track last 30-day progress automatically  
- View and filter public habits  
- Update and delete their own habits  
- Search by title  
- Secure API (only creators can modify data)  
- Fully responsive UI  
- Loading states, animations, and smooth UX  

This app fulfills *all assignment requirements* listed in the project document.

---

# ⭐ Core Features (Assignment Requirements Fulfilled)

## ✔ 1. Add New Habit
Users can add habits with:
- Title  
- Description  
- Category  
- Reminder time  
- Image (Upload or Image URL)  
- Auto-assigned: Created date, user info  
- Public/Private support  

Images are uploaded via *ImgBB API*.

---

## ✔ 2. My Habits Page
Users can see only their own habits:
- Shown in cards layout  
- Shows image, title, description, category  
- Shows created date  
- Shows updated date  
- Delete habit  
- Update habit  
- Search habits  
- Filter by category  
- Pagination ready  

---

## ✔ 3. Public Habits Page
Displays habits shared by users.  
Includes:
- Latest 6 habits  
- View Details button  
- Masonry/Card layout  
- Fully responsive design  

---

## ✔ 4. Habit Details Page (Most Important)
Each habit has a dedicated details page including:

### 🟦 Habit Content
- Image  
- Title  
- Category  
- Description  
- Creator Info (Name, Email)

### 🟩 Progress Tracking (Assignment Requirement)
- Auto progress (based on completionDates array)
- Shows *% progress* of last 30 days
- Animated progress bar
- Updated instantly after marking complete  

### 🟧 Streak System  
- Calculates continuous streak  
- Shows badge:
  - 🥇 Gold (15+ days)
  - 🥈 Silver (7+ days)
  - 🥉 Bronze (3+ days)

### 🟨 Daily Completion
- “Mark as Complete” button  
- Only the creator can click  
- Only once per day allowed  
- Prevent duplicate entries  
- Updates DB & UI instantly and without reload  

---

## ✔ 5. Complete / Undo Logic
- When user marks complete → Push today’s date to completion array  
- When undoing → Remove today's record  
- Status toggles between pending ↔ completed  
- UI updates instantly  

---

## ✔ 6. Backend API (Node + Express + MongoDB)
### Main Routes:
- POST /habits – Create new habit  
- GET /habits – Public habits  
- GET /habits/:email – User habits  
- GET /habits/details/:id – Habit details  
- PUT /habits/:id – Update habit  
- DELETE /habits/:id – Delete habit  
- PUT /habits/complete/:id – Mark as completed  
- PUT /habits/undo/:id – Undo completion  

Backend fully supports:
- Validation  
- Error handling  
- Duplicate prevention  
- Daily logic  
- Streak calculation  

---

# 🔧 Technologies Used

## 🌐 Frontend
- React.js  
- React Router  
- Axios  
- TailwindCSS / DaisyUI  
- Framer Motion (Animations)  
- React Hot Toast  
- SweetAlert2  
- ImgBB API  

## 🛠 Backend
- Node.js  
- Express.js  
- MongoDB  
- dotenv  
- CORS  

## ☁ Hosting
- *Netlify* – Client  
- *Vercel/Render* – Server  
- *MongoDB Atlas* – Database  















# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
