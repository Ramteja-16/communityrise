import React, { useState, useEffect } from 'react';
import { store, USER_ROLES } from '../services/store';
import { ArrowRight, ShieldCheck, DollarSign, Users, Award, AlertTriangle, Building2, Sparkles } from 'lucide-react';

export default function Hero({ onExploreClick, onPostClick, onRoleSelect }) {
  const [stats, setStats] = useState({
    totalIssues: 0,
    solvedIssues: 0,
    govtFundsAllocated: 0,
    volunteerHours: 0
  });

  useEffect(() => {
    const updateStats = () => {
      const issues = store.getIssues();
      const teams = store.getTeams();
      
      const solved = issues.filter(i => i.status === 'RESOLVED').length + 1; // seed resolved
      const funds = issues.reduce((acc, i) => acc + (i.fundGranted || 0), 0);
      const hours = 145; // total volunteer hours tracked

      setStats({
        totalIssues: issues.length,
        solvedIssues: solved,
        govtFundsAllocated: funds,
        volunteerHours: hours
      });
    };

    updateStats();
    return store.subscribe(updateStats);
  }, []);

  return (
    <section className="border-b border-brand-border bg-zinc-950 py-12 lg:py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Announcement Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300 mb-6">
          <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse"></span>
          <span>Community Rise Ecosystem • Live Civic Action</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Main Title & Description */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
              Fix Your City. <br />
              <span className="text-brand-green">Unlock Skills.</span> <br />
              Funded by Government.
            </h1>

            <p className="text-base sm:text-lg text-zinc-400 font-normal leading-relaxed max-w-2xl">
              Connect skilled individuals with paid work, empower volunteers to build verified experience, 
              and enable citizen teams to resolve major public infrastructure issues with official government funding.
            </p>

            {/* CTA Buttons - Minimalist, high contrast, zero gradient */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreClick}
                className="btn-primary py-3 px-6 text-sm"
              >
                <span>Browse Active Issues</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onPostClick}
                className="btn-secondary py-3 px-6 text-sm"
              >
                <span>Post an Issue / Hire</span>
              </button>

              <button
                onClick={() => onRoleSelect(USER_ROLES.GOVT_OFFICIAL)}
                className="btn-outline py-3 px-4 text-sm font-mono flex items-center gap-2"
              >
                <Building2 className="w-4 h-4 text-amber-400" />
                <span>Govt Portal</span>
              </button>
            </div>

            {/* Quick Feature Chips */}
            <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-brand-green" />
                <span>Zero Gradients & Fast Load</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-brand-green" />
                <span>Volunteer Team Grants</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-brand-green" />
                <span>Verified Work Portfolio</span>
              </div>
            </div>
          </div>

          {/* Right Live Stats Grid */}
          <div className="lg:col-span-5">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                  Real-Time City Impact Ticker
                </span>
                <span className="text-[11px] font-mono text-brand-green">Live Engine</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-zinc-950 rounded-lg border border-zinc-800">
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">{stats.totalIssues}</div>
                  <div className="text-xs text-zinc-400 mt-1 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                    <span>Reported Issues</span>
                  </div>
                </div>

                <div className="p-4 bg-zinc-950 rounded-lg border border-zinc-800">
                  <div className="text-2xl sm:text-3xl font-extrabold text-brand-green font-mono">
                    ${stats.govtFundsAllocated.toLocaleString()}
                  </div>
                  <div className="text-xs text-zinc-400 mt-1 flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-brand-green" />
                    <span>Govt Funds Granted</span>
                  </div>
                </div>

                <div className="p-4 bg-zinc-950 rounded-lg border border-zinc-800">
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">{stats.volunteerHours}+</div>
                  <div className="text-xs text-zinc-400 mt-1 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Volunteer Hours</span>
                  </div>
                </div>

                <div className="p-4 bg-zinc-950 rounded-lg border border-zinc-800">
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">100%</div>
                  <div className="text-xs text-zinc-400 mt-1 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-purple-400" />
                    <span>Transparent Logs</span>
                  </div>
                </div>
              </div>

              {/* Featured Case Box */}
              <div className="p-4 bg-zinc-950 rounded-lg border border-zinc-800/80">
                <div className="text-xs font-mono text-amber-400 uppercase mb-1">High-Priority Civic Case</div>
                <div className="text-sm font-semibold text-white">Electric Pole Collapsed & Cable Exposure</div>
                <div className="text-xs text-zinc-400 mt-1">
                  Single individuals cannot fix electrical poles alone. Volunteer team formed; waiting for Govt Official grant approval.
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
