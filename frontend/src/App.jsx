import React, { useState, useEffect } from 'react';
import { store, USER_ROLES } from './services/store';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import IssueFeed from './components/IssueFeed';
import IssueDetailModal from './components/IssueDetailModal';
import PostIssueModal from './components/PostIssueModal';
import VolunteerTeamModal from './components/VolunteerTeamModal';
import AuthModal from './components/AuthModal';

import CitizenDashboard from './components/dashboards/CitizenDashboard';
import VolunteerDashboard from './components/dashboards/VolunteerDashboard';
import GovtDashboard from './components/dashboards/GovtDashboard';
import AdminDashboard from './components/dashboards/AdminDashboard';

export default function App() {
  const [activeTab, setActiveTab] = useState('explore'); // 'explore' | 'how-it-works' | 'dashboard'
  const [user, setUser] = useState(store.getUser());
  
  // Modals state
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [teamModalIssue, setTeamModalIssue] = useState(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    return store.subscribe(() => {
      setUser(store.getUser());
    });
  }, []);

  const handleRoleSelectFromHero = (role) => {
    store.setUserRole(role);
    setActiveTab('dashboard');
  };

  const renderActiveDashboard = () => {
    switch (user.activeRole) {
      case USER_ROLES.CITIZEN:
        return (
          <CitizenDashboard
            onSelectIssue={(issue) => setSelectedIssue(issue)}
            onOpenPostModal={() => setIsPostModalOpen(true)}
          />
        );
      case USER_ROLES.WORKER_VOLUNTEER:
        return (
          <VolunteerDashboard
            onSelectIssue={(issue) => setSelectedIssue(issue)}
            onFormTeamClick={(issue) => setTeamModalIssue(issue)}
          />
        );
      case USER_ROLES.GOVT_OFFICIAL:
        return (
          <GovtDashboard
            onSelectIssue={(issue) => setSelectedIssue(issue)}
          />
        );
      case USER_ROLES.ADMIN_DEV:
        return (
          <AdminDashboard />
        );
      default:
        return (
          <CitizenDashboard
            onSelectIssue={(issue) => setSelectedIssue(issue)}
            onOpenPostModal={() => setIsPostModalOpen(true)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-brand-black text-white font-sans flex flex-col justify-between selection:bg-brand-green selection:text-black">
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenPostModal={() => setIsPostModalOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {activeTab === 'explore' && (
          <>
            <Hero
              onExploreClick={() => {
                const feedEl = document.getElementById('issue-feed-section');
                if (feedEl) feedEl.scrollIntoView({ behavior: 'smooth' });
              }}
              onPostClick={() => setIsPostModalOpen(true)}
              onRoleSelect={handleRoleSelectFromHero}
            />
            <div id="issue-feed-section">
              <IssueFeed
                onSelectIssue={(issue) => setSelectedIssue(issue)}
                onFormTeamClick={(issue) => setTeamModalIssue(issue)}
                onOpenPostModal={() => setIsPostModalOpen(true)}
              />
            </div>
          </>
        )}

        {activeTab === 'how-it-works' && (
          <HowItWorks />
        )}

        {activeTab === 'dashboard' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {renderActiveDashboard()}
          </div>
        )}

      </main>

      {/* Minimalist Footer */}
      <footer className="border-t border-brand-border bg-zinc-950 py-8 text-xs font-mono text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-brand-green rounded-full"></span>
            <span className="text-white font-bold font-sans">Community Rise</span>
            <span>• Empowering Cities & Skills</span>
          </div>

          <div className="flex items-center space-x-6">
            <button onClick={() => setActiveTab('explore')} className="hover:text-white transition-colors">Explore</button>
            <button onClick={() => setActiveTab('how-it-works')} className="hover:text-white transition-colors">Aim & Workflow</button>
            <button onClick={() => setActiveTab('dashboard')} className="hover:text-white transition-colors">Role Dashboards</button>
            <button onClick={() => setIsAuthModalOpen(true)} className="hover:text-white transition-colors">Auth Portal</button>
          </div>
        </div>
      </footer>

      {/* Interactive Modals */}
      <IssueDetailModal
        issue={selectedIssue}
        onClose={() => setSelectedIssue(null)}
        onFormTeamClick={(issue) => setTeamModalIssue(issue)}
      />

      <PostIssueModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
      />

      <VolunteerTeamModal
        issue={teamModalIssue}
        onClose={() => setTeamModalIssue(null)}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

    </div>
  );
}
