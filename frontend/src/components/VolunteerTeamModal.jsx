import React, { useState } from 'react';
import { store } from '../services/store';
import { X, Users, Building2, ShieldAlert, Check } from 'lucide-react';

export default function VolunteerTeamModal({ issue, onClose }) {
  if (!issue) return null;

  const currentUser = store.getUser();
  const [teamName, setTeamName] = useState(`Civic Response Team #${Math.floor(Math.random() * 900 + 100)}`);
  const [membersCount, setMembersCount] = useState('6');
  const [fundingRequest, setFundingRequest] = useState(issue.fundRequested || '1800');
  const [description, setDescription] = useState(`Volunteer execution unit formed by ${currentUser.name} to handle equipment deployment, safety perimeter, and resolution for: ${issue.title}.`);

  const handleSubmit = (e) => {
    e.preventDefault();
    store.createVolunteerTeam({
      issueId: issue.id,
      teamName,
      membersCount,
      fundingRequest,
      description
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-zinc-900 border border-zinc-700 w-full max-w-lg rounded-xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-950">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-brand-green" />
            <h3 className="text-lg font-bold text-white tracking-tight">Form Volunteer Execution Team</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-zinc-400 hover:text-white rounded-md hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-sm">
          
          <div className="p-3 bg-amber-950/40 border border-amber-800/60 rounded-lg text-xs text-amber-200">
            <div className="font-semibold mb-1 flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              Tackling Complex Civic Issue:
            </div>
            <div className="font-bold text-white text-sm">{issue.title}</div>
            <p className="mt-1 text-zinc-300">
              Forming a team allows you to apply directly for government funding grants to procure safety gear and machinery.
            </p>
          </div>

          <div>
            <label className="text-xs font-mono text-zinc-400 uppercase block mb-1">Volunteer Team Name *</label>
            <input
              type="text"
              required
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-white font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono text-zinc-400 uppercase block mb-1">Team Size (Volunteers) *</label>
              <input
                type="number"
                required
                min={2}
                value={membersCount}
                onChange={(e) => setMembersCount(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-white font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-amber-400 uppercase block mb-1">Govt Funding Request ($) *</label>
              <input
                type="number"
                required
                value={fundingRequest}
                onChange={(e) => setFundingRequest(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-white font-mono"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-zinc-400 uppercase block mb-1">Team Execution Plan & Safety Plan</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-white text-xs"
            />
          </div>

          <div className="pt-4 border-t border-zinc-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary text-xs py-2 px-4"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn-primary text-xs py-2 px-5"
            >
              <Check className="w-4 h-4" />
              <span>Submit Team Proposal to Govt</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
