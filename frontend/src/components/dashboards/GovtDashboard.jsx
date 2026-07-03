import React, { useState, useEffect } from 'react';
import { store, ISSUE_TYPES, ISSUE_STATUS } from '../../services/store';
import { Building2, ShieldAlert, DollarSign, CheckCircle, Clock, Users, ArrowRight } from 'lucide-react';

export default function GovtDashboard({ onSelectIssue }) {
  const currentUser = store.getUser();
  const [civicIssues, setCivicIssues] = useState([]);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const updateGovtData = () => {
      const allIssues = store.getIssues();
      const allTeams = store.getTeams();

      setCivicIssues(allIssues.filter(i => i.type === ISSUE_TYPES.CIVIC_GOVT));
      setTeams(allTeams);
    };

    updateGovtData();
    return store.subscribe(updateGovtData);
  }, []);

  const totalFunded = civicIssues.reduce((acc, i) => acc + (i.fundGranted || 0), 0);
  const pendingCount = civicIssues.filter(i => i.status !== ISSUE_STATUS.RESOLVED && (i.fundGranted || 0) === 0).length;

  return (
    <div className="space-y-6">
      
      {/* Dashboard Top Banner */}
      <div className="bg-amber-950/30 border border-amber-800/60 rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded bg-amber-950 border border-amber-700 text-amber-300">
              <Building2 className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-white">Government & Municipal Authority Portal</h2>
          </div>
          <p className="text-xs text-amber-200/80 mt-1">
            Official Portal • Authorize public funding grants for citizen volunteer teams tackling city emergencies.
          </p>
        </div>

        <div className="text-right font-mono">
          <span className="text-[11px] text-zinc-400 block uppercase">Disbursed Funds</span>
          <span className="text-xl font-extrabold text-emerald-400">${totalFunded.toLocaleString()} USD</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-lg">
          <div className="text-xs font-mono text-zinc-400 uppercase">Civic Issues Reported</div>
          <div className="text-2xl font-bold text-white font-mono mt-1">{civicIssues.length}</div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-lg">
          <div className="text-xs font-mono text-zinc-400 uppercase">Pending Govt Funding Review</div>
          <div className="text-2xl font-bold text-amber-400 font-mono mt-1">{pendingCount}</div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-lg">
          <div className="text-xs font-mono text-zinc-400 uppercase">Volunteer Teams Registered</div>
          <div className="text-2xl font-bold text-purple-400 font-mono mt-1">{teams.length}</div>
        </div>
      </div>

      {/* Civic Issues Review Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
          <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            Civic Emergency & Infrastructure Reports
          </h3>
          <span className="text-xs text-zinc-400 font-mono">Select issue to approve funding</span>
        </div>

        <div className="divide-y divide-zinc-800">
          {civicIssues.map((issue) => (
            <div
              key={issue.id}
              onClick={() => onSelectIssue(issue)}
              className="p-5 hover:bg-zinc-800/50 cursor-pointer transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-amber-400 uppercase">CIVIC GOVT REPORT</span>
                  {issue.urgent && (
                    <span className="bg-red-950 text-red-400 text-[10px] px-2 py-0.5 rounded font-mono uppercase">Emergency</span>
                  )}
                </div>
                <h4 className="text-base font-bold text-white hover:text-amber-300 transition-colors">{issue.title}</h4>
                <p className="text-xs text-zinc-400 line-clamp-1">{issue.description}</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-xs font-mono text-zinc-400 block">Grant Status</span>
                  {issue.fundGranted > 0 ? (
                    <span className="text-xs font-mono font-bold text-emerald-400">${issue.fundGranted} Approved</span>
                  ) : (
                    <span className="text-xs font-mono font-bold text-amber-400">${issue.fundRequested || 1000} Pending</span>
                  )}
                </div>
                <button
                  className="btn-primary text-xs py-1.5 px-3 bg-amber-500 text-black hover:bg-amber-600 font-bold"
                >
                  Review Grant
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
