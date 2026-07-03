import React, { useState, useEffect } from 'react';
import { store, ISSUE_STATUS } from '../../services/store';
import { Sparkles, Award, Clock, Users, FileText, CheckCircle2, ShieldCheck, Download } from 'lucide-react';

export default function VolunteerDashboard({ onSelectIssue, onFormTeamClick }) {
  const currentUser = store.getUser();
  const [claimedIssues, setClaimedIssues] = useState([]);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const updateDashboard = () => {
      const allIssues = store.getIssues();
      const userTeams = store.getTeams();
      
      const claimed = allIssues.filter(i => 
        (i.volunteersAssigned || []).includes(currentUser.id) ||
        (i.applicants || []).some(a => a.id === currentUser.id)
      );

      setClaimedIssues(claimed);
      setTeams(userTeams);
    };

    updateDashboard();
    return store.subscribe(updateDashboard);
  }, [currentUser]);

  return (
    <div className="space-y-6">
      
      {/* Dashboard Top Banner */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-400">
              <Sparkles className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-white">Worker & Volunteer Portfolio</h2>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Logged in as <strong className="text-white">{currentUser.name}</strong> • Build verified work experience & claim local tasks.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono bg-zinc-800 border border-zinc-700 px-3 py-1.5 rounded text-emerald-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            Verified Profile
          </span>
        </div>
      </div>

      {/* Experience Metrics & Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        
        <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-lg">
          <div className="text-xs font-mono text-zinc-400 uppercase">Volunteer Hours</div>
          <div className="text-2xl font-extrabold text-brand-green font-mono mt-1">{currentUser.volunteerHours || 28} hrs</div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-lg">
          <div className="text-xs font-mono text-zinc-400 uppercase">Completed Gigs</div>
          <div className="text-2xl font-extrabold text-white font-mono mt-1">{currentUser.completedTasks || 5}</div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-lg">
          <div className="text-xs font-mono text-zinc-400 uppercase">Experience Points</div>
          <div className="text-2xl font-extrabold text-amber-400 font-mono mt-1">{currentUser.experiencePoints || 340} XP</div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-lg">
          <div className="text-xs font-mono text-zinc-400 uppercase">Active Teams</div>
          <div className="text-2xl font-extrabold text-purple-400 font-mono mt-1">{teams.length}</div>
        </div>

      </div>

      {/* Badges Section */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h3 className="text-xs font-mono text-brand-green uppercase tracking-wider mb-3">Earned Work Badges & Credentials</h3>
        <div className="flex flex-wrap gap-3">
          {(currentUser.badges || ['Civic Hero', 'Verified Contributor']).map((badge, idx) => (
            <div key={idx} className="bg-zinc-950 border border-zinc-700 px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-200 flex items-center gap-2">
              <Award className="w-4 h-4 text-brand-green" />
              <span>{badge}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Active Claims & Team Work Grid */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
          <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">Your Active Gigs & Volunteer Tasks</h3>
          <span className="text-xs text-zinc-400 font-mono">{claimedIssues.length} active</span>
        </div>

        {claimedIssues.length > 0 ? (
          <div className="divide-y divide-zinc-800">
            {claimedIssues.map((issue) => (
              <div
                key={issue.id}
                onClick={() => onSelectIssue(issue)}
                className="p-5 hover:bg-zinc-800/50 cursor-pointer transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div>
                  <span className="text-xs font-mono text-emerald-400 uppercase">{issue.type.replace('_', ' ')}</span>
                  <h4 className="text-base font-bold text-white mt-0.5">{issue.title}</h4>
                  <p className="text-xs text-zinc-400 mt-1">{issue.location}</p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono px-2.5 py-1 border border-zinc-700 rounded text-zinc-300">
                    Status: {issue.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center text-zinc-400 space-y-2">
            <p className="text-sm">No claimed tasks yet. Explore the feed to apply for paid gigs or claim volunteer work!</p>
          </div>
        )}
      </div>

    </div>
  );
}
