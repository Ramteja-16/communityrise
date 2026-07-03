# Community Rise — Full-Stack Technical Interview Guide (Q&A)

This document contains a comprehensive collection of technical, architectural, system design, and coding interview questions & answers based on the **Community Rise** web application built with **React (Vite), Tailwind CSS, Django, and Django REST Framework (DRF)**.

---

## Table of Contents
1. [Project Overview & Ecosystem Questions](#1-project-overview--ecosystem-questions)
2. [Frontend (React & Vite) Technical Questions](#2-frontend-react--vite-technical-questions)
3. [Backend (Django & DRF) Technical Questions](#3-backend-django--drf-technical-questions)
4. [Full-Stack Integration & API Design](#4-full-stack-integration--api-design)
5. [System Design & Production Deployment](#5-system-design--production-deployment)
6. [Problem Solving & Behavioral Questions](#6-problem-solving--behavioral-questions)

---

## 1. Project Overview & Ecosystem Questions

### Q1: What is Community Rise and what core problem does it solve?
**Answer:**  
Community Rise is a community-driven civic action and freelance ecosystem that bridges three major urban problems:
1. **Unemployed/Skilled Individuals**: Connects skilled people with paid freelance contracts (`PAID_GIG`).
2. **Volunteers Seeking Experience**: Allows people to offer free/volunteer services to community organizations to build a verified portfolio, earn badges, and log volunteer hours (`VOLUNTEER`).
3. **Complex Civic Emergencies**: Large-scale city hazards (like an electric pole collapse, water pipe burst, or canal blockage) cannot be fixed by a single individual. Citizens form **Volunteer Teams**, report the issue, and **Government Officials** authorize official municipal funding grants (`CIVIC_GOVT`) directly to the volunteer team.

### Q2: Why are there 4 distinct user roles and how do their permissions differ?
**Answer:**  
The application defines 4 user roles using a unified state engine:
- **`WORKER_VOLUNTEER`**: Can browse feed, claim paid gigs, sign up for volunteer tasks, form/join volunteer teams, and view earned badges/hours.
- **`GOVT_OFFICIAL`**: Accesses the Government Portal, reviews emergency civic reports, authorizes municipal funding grants, and approves volunteer team budgets.
- **`CITIZEN`**: Posts new freelance jobs or civic issue reports, reviews applicants, and approves task completions.
- **`ADMIN_DEV`**: Accesses developer analytics, tests REST endpoints (`http://localhost:8000/api/`), configures API URLs, and monitors system health.

---

## 2. Frontend (React & Vite) Technical Questions

### Q3: Why did you choose Vite over Create React App (CRA)?
**Answer:**  
Vite uses native ES modules (ESM) in the browser during development and `esbuild` for pre-bundling dependencies. This makes cold server startup instant and Hot Module Replacement (HMR) extremely fast regardless of application size, whereas CRA relies on Webpack which re-bundles the entire application on startup.

### Q4: How is the state management architecture designed in the frontend?
**Answer:**  
The frontend uses a custom reactive Pub/Sub state engine (`StoreService` in `src/services/store.js`) paired with `LocalStorage` and REST API synchronization.
- Components subscribe to `store.subscribe(callback)`.
- When any action (posting an issue, claiming a task, approving funds) occurs, `store.notify()` is triggered, causing subscribing React components to re-render with fresh data without requiring heavy external state libraries like Redux.

### Q5: How did you implement the "Zero-Gradient Minimalist Theme"?
**Answer:**  
Using Tailwind CSS custom configuration (`tailwind.config.js`):
- Colors are restricted to pure black (`#09090b`), stark white (`#ffffff`), zinc grays (`#18181b`, `#27272a`), and emerald green (`#10b981`).
- All linear and radial gradients are explicitly omitted. High contrast borders, crisp typography (`Inter` and `JetBrains Mono`), and subtle hover micro-interactions (using Framer Motion) create a sleek, modern UI.

---

## 3. Backend (Django & DRF) Technical Questions

### Q6: Why extend `AbstractUser` instead of using Django's default User model?
**Answer:**  
Extending `AbstractUser` allows adding custom application-specific fields directly to the user model (such as `role`, `skills`, `volunteer_hours`, `experience_points`, and `badges`) while preserving Django's built-in authentication, password hashing, superuser privileges, and admin compatibility.

### Q7: What is the difference between `ModelSerializer` and standard `Serializer` in DRF?
**Answer:**  
`ModelSerializer` automatically generates a set of fields based on the Django model, creates default validators, and implements default `.create()` and `.update()` methods. In our `IssueSerializer`, we also added field mapping to seamlessly convert between Python `snake_case` (e.g. `fund_requested`) and JavaScript `camelCase` (e.g. `fundRequested`).

### Q8: How are custom API endpoints implemented in DRF ViewSets?
**Answer:**  
Using the `@action` decorator inside `ModelViewSet` in `backend/api/views.py`:
```python
@action(detail=True, methods=['post'])
def approve_funding(self, request, pk=None):
    issue = self.get_object()
    fund_amount = request.data.get('fundAmount')
    issue.status = 'FUNDED'
    issue.fund_granted = fund_amount
    issue.save()
    return Response(self.get_serializer(issue).data)
```
This automatically routes `POST /api/issues/{id}/approve_funding/` without writing manual URL patterns.

---

## 4. Full-Stack Integration & API Design

### Q9: How is CORS handled between the React frontend and Django backend?
**Answer:**  
Using `django-cors-headers` middleware. In `settings.py`:
- `corsheaders.middleware.CorsMiddleware` is placed at the top of `MIDDLEWARE`.
- `CORS_ALLOW_ALL_ORIGINS = True` (in dev) or `CORS_ALLOWED_ORIGINS` specifies allowed frontend domains (e.g., `http://localhost:3000` or `https://community-rise.vercel.app`).

### Q10: How does the application handle backend offline scenarios (Fault Tolerance)?
**Answer:**  
In `src/services/api.js`, all API calls are wrapped in `async/await` try-catch blocks. If the Django backend is offline or unreachable, the store gracefully catches the network exception and falls back to LocalStorage persistence, ensuring the user experience never crashes.

---

## 5. System Design & Production Deployment

### Q11: How is the Monorepo folder structure organized?
**Answer:**  
```
communityrise/
├── frontend/     # React + Vite + Tailwind CSS
└── backend/      # Django + Django REST Framework + SQLite/PostgreSQL
```
Separating `frontend/` and `backend/` allows independent deployment pipeline builds (e.g. Vercel for React, Render for Django) while keeping version control unified in a single GitHub repository.

### Q12: How would you scale Community Rise to handle 1,000,000 active citizens?
**Answer:**  
1. **Database**: Migrate from SQLite to **PostgreSQL** with read-replicas and database indexing on high-frequency query fields (`status`, `issue_type`, `location`).
2. **Caching**: Integrate **Redis** to cache public issue feeds and live ticker stats.
3. **Asynchronous Tasks**: Use **Celery + Redis** to handle background notifications, email alerts, and PDF certificate generation.
4. **Real-Time Alerts**: Use **Django Channels (WebSockets)** to broadcast live civic emergency updates instantly to online volunteers.

---

## 6. Problem Solving & Behavioral Questions

### Q13: Describe a technical challenge you faced during development and how you solved it.
**Answer:**  
- **Challenge**: Mapping dynamic frontend state expectations with relational Django backend requirements while maintaining instant UI updates.
- **Solution**: Built a dual-layer architecture in `src/services/api.js` and `src/services/store.js`. Serializers in DRF were customized to support both snake_case and camelCase field representations, ensuring zero data loss during REST payload transfers.

### Q14: How did you resolve Git authentication issues during repository deployment?
**Answer:**  
When GitHub rejected standard password authentication for HTTPS operations (error 403), we switched authentication to a **Personal Access Token (PAT)** with repository `write` permissions, configured `.gitignore` to untrack heavy `node_modules` binaries, and pushed the clean monorepo to GitHub.
