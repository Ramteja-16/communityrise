import React, { useState, useEffect } from 'react';
import { store, ISSUE_TYPES, ISSUE_STATUS } from '../../services/store';
import { User, PlusCircle, CheckCircle, Clock, MapPin, DollarSign, ArrowUpRight } from 'lucide-react';

export default function CitizenDashboard({ onSelectIssue, onOpenPostModal }) {
  const currentUser = store.getUser();
  const [myIssues, setMyIssues] = useState([]);

  useEffect(() => {
    const updateMyIssues = () => {
      const all = store.getIssues();
      // Filter issues posted by current citizen or matching user id
      setMyIssues(all.filter(i => i.postedById === currentUser.id || i.postedBy === currentUser.name));
    };

    updateMyIssues();
    return store.subscribe(updateMyIssues);
  }, [currentUser]);

  return (
    <div className="space-y-6">
      
      {/* Dashboard Top Banner */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-300">
              <User className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-white">Citizen Poster Dashboard</h2>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Welcome back, <strong className="text-white">{currentUser.name}</strong>. Manage your posted tasks, review hired applicants, and approve payouts.
          </p>
        </div>

        <button
          onClick={onOpenPostModal}
          className="btn-primary text-xs py-2 px-4 shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Post New Issue / Job</span>
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-lg">
          <div className="text-xs font-mono text-zinc-400 uppercase">Total Posted Issues</div>
          <div className="text-2xl font-bold text-white font-mono mt-1">{myIssues.length}</div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-lg">
          <div className="text-xs font-mono text-zinc-400 uppercase">Active / In Progress</div>
          <div className="text-2xl font-bold text-brand-green font-mono mt-1">
            {myIssues.filter(i => i.status === ISSUE_STATUS.OPEN || i.status === ISSUE_STATUS.IN_PROGRESS).length}
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-lg">
          <div className="text-xs font-mono text-zinc-400 uppercase">Resolved Tasks</div>
          <div className="text-2xl font-bold text-emerald-400 font-mono mt-1">
            {myIssues.filter(i => i.status === ISSUE_STATUS.RESOLVED).length}
          </div>
        </div>
      </div>

      {/* Posted Issues Table / Cards */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
          <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">Your Posted Issues & Gigs</h3>
          <span className="text-xs text-zinc-400 font-mono">{myIssues.length} item(s)</span>
        </div>

        {myIssues.length > 0 ? (
          <div className="divide-y divide-zinc-800">
            {myIssues.map((issue) => (
              <div
                key={issue.id}
                onClick={() => onSelectIssue(issue)}
                className="p-5 hover:bg-zinc-800/50 cursor-pointer transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-brand-green uppercase">{issue.type.replace('_', ' ')}</span>
                    <span className="text-zinc-600">•</span>
                    <span className="text-xs font-mono text-zinc-400">ID: {issue.id}</span>
                  </div>
                  <h4 className="text-base font-bold text-white hover:text-brand-green transition-colors">{issue.title}</h4>
                  <div className="flex items-center gap-4 text-xs font-mono text-zinc-400 pt-1">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {issue.location}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {new Date(issue.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-xs font-mono text-zinc-400 block">Status</span>
                    <span className="text-xs font-mono font-bold text-brand-green">{issue.status}</span>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-zinc-500" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center text-zinc-400 space-y-3">
            <p className="text-sm">You haven't posted any issues yet.</p>
            <button
              onClick={onOpenPostModal}
              className="btn-primary text-xs py-2 px-4 mx-auto"
            >
              Post Your First Issue
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
