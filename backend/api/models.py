from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    ROLE_CHOICES = (
        ('CITIZEN', 'Citizen Poster'),
        ('WORKER_VOLUNTEER', 'Worker / Volunteer'),
        ('GOVT_OFFICIAL', 'Government Official'),
        ('ADMIN_DEV', 'Admin Developer'),
    )
    role = models.CharField(max_length=30, choices=ROLE_CHOICES, default='WORKER_VOLUNTEER')
    skills = models.JSONField(default=list, blank=True)
    volunteer_hours = models.IntegerField(default=28)
    experience_points = models.IntegerField(default=340)
    completed_tasks = models.IntegerField(default=5)
    badges = models.JSONField(default=list, blank=True)

    def __str__(self):
        return f"{self.username} ({self.role})"


class Issue(models.Model):
    TYPE_CHOICES = (
        ('PAID_GIG', 'Paid Gig'),
        ('VOLUNTEER', 'Volunteer Service'),
        ('CIVIC_GOVT', 'Government Civic Issue'),
    )
    STATUS_CHOICES = (
        ('OPEN', 'Open'),
        ('CLAIMED', 'Claimed'),
        ('IN_PROGRESS', 'In Progress'),
        ('TEAM_FORMED', 'Team Formed'),
        ('FUNDED', 'Govt Funded'),
        ('RESOLVED', 'Resolved'),
    )

    title = models.CharField(max_length=255)
    description = models.TextField()
    issue_type = models.CharField(max_length=30, choices=TYPE_CHOICES, default='CIVIC_GOVT')
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='OPEN')
    location = models.CharField(max_length=255, default='Central District')
    posted_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posted_issues', null=True, blank=True)
    posted_by_name = models.CharField(max_length=255, default='Citizen Reporter')
    
    urgent = models.BooleanField(default=False)
    budget = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    fund_requested = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    fund_granted = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    experience_hours = models.IntegerField(null=True, blank=True)
    
    required_skills = models.JSONField(default=list, blank=True)
    volunteers_needed = models.IntegerField(default=4)
    volunteers_assigned = models.JSONField(default=list, blank=True)
    applicants = models.JSONField(default=list, blank=True)
    
    team_id = models.CharField(max_length=100, null=True, blank=True)
    govt_notes = models.TextField(blank=True, default='')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} [{self.issue_type}]"


class VolunteerTeam(models.Model):
    STATUS_CHOICES = (
        ('PENDING_GOVT_APPROVAL', 'Pending Govt Approval'),
        ('APPROVED', 'Approved'),
        ('REJECTED', 'Rejected'),
    )

    issue = models.ForeignKey(Issue, on_delete=models.CASCADE, related_name='volunteer_teams')
    name = models.CharField(max_length=255)
    lead_name = models.CharField(max_length=255, default='Team Lead')
    lead = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    members_count = models.IntegerField(default=4)
    requested_fund = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    approved_fund = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='PENDING_GOVT_APPROVAL')
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} (Issue: {self.issue.id})"
