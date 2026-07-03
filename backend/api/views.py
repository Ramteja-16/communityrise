from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import User, Issue, VolunteerTeam
from .serializers import UserSerializer, IssueSerializer, VolunteerTeamSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(detail=False, methods=['get'])
    def me(self, request):
        user = User.objects.first()
        if not user:
            user = User.objects.create_user(
                username='samir',
                email='samir@communityrise.org',
                role='WORKER_VOLUNTEER',
                first_name='Samir',
                last_name='Ramteke'
            )
        serializer = self.get_serializer(user)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def switch_role(self, request):
        new_role = request.data.get('role')
        user = User.objects.first()
        if user and new_role:
            user.role = new_role
            user.save()
            return Response({'status': 'role updated', 'role': user.role})
        return Response({'error': 'invalid request'}, status=status.HTTP_400_BAD_REQUEST)


class IssueViewSet(viewsets.ModelViewSet):
    queryset = Issue.objects.all().order_by('-created_at')
    serializer_class = IssueSerializer

    @action(detail=True, methods=['post'])
    def claim(self, request, pk=None):
        issue = self.get_object()
        user_id = request.data.get('userId', 'u-active-user')
        user_name = request.data.get('userName', 'Samir Ramteke')

        if issue.issue_type == 'PAID_GIG':
            applicants = issue.applicants or []
            if not any(a.get('id') == user_id for a in applicants):
                applicants.append({
                    'id': user_id,
                    'name': user_name,
                    'role': 'Developer',
                    'status': 'APPLIED'
                })
                issue.applicants = applicants
                issue.save()
        else:
            volunteers = issue.volunteers_assigned or []
            if user_id not in volunteers:
                volunteers.append(user_id)
                issue.volunteers_assigned = volunteers
                if len(volunteers) >= issue.volunteers_needed:
                    issue.status = 'IN_PROGRESS'
                issue.save()

        return Response(self.get_serializer(issue).data)

    @action(detail=True, methods=['post'])
    def approve_funding(self, request, pk=None):
        issue = self.get_object()
        fund_amount = request.data.get('fundAmount', issue.fund_requested or 1500)
        official_notes = request.data.get('govtNotes', '')

        issue.status = 'FUNDED'
        issue.fund_granted = fund_amount
        issue.govt_notes = official_notes
        issue.save()

        # Also update team status if team exists
        if issue.team_id:
            try:
                team = VolunteerTeam.objects.get(id=issue.team_id)
                team.status = 'APPROVED'
                team.approved_fund = fund_amount
                team.save()
            except VolunteerTeam.DoesNotExist:
                pass

        return Response(self.get_serializer(issue).data)

    @action(detail=True, methods=['post'])
    def update_status(self, request, pk=None):
        issue = self.get_object()
        new_status = request.data.get('status')
        if new_status:
            issue.status = new_status
            issue.save()
            return Response(self.get_serializer(issue).data)
        return Response({'error': 'status required'}, status=status.HTTP_400_BAD_REQUEST)


class VolunteerTeamViewSet(viewsets.ModelViewSet):
    queryset = VolunteerTeam.objects.all().order_by('-created_at')
    serializer_class = VolunteerTeamSerializer

    def create(self, request, *args, **kwargs):
        issue_id = request.data.get('issueId')
        try:
            issue = Issue.objects.get(id=issue_id)
        except Issue.DoesNotExist:
            return Response({'error': 'Issue not found'}, status=status.HTTP_404_NOT_FOUND)

        team = VolunteerTeam.objects.create(
            issue=issue,
            name=request.data.get('teamName', 'Civic Action Team'),
            lead_name=request.data.get('leadName', 'Samir Ramteke'),
            members_count=request.data.get('membersCount', 4),
            requested_fund=request.data.get('fundingRequest', issue.fund_requested or 1000),
            description=request.data.get('description', '')
        )

        issue.status = 'TEAM_FORMED'
        issue.team_id = str(team.id)
        issue.fund_requested = team.requested_fund
        issue.save()

        serializer = self.get_serializer(team)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
