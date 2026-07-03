from django.contrib import admin
from .models import User, Issue, VolunteerTeam

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'role', 'volunteer_hours', 'experience_points')
    list_filter = ('role',)
    search_fields = ('username', 'email')

@admin.register(Issue)
class IssueAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'issue_type', 'status', 'location', 'fund_requested', 'fund_granted', 'urgent')
    list_filter = ('issue_type', 'status', 'urgent')
    search_fields = ('title', 'description', 'location')

@admin.register(VolunteerTeam)
class VolunteerTeamAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'issue', 'members_count', 'requested_fund', 'approved_fund', 'status')
    list_filter = ('status',)
