# Akshaya Y — Portfolio Website

A production-ready MERN stack portfolio. Clean architecture, admin dashboard, contact system, and resume tracking — built to impress recruiters.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React (Vite), Tailwind CSS, Framer Motion |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| Email | Nodemailer (Gmail) |
| Auth | JWT |
| Deploy | Vercel (frontend) + Render (backend) |

---

## Project Structure

```
portfolio/
├── client/                   # React frontend
│   ├── src/
│   │   ├── animations/       # Framer Motion variants
│   │   ├── components/       # Navbar, Footer, LoadingScreen
│   │   ├── context/          # ThemeContext (dark/light)
│   │   ├── pages/            # Home, AdminDashboard
│   │   ├── sections/         # Hero, About, Skills, Projects, Experience, FunZone, Contact
│   │   └── services/         # Axios API layer
│   └── vercel.json
│
└── server/                   # Express backend
    ├── config/               # MongoDB connection
    ├── controllers/          # Business logic
    ├── middleware/           # Auth, error handler
    ├── models/               # Mongoose schemas
    ├── routes/               # API route definitions
    ├── uploads/              # Resume PDF (gitignored)
    └── utils/                # Email helper
```

---

## Local Development Setup

### 1. Clone the repo
```bash
git clone https://github.com/akshaya-y/portfolio.git
cd portfolio
```

### 2. Set up the backend

```bash
cd server
npm install
cp .env.example .env
# Fill in all values in .env
```

Add your resume:
```bash
# Place your resume PDF in:
server/uploads/resume.pdf
```

Start the server:
```bash
npm run dev   # http://localhost:5000
```

### 3. Set up the frontend

```bash
cd client
npm install
```

Create `.env.local`:
```
VITE_API_URL=http://localhost:5000/api
```

Start the dev server:
```bash
npm run dev   # http://localhost:5173
```

---

## Environment Variables

### Server (.env)

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Strong random string for signing JWT |
| `ADMIN_USERNAME` | Admin login username |
| `ADMIN_PASSWORD` | Admin login password |
| `EMAIL_USER` | Gmail address for sending emails |
| `EMAIL_PASS` | Gmail App Password (not your Gmail password) |
| `EMAIL_TO` | Your email to receive contact messages |
| `CLIENT_URL` | Frontend URL for CORS |

**How to get Gmail App Password:**
1. Enable 2FA on your Google account
2. Go to Google Account → Security → App Passwords
3. Create a new app password and paste it as `EMAIL_PASS`

### Client (.env.local)

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend API base URL |

---

## Deployment

### Frontend → Vercel

1. Push `client/` to GitHub
2. Import repo on [vercel.com](https://vercel.com)
3. Framework: Vite
4. Add env variable: `VITE_API_URL=https://your-backend.onrender.com/api`

### Backend → Render

1. Push `server/` to GitHub
2. Create a new **Web Service** on [render.com](https://render.com)
3. Build command: `npm install`
4. Start command: `npm start`
5. Add all env variables from `.env.example`

### Database → MongoDB Atlas

1. Create free cluster at [cloud.mongodb.com](https://cloud.mongodb.com)
2. Create a database user
3. Whitelist all IPs (0.0.0.0/0) for Render compatibility
4. Copy the connection string to `MONGODB_URI`

---

## Admin Dashboard

Visit `/admin` to access the admin panel.

Features:
- View all contact form messages
- Mark messages as read/unread
- Delete messages
- Resume download statistics

Login with `ADMIN_USERNAME` and `ADMIN_PASSWORD` from your `.env`.

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/contact` | No | Submit contact form |
| GET | `/api/resume/download` | No | Download resume PDF |
| GET | `/api/resume/count` | No | Get download count |
| POST | `/api/admin/login` | No | Admin login |
| GET | `/api/admin/messages` | JWT | Get all messages |
| DELETE | `/api/admin/messages/:id` | JWT | Delete message |
| PATCH | `/api/admin/messages/:id/read` | JWT | Mark as read |
| GET | `/api/admin/stats` | JWT | Dashboard stats |

---

## Customization

1. **Your photo:** Replace the placeholder in `Hero.jsx` with an `<img>` tag pointing to `/src/assets/photo.jpg`
2. **Projects:** Edit the `projects` array in `Projects.jsx`
3. **Skills:** Edit `skillGroups` in `Skills.jsx`
4. **Timeline:** Edit the `timeline` array in `Experience.jsx`
5. **Social links:** Update GitHub, LinkedIn, LeetCode URLs across components
6. **Resume:** Place your PDF at `server/uploads/resume.pdf`

---

## Security Features

- Helmet.js for HTTP security headers
- Rate limiting on contact form (5 req / 15 min) and global (100 req / 15 min)
- express-mongo-sanitize to prevent NoSQL injection
- JWT authentication for admin routes
- Input validation with express-validator
- CORS restricted to frontend origin

---

Built with ❤️ by Akshaya Y | Aspiring SDE