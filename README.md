# Community Rise (React + Django Ready)

**Community Rise** is a community-driven civic action and skill exchange web application built to empower skilled individuals, help non-profits, and enable citizen volunteer teams to resolve major public infrastructure emergencies (e.g. electric pole collapse, street hazards, canal blockages) backed by direct **Government Funding Grants**.

---

## 🎨 Design Philosophy
- **Theme**: Ultra-Clean Minimalist **Black (`#09090b`), White (`#ffffff`), and Emerald Green (`#10b981`)**.
- **No Gradients**: 100% sharp high-contrast aesthetics with crisp typography (`Inter` & `JetBrains Mono`).
- **Performance**: High frame rate, smooth micro-transitions via Framer Motion, ultra-fast loading times.

---

## 👥 4 User Roles & Dashboards

1. **Citizen / Poster Dashboard** (`CITIZEN`):
   - Post freelance jobs (Paid contracts) or civic issue reports.
   - Review hired applicants, assign tasks, mark completion.

2. **Worker / Volunteer Dashboard** (`WORKER_VOLUNTEER`):
   - Browse & claim paid contracts or volunteer tasks.
   - Form / join volunteer teams for large civic issues.
   - Track verified volunteer hours, experience badges, and downloadable portfolio credentials.

3. **Government Official Portal** (`GOVT_OFFICIAL`):
   - Review civic emergency reports (e.g. Pole collapse, road hazards).
   - Authorize & disburse official municipal funding grants to volunteer teams.
   - Maintain transparent public audit resolution logs.

4. **Admin / Developer Panel** (`ADMIN_DEV`):
   - Manage Django REST Framework base API endpoint settings (`http://localhost:8000/api/`).
   - Monitor real-time system metrics, user roles, and issue category controls.

---

## 🚀 Getting Started

### 1. Run Frontend (React + Vite)
```bash
npm install
npm run dev
```
Open `http://localhost:3000` in your browser.

---

## 🐍 Django REST API Integration (Backend Schema Ready)

When you are ready to spin up the Django backend, use the following `models.py` schema:

```python
# community_rise/models.py
from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    ROLE_CHOICES = (
        ('CITIZEN', 'Citizen Poster'),
        ('WORKER_VOLUNTEER', 'Worker / Volunteer'),
        ('GOVT_OFFICIAL', 'Government Official'),
        ('ADMIN_DEV', 'Admin Developer'),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='WORKER_VOLUNTEER')
    volunteer_hours = models.IntegerField(default=0)
    experience_points = models.IntegerField(default=0)

class Issue(models.Model):
    TYPE_CHOICES = (
        ('PAID_GIG', 'Paid Gig'),
        ('VOLUNTEER', 'Volunteer Service'),
        ('CIVIC_GOVT', 'Government Civic Issue'),
    )
    STATUS_CHOICES = (
        ('OPEN', 'Open'),
        ('IN_PROGRESS', 'In Progress'),
        ('TEAM_FORMED', 'Team Formed'),
        ('FUNDED', 'Govt Funded'),
        ('RESOLVED', 'Resolved'),
    )
    title = models.CharField(max_length=255)
    description = models.TextField()
    issue_type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='OPEN')
    location = models.CharField(max_length=255)
    posted_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posted_issues')
    urgent = models.BooleanField(default=False)
    budget = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    fund_requested = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    fund_granted = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

class VolunteerTeam(models.Model):
    issue = models.ForeignKey(Issue, on_delete=models.CASCADE, related_name='volunteer_teams')
    name = models.CharField(max_length=255)
    lead = models.ForeignKey(User, on_delete=models.CASCADE)
    members_count = models.IntegerField(default=1)
    requested_fund = models.DecimalField(max_digits=10, decimal_places=2)
    approved_fund = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    is_approved = models.BooleanField(default=False)
```
