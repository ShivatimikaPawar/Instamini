# Instagram Mini Clone

A **mini Instagram-style web app** built with the **MERN stack** (MongoDB, Express, React, Node.js).  
Users can signup/login, follow others, create posts, like, comment, and view a feed of posts.

---

## Features

### Backend
- **User Authentication**: Signup, Login, JWT-based auth, Password hashing  
- **Follow System**: Follow / Unfollow users with proper relationships  
- **Posts**: Create posts (image + caption), Like / Unlike posts, Comment on posts  
- **Feed**: Fetch posts from users the logged-in user follows  

### Frontend
- **Screens**:  
  - Login & Signup: store token securely, redirect on login  
  - Home Feed: list posts with image, caption, likes, comments  
  - Create Post: add new post with image URL + caption  
  - Profile Page: user posts, follower/following count, Follow/Unfollow button  
  - Post Detail: full view, interactive like/comment UI  
- **Technologies**: React + Vite, Axios (`instagramAPI.js`), React Router DOM, state management with hooks, responsive design  

---

## Project Setup

### Backend

1. Navigate to backend:

```bash
cd backend

2. Install dependencies:

npm install

3. Create .env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000

4. Start backend server:

node server.js
Backend runs on http://localhost:5000.

Frontend

1. Navigate to frontend:

cd frontend

2. Install dependencies:

npm install

3. Create .env file:
VITE_API_URL=http://localhost:5000/api

4. Start frontend server: 
npm run dev -- --host
Frontend runs on http://localhost:5173 (or next available port).

License

This is **full and ready-to-use** — just save it as `README.md` in the root of your repo.

