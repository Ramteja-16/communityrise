// Community Rise Central Data Store & Dual-Mode Reactive State Engine
// Integrates live Django REST Framework API (http://localhost:8000/api/)
// with automatic LocalStorage sync fallback.

import {
  fetchIssuesFromDjango,
  createIssueInDjango,
  claimIssueInDjango,
  createTeamInDjango,
  approveFundingInDjango
} from './api';

const STORAGE_KEY_ISSUES = 'community_rise_issues';
const STORAGE_KEY_USER = 'community_rise_user';
const STORAGE_KEY_TEAMS = 'community_rise_teams';
const STORAGE_KEY_CONFIG = 'community_rise_config';

export const USER_ROLES = {
  CITIZEN: 'CITIZEN',
  WORKER_VOLUNTEER: 'WORKER_VOLUNTEER',
  GOVT_OFFICIAL: 'GOVT_OFFICIAL',
  ADMIN_DEV: 'ADMIN_DEV'
};

export const ISSUE_TYPES = {
  PAID_GIG: 'PAID_GIG',
  VOLUNTEER: 'VOLUNTEER',
  CIVIC_GOVT: 'CIVIC_GOVT'
};

export const ISSUE_STATUS = {
  OPEN: 'OPEN',
  CLAIMED: 'CLAIMED',
  IN_PROGRESS: 'IN_PROGRESS',
  TEAM_FORMED: 'TEAM_FORMED',
  FUNDED: 'FUNDED',
  RESOLVED: 'RESOLVED'
};

// Initial Seed Data (Fallback)
const INITIAL_ISSUES = [
  {
    id: 'iss-101',
    title: 'Electric Pole Collapsed & Exposed Cables on 4th Main Road',
    description: 'A heavy storm knocked down an electric utility pole near Central Park. Wires are hazardous and blocking traffic. Requires government authority dispatch or funded emergency volunteer safety team.',
    type: ISSUE_TYPES.CIVIC_GOVT,
    status: ISSUE_STATUS.OPEN,
    location: 'Downtown District 4',
    postedBy: 'Citizen Reporter #402',
    postedById: 'u-citizen-1',
    createdAt: '2026-07-03T09:30:00Z',
    urgent: true,
    budget: null,
    fundRequested: 1200,
    fundGranted: 0,
    requiredSkills: ['Electrical Safety', 'Debris Management', 'Traffic Control'],
    volunteersNeeded: 6,
    volunteersAssigned: [],
    teamId: null,
    govtNotes: ''
  },
  {
    id: 'iss-102',
    title: 'React & Django Web Developer Needed for Local Artisan Market',
    description: 'Our artisan collective needs an experienced developer to set up an inventory catalog and online booking portal. Paid contract with performance bonus.',
    type: ISSUE_TYPES.PAID_GIG,
    status: ISSUE_STATUS.OPEN,
    location: 'West End Hub / Remote',
    postedBy: 'GreenCraft Organics',
    postedById: 'u-org-12',
    createdAt: '2026-07-02T14:15:00Z',
    urgent: false,
    budget: 650,
    fundRequested: null,
    fundGranted: null,
    requiredSkills: ['React.js', 'Django', 'Tailwind CSS', 'PostgreSQL'],
    applicants: [
      { id: 'worker-77', name: 'Alex Rivera', role: 'Full Stack Dev', status: 'PENDING' }
    ],
    claimedBy: null
  },
  {
    id: 'iss-103',
    title: 'Weekend Youth Coding & Digital Literacy Workshop Tutors',
    description: 'Seeking passionate volunteers to conduct free weekend classes for underprivileged high school students. Great opportunity to gain verified teaching & mentorship experience.',
    type: ISSUE_TYPES.VOLUNTEER,
    status: ISSUE_STATUS.OPEN,
    location: 'Community Center Library',
    postedBy: 'Youth Empower Foundation',
    postedById: 'u-ngo-05',
    createdAt: '2026-07-01T11:00:00Z',
    urgent: false,
    budget: null,
    fundRequested: null,
    fundGranted: null,
    requiredSkills: ['Python Basics', 'Mentorship', 'Public Speaking'],
    volunteersNeeded: 4,
    volunteersAssigned: ['u-worker-1'],
    experienceHours: 15,
    certificateProvided: true
  },
  {
    id: 'iss-104',
    title: 'Municipal Canal Debris Cleanup & Safety Rail Installation',
    description: 'Major accumulated plastics and blockages in the north canal causing urban flooding. Volunteer team organized by Civic Alliance.',
    type: ISSUE_TYPES.CIVIC_GOVT,
    status: ISSUE_STATUS.FUNDED,
    location: 'North Ward Canal',
    postedBy: 'Civic Alliance',
    postedById: 'u-alliance-1',
    createdAt: '2026-06-28T08:00:00Z',
    urgent: true,
    budget: null,
    fundRequested: 2500,
    fundGranted: 2500,
    requiredSkills: ['Civic Engineering', 'Heavy Cleanup', 'Team Lead'],
    volunteersNeeded: 12,
    volunteersAssigned: ['u-worker-1', 'u-worker-2', 'u-worker-3'],
    teamId: 'team-301',
    govtNotes: 'Approved by City Disaster Mgmt Board. Funds disbursed to Volunteer Lead.'
  }
];

