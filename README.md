# Community Rise 🏙️

**Community Rise** is a full-stack civic ecosystem and skill exchange platform built to connect skilled individuals with paid work, empower volunteers to build verified work experience, and enable citizen volunteer teams to tackle major public infrastructure emergencies (e.g. electric pole collapse, street hazards, canal blockages) backed by direct **Government Funding Grants**.

---

## 🔗 Repository
- **GitHub Repository**: [github.com/Ramteja-16/communityrise](https://github.com/Ramteja-16/communityrise)

---

## 🎨 Design Philosophy
- **Theme**: Ultra-Clean Minimalist **Black (`#09090b`), White (`#ffffff`), and Emerald Green (`#10b981`)**.
- **Zero Gradients**: 100% sharp high-contrast aesthetics with modern typography (`Inter` & `JetBrains Mono`).
- **Performance**: High frame rate, smooth micro-transitions via Framer Motion, ultra-fast loading times.

---

## 👥 4 User Roles & Dashboards

1. **Worker / Volunteer Dashboard** (`WORKER_VOLUNTEER`):
   - Browse & claim paid contracts or volunteer tasks.
   - Form / join volunteer teams for large civic issues.
   - Track verified volunteer hours, experience badges, and downloadable portfolio credentials.

2. **Government Official Portal** (`GOVT_OFFICIAL`):
   - Review civic emergency reports (e.g. Electric pole collapse, road hazards).
   - Authorize & disburse official municipal funding grants to volunteer teams.
   - Maintain transparent public audit resolution logs.

3. **Citizen / Poster Dashboard** (`CITIZEN`):
   - Post freelance jobs (Paid contracts) or civic issue reports.
   - Review hired applicants, assign tasks, mark completion.

4. **Admin / Developer Panel** (`ADMIN_DEV`):
   - Manage Django REST Framework base API endpoint settings (`http://localhost:8000/api/`).
   - Monitor real-time system metrics, user roles, and issue category controls.

---

## 📁 Monorepo Folder Structure

```
communityrise/
├── frontend/                   # React + Vite + Tailwind CSS Frontend
│   ├── src/
│   │   ├── components/         # Modals, Navbar, Feed, Dashboards
│   │   ├── services/           # REST API Client (api.js) & Store (store.js)
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── backend/                    # Django + Django REST Framework Backend
│   ├── manage.py
│   ├── db.sqlite3              # Relational SQLite Database
│   ├── requirements.txt        # Gunicorn, DRF, Cors-headers, Whitenoise
│   ├── api/                    # Models, Serializers, Views, Admin, Commands
│   └── community_rise_backend/ # Settings & URL Routing
└── README.md                   # Project Overview & Deployment Guide
```

---

## 💻 Local Setup & Running Locally

### 1. Start Django REST Backend
```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_data
python manage.py runserver 8000
```
*Backend runs at `http://localhost:8000/api/` and Admin at `http://localhost:8000/admin/`.*

### 2. Start React Frontend
```bash
cd frontend
npm install
npm run dev
```
*Frontend runs at `http://localhost:3000/`.*

---

## 🌐 Production Deployment Guide

### STEP 1: Deploy Backend to Render (Free)
> Deploy backend first to obtain your live API URL.

1. Go to [dashboard.render.com](https://dashboard.render.com) → **New +** → **Web Service**.
2. Connect repository **`Ramteja-16/communityrise`**.
3. Set fields:
   - **Root Directory**: `backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt && python manage.py migrate && python manage.py seed_data`
   - **Start Command**: `gunicorn community_rise_backend.wsgi:application`
4. Add Environment Variables:
   - `SECRET_KEY`: `your-random-secure-secret-key`
   - `ALLOWED_HOSTS`: `*`
5. Deploy and copy your backend URL (e.g. `https://community-rise-backend.onrender.com`).

---

### STEP 2: Deploy Frontend to Vercel (Free)

1. Go to [vercel.com/new](https://vercel.com/new) → Import **`Ramteja-16/communityrise`**.
2. Set **Root Directory** to `frontend`.
3. Add Environment Variable:
   - **Name**: `VITE_DJANGO_API_URL`
   - **Value**: `https://community-rise-backend.onrender.com/api` *(your Render backend URL)*
4. Click **Deploy**.

---

## 🐍 Django REST API Endpoints Reference

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/issues/` | `GET` | List all issues sorted newest first |
| `/api/issues/` | `POST` | Report / Create a new issue |
| `/api/issues/{id}/claim/` | `POST` | Claim a task or apply for a gig |
| `/api/issues/{id}/approve_funding/` | `POST` | Govt Official grant authorization |
| `/api/teams/` | `GET / POST` | Volunteer execution team management |
| `/api/users/me/` | `GET` | Active user profile details |

---

## 🔑 Admin Credentials
- **Django Admin Portal**: `/admin/`
- **Superuser Username**: `admin`
- **Superuser Password**: `adminpass`
