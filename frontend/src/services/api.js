// Community Rise REST API Client for Django Backend
// Connects React frontend directly to Django REST Framework (http://localhost:8000/api/)
// with automatic Fallback to LocalStorage if backend is unreachable.

const API_BASE_URL = import.meta.env.VITE_DJANGO_API_URL || 'http://localhost:8000/api';

export async function fetchIssuesFromDjango() {
  try {
    const res = await fetch(`${API_BASE_URL}/issues/`);
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (e) {
    console.warn('Django API offline, using reactive store fallback');
  }
  return null;
}

export async function createIssueInDjango(issueData) {
  try {
    const res = await fetch(`${API_BASE_URL}/issues/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: issueData.title,
        description: issueData.description,
        type: issueData.type,
        location: issueData.location,
        urgent: issueData.urgent,
        budget: issueData.budget,
        fundRequested: issueData.fundRequested,
        experienceHours: issueData.experienceHours,
        requiredSkills: issueData.requiredSkills,
        postedBy: issueData.postedBy || 'Citizen Reporter'
      })
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    console.warn('Django API offline during creation');
  }
  return null;
}

export async function claimIssueInDjango(issueId, userDetails) {
  try {
    const res = await fetch(`${API_BASE_URL}/issues/${issueId}/claim/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: userDetails.id || 'u-active-user',
        userName: userDetails.name || 'Samir Ramteke'
      })
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    console.warn('Django API claim failed');
  }
  return null;
}

export async function createTeamInDjango(teamData) {
  try {
    const res = await fetch(`${API_BASE_URL}/teams/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(teamData)
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    console.warn('Django API team creation failed');
  }
  return null;
}

export async function approveFundingInDjango(issueId, fundAmount, govtNotes) {
  try {
    const res = await fetch(`${API_BASE_URL}/issues/${issueId}/approve_funding/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fundAmount, govtNotes })
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    console.warn('Django API funding approval failed');
  }
  return null;
}