const INITIAL_USER = {
  id: 'u-active-user',
  name: 'Samir Ramteke',
  email: 'samir@communityrise.org',
  activeRole: USER_ROLES.WORKER_VOLUNTEER,
  skills: ['React', 'Python', 'Django', 'Community Organization', 'Electrical Engineering'],
  experiencePoints: 340,
  volunteerHours: 28,
  completedTasks: 5,
  badges: ['Civic Hero', 'Verified Contributor', 'Rapid Responder']
};

const INITIAL_TEAMS = [
  {
    id: 'team-301',
    name: 'North Ward Emergency Cleanup Crew',
    issueId: 'iss-104',
    leadName: 'Samir Ramteke',
    leadId: 'u-active-user',
    membersCount: 8,
    requestedFund: 2500,
    approvedFund: 2500,
    status: 'APPROVED',
    description: 'Organized group of 8 certified volunteers clearing canal blockages.'
  }
];

const INITIAL_CONFIG = {
  djangoApiUrl: 'http://localhost:8000/api/',
  useDjangoApi: true,
  apiStatus: 'ONLINE_DJANGO_DRF'
};

class StoreService {
  constructor() {
    this.listeners = new Set();
    this.initStore();
    this.syncWithDjangoBackend();
  }

  initStore() {
    if (!localStorage.getItem(STORAGE_KEY_ISSUES)) {
      localStorage.setItem(STORAGE_KEY_ISSUES, JSON.stringify(INITIAL_ISSUES));
    }
    if (!localStorage.getItem(STORAGE_KEY_USER)) {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(INITIAL_USER));
    }
    if (!localStorage.getItem(STORAGE_KEY_TEAMS)) {
      localStorage.setItem(STORAGE_KEY_TEAMS, JSON.stringify(INITIAL_TEAMS));
    }
    if (!localStorage.getItem(STORAGE_KEY_CONFIG)) {
      localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(INITIAL_CONFIG));
    }
  }

  async syncWithDjangoBackend() {
    const djangoData = await fetchIssuesFromDjango();
    if (djangoData && Array.isArray(djangoData) && djangoData.length > 0) {
      localStorage.setItem(STORAGE_KEY_ISSUES, JSON.stringify(djangoData));
      this.notify();
    }
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach(fn => fn());
  }

  // --- Issues Management ---
  getIssues() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY_ISSUES)) || INITIAL_ISSUES;
    } catch (e) {
      return INITIAL_ISSUES;
    }
  }

  getIssueById(id) {
    const issues = this.getIssues();
    return issues.find(i => String(i.id) === String(id));
  }

  async createIssue(issueData) {
    const issues = this.getIssues();
    const newIssue = {
      id: `iss-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString(),
      status: ISSUE_STATUS.OPEN,
      volunteersAssigned: [],
      applicants: [],
      fundGranted: 0,
      postedBy: this.getUser().name,
      postedById: this.getUser().id,
      ...issueData
    };

    // Try posting to Django backend
    const djangoResponse = await createIssueInDjango(newIssue);
    const finalIssue = djangoResponse || newIssue;

    issues.unshift(finalIssue);
    localStorage.setItem(STORAGE_KEY_ISSUES, JSON.stringify(issues));
    this.notify();
    return finalIssue;
  }

  async claimIssue(issueId, userDetails) {
    await claimIssueInDjango(issueId, userDetails);
    
    const issues = this.getIssues();
    const issueIndex = issues.findIndex(i => String(i.id) === String(issueId));
    if (issueIndex !== -1) {
      const issue = issues[issueIndex];
      if (issue.type === ISSUE_TYPES.PAID_GIG) {
        issue.applicants = issue.applicants || [];
        if (!issue.applicants.some(a => a.id === userDetails.id)) {
          issue.applicants.push({
            id: userDetails.id,
            name: userDetails.name,
            role: userDetails.skills ? userDetails.skills[0] : 'Contributor',
            status: 'APPLIED',
            appliedAt: new Date().toISOString()
          });
        }
      } else {
        issue.volunteersAssigned = issue.volunteersAssigned || [];
        if (!issue.volunteersAssigned.includes(userDetails.id)) {
          issue.volunteersAssigned.push(userDetails.id);
          if (issue.volunteersAssigned.length >= (issue.volunteersNeeded || 1)) {
            issue.status = ISSUE_STATUS.IN_PROGRESS;
          }
        }
      }
      issues[issueIndex] = issue;
      localStorage.setItem(STORAGE_KEY_ISSUES, JSON.stringify(issues));
      this.notify();
    }
  }

  // --- Volunteer Team Formation ---
  async createVolunteerTeam({ issueId, teamName, membersCount, fundingRequest, description }) {
    const currentUser = this.getUser();
    const teamPayload = {
      issueId,
      teamName,
      leadName: currentUser.name,
      membersCount: Number(membersCount) || 1,
      fundingRequest: Number(fundingRequest) || 0,
      description
    };

    await createTeamInDjango(teamPayload);

    const teams = this.getTeams();
    const newTeam = {
      id: `team-${Date.now().toString().slice(-4)}`,
      issueId,
      name: teamName,
      leadName: currentUser.name,
      leadId: currentUser.id,
      membersCount: Number(membersCount) || 1,
      requestedFund: Number(fundingRequest) || 0,
      approvedFund: 0,
      status: 'PENDING_GOVT_APPROVAL',
      description
    };
    teams.unshift(newTeam);
    localStorage.setItem(STORAGE_KEY_TEAMS, JSON.stringify(teams));

    // Update Issue status
    const issues = this.getIssues();
    const idx = issues.findIndex(i => String(i.id) === String(issueId));
    if (idx !== -1) {
      issues[idx].teamId = newTeam.id;
      issues[idx].status = ISSUE_STATUS.TEAM_FORMED;
      issues[idx].fundRequested = newTeam.requestedFund;
      localStorage.setItem(STORAGE_KEY_ISSUES, JSON.stringify(issues));
    }

    this.notify();
    return newTeam;
  }

  getTeams() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY_TEAMS)) || INITIAL_TEAMS;
    } catch (e) {
      return INITIAL_TEAMS;
    }
  }

  // --- Government Official Actions ---
  async approveGovtFunding(issueId, teamId, fundAmount, officialNotes = '') {
    await approveFundingInDjango(issueId, fundAmount, officialNotes);

    const issues = this.getIssues();
    const issueIdx = issues.findIndex(i => String(i.id) === String(issueId));
    if (issueIdx !== -1) {
      issues[issueIdx].status = ISSUE_STATUS.FUNDED;
      issues[issueIdx].fundGranted = Number(fundAmount);
      issues[issueIdx].govtNotes = officialNotes;
      localStorage.setItem(STORAGE_KEY_ISSUES, JSON.stringify(issues));
    }

    const teams = this.getTeams();
    const teamIdx = teams.findIndex(t => String(t.id) === String(teamId) || String(t.issueId) === String(issueId));
    if (teamIdx !== -1) {
      teams[teamIdx].status = 'APPROVED';
      teams[teamIdx].approvedFund = Number(fundAmount);
      localStorage.setItem(STORAGE_KEY_TEAMS, JSON.stringify(teams));
    }

    this.notify();
  }

  updateIssueStatus(issueId, newStatus) {
    const issues = this.getIssues();
    const idx = issues.findIndex(i => String(i.id) === String(issueId));
    if (idx !== -1) {
      issues[idx].status = newStatus;
      localStorage.setItem(STORAGE_KEY_ISSUES, JSON.stringify(issues));
      this.notify();
    }
  }

  // --- User & Role Switcher ---
  getUser() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY_USER)) || INITIAL_USER;
    } catch (e) {
      return INITIAL_USER;
    }
  }

  setUserRole(role) {
    const user = this.getUser();
    user.activeRole = role;
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    this.notify();
  }

  updateUserProfile(profileData) {
    const user = { ...this.getUser(), ...profileData };
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    this.notify();
  }

  // --- Admin Config ---
  getConfig() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY_CONFIG)) || INITIAL_CONFIG;
    } catch (e) {
      return INITIAL_CONFIG;
    }
  }

  updateConfig(newConfig) {
    const config = { ...this.getConfig(), ...newConfig };
    localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(config));
    this.notify();
  }

  resetToDefault() {
    localStorage.setItem(STORAGE_KEY_ISSUES, JSON.stringify(INITIAL_ISSUES));
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(INITIAL_USER));
    localStorage.setItem(STORAGE_KEY_TEAMS, JSON.stringify(INITIAL_TEAMS));
    localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(INITIAL_CONFIG));
    this.syncWithDjangoBackend();
    this.notify();
  }
}

export const store = new StoreService();
