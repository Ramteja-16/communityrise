from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, IssueViewSet, VolunteerTeamViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'issues', IssueViewSet, basename='issue')
router.register(r'teams', VolunteerTeamViewSet, basename='team')

urlpatterns = [
    path('', include(router.urls)),
]
