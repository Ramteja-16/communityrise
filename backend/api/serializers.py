from rest_framework import serializers
from .models import User, Issue, VolunteerTeam

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'first_name', 'last_name', 
            'role', 'skills', 'volunteer_hours', 'experience_points', 
            'completed_tasks', 'badges'
        ]


class IssueSerializer(serializers.ModelSerializer):
    # Match frontend camelCase field expectations or provide computed fields
    type = serializers.CharField(source='issue_type', required=False)
    postedBy = serializers.CharField(source='posted_by_name', required=False)
    createdAt = serializers.DateTimeField(source='created_at', read_only=True)
    fundRequested = serializers.DecimalField(source='fund_requested', max_digits=10, decimal_places=2, required=False, allow_null=True)
    fundGranted = serializers.DecimalField(source='fund_granted', max_digits=10, decimal_places=2, required=False, allow_null=True)
    requiredSkills = serializers.JSONField(source='required_skills', required=False)
    volunteersAssigned = serializers.JSONField(source='volunteers_assigned', required=False)
    experienceHours = serializers.IntegerField(source='experience_hours', required=False, allow_null=True)
    govtNotes = serializers.CharField(source='govt_notes', required=False, allow_blank=True)
    teamId = serializers.CharField(source='team_id', required=False, allow_blank=True, allow_null=True)

    class Meta:
        model = Issue
        fields = [
            'id', 'title', 'description', 'issue_type', 'type', 'status', 'location', 
            'posted_by', 'posted_by_name', 'postedBy', 'urgent', 'budget', 
            'fund_requested', 'fundRequested', 'fund_granted', 'fundGranted', 
            'experience_hours', 'experienceHours', 'required_skills', 'requiredSkills', 
            'volunteers_needed', 'volunteers_assigned', 'volunteersAssigned', 
            'applicants', 'team_id', 'teamId', 'govt_notes', 'govtNotes', 'created_at', 'createdAt'
        ]

    def create(self, validated_data):
        # Handle field mappings
        if 'issue_type' not in validated_data and 'type' in self.initial_data:
            validated_data['issue_type'] = self.initial_data['type']
        if 'posted_by_name' not in validated_data and 'postedBy' in self.initial_data:
            validated_data['posted_by_name'] = self.initial_data['postedBy']
        if 'required_skills' not in validated_data and 'requiredSkills' in self.initial_data:
            validated_data['required_skills'] = self.initial_data['requiredSkills']
        if 'fund_requested' not in validated_data and 'fundRequested' in self.initial_data:
            validated_data['fund_requested'] = self.initial_data['fundRequested']
        if 'experience_hours' not in validated_data and 'experienceHours' in self.initial_data:
            validated_data['experience_hours'] = self.initial_data['experienceHours']
            
        return super().create(validated_data)


class VolunteerTeamSerializer(serializers.ModelSerializer):
    issueId = serializers.IntegerField(source='issue_id', read_only=True)
    leadName = serializers.CharField(source='lead_name', required=False)
    membersCount = serializers.IntegerField(source='members_count', required=False)
    requestedFund = serializers.DecimalField(source='requested_fund', max_digits=10, decimal_places=2, required=False)
    approvedFund = serializers.DecimalField(source='approved_fund', max_digits=10, decimal_places=2, required=False)

    class Meta:
        model = VolunteerTeam
        fields = [
            'id', 'issue', 'issueId', 'name', 'lead_name', 'leadName', 
            'members_count', 'membersCount', 'requested_fund', 'requestedFund', 
            'approved_fund', 'approvedFund', 'status', 'description', 'created_at'
        ]
