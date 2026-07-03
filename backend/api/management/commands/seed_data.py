from django.core.management.base import BaseCommand
from api.models import User, Issue, VolunteerTeam

class Command(BaseCommand):
    help = 'Populates the Community Rise database with initial real-world seed data'

    def handle(self, *args, **options):
        self.stdout.write(self.style.NOTICE('Seeding database...'))

        # Create or update default users
        samir, _ = User.objects.get_or_create(
            username='samir',
            defaults={
                'email': 'samir@communityrise.org',
                'first_name': 'Samir',
                'last_name': 'Ramteke',
                'role': 'WORKER_VOLUNTEER',
                'skills': ['React', 'Django', 'Electrical Safety', 'Teamwork'],
                'volunteer_hours': 28,
                'experience_points': 340,
                'badges': ['Civic Hero', 'Verified Contributor', 'Rapid Responder']
            }
        )

        vance, _ = User.objects.get_or_create(
            username='director_vance',
            defaults={
                'email': 'vance@citygov.gov',
                'first_name': 'Director',
                'last_name': 'Vance',
                'role': 'GOVT_OFFICIAL',
                'skills': ['Municipal Grants', 'Civic Safety', 'Disaster Relief']
            }
        )

        sarah, _ = User.objects.get_or_create(
            username='sarah_jenkins',
            defaults={
                'email': 'sarah@community.org',
                'first_name': 'Sarah',
                'last_name': 'Jenkins',
                'role': 'CITIZEN',
                'skills': ['Community Lead', 'Urban Planning']
            }
        )

        # Create Seed Issues
        issues_data = [
            {
                'id': 101,
                'title': 'Electric Pole Collapsed & Exposed Cables on 4th Main Road',
                'description': 'A heavy storm knocked down an electric utility pole near Central Park. Wires are hazardous and blocking traffic. Requires government authority dispatch or funded emergency volunteer safety team.',
                'issue_type': 'CIVIC_GOVT',
                'status': 'OPEN',
                'location': 'Downtown District 4',
                'posted_by': sarah,
                'posted_by_name': 'Citizen Reporter #402',
                'urgent': True,
                'fund_requested': 1200,
                'fund_granted': 0,
                'required_skills': ['Electrical Safety', 'Debris Management', 'Traffic Control'],
                'volunteers_needed': 6
            },
            {
                'id': 102,
                'title': 'React & Django Web Developer Needed for Local Artisan Market',
                'description': 'Our artisan collective needs an experienced developer to set up an inventory catalog and online booking portal. Paid contract with performance bonus.',
                'issue_type': 'PAID_GIG',
                'status': 'OPEN',
                'location': 'West End Hub / Remote',
                'posted_by': sarah,
                'posted_by_name': 'GreenCraft Organics',
                'urgent': False,
                'budget': 650,
                'required_skills': ['React.js', 'Django', 'Tailwind CSS', 'PostgreSQL'],
                'applicants': [{'id': 'samir', 'name': 'Samir Ramteke', 'role': 'Full Stack Dev', 'status': 'PENDING'}]
            },
            {
                'id': 103,
                'title': 'Weekend Youth Coding & Digital Literacy Workshop Tutors',
                'description': 'Seeking passionate volunteers to conduct free weekend classes for underprivileged high school students. Great opportunity to gain verified teaching & mentorship experience.',
                'issue_type': 'VOLUNTEER',
                'status': 'OPEN',
                'location': 'Community Center Library',
                'posted_by': sarah,
                'posted_by_name': 'Youth Empower Foundation',
                'urgent': False,
                'experience_hours': 15,
                'required_skills': ['Python Basics', 'Mentorship', 'Public Speaking'],
                'volunteers_needed': 4,
                'volunteers_assigned': ['samir']
            },
            {
                'id': 104,
                'title': 'Municipal Canal Debris Cleanup & Safety Rail Installation',
                'description': 'Major accumulated plastics and blockages in the north canal causing urban flooding. Volunteer team organized by Civic Alliance.',
                'issue_type': 'CIVIC_GOVT',
                'status': 'FUNDED',
                'location': 'North Ward Canal',
                'posted_by': sarah,
                'posted_by_name': 'Civic Alliance',
                'urgent': True,
                'fund_requested': 2500,
                'fund_granted': 2500,
                'required_skills': ['Civic Engineering', 'Heavy Cleanup', 'Team Lead'],
                'volunteers_needed': 12,
                'volunteers_assigned': ['samir'],
                'govt_notes': 'Approved by City Disaster Mgmt Board. Funds disbursed to Volunteer Lead.'
            }
        ]

        for item in issues_data:
            Issue.objects.update_or_create(
                id=item['id'],
                defaults=item
            )

        # Seed Team
        issue_104 = Issue.objects.get(id=104)
        VolunteerTeam.objects.update_or_create(
            id=301,
            defaults={
                'issue': issue_104,
                'name': 'North Ward Emergency Cleanup Crew',
                'lead_name': 'Samir Ramteke',
                'lead': samir,
                'members_count': 8,
                'requested_fund': 2500,
                'approved_fund': 2500,
                'status': 'APPROVED',
                'description': 'Organized group of 8 certified volunteers clearing canal blockages.'
            }
        )
        issue_104.team_id = '301'
        issue_104.save()

        self.stdout.write(self.style.SUCCESS('Successfully seeded database with users, issues, and teams.'))
