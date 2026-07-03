import React, { useState } from 'react';
import { store, ISSUE_TYPES, USER_ROLES } from '../services/store';
import { X, DollarSign, HeartHandshake, Building2, ShieldAlert, Plus, Check } from 'lucide-react';

export default function PostIssueModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const currentUser = store.getUser();
  const [issueType, setIssueType] = useState(ISSUE_TYPES.CIVIC_GOVT);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('Central District');
  const [budget, setBudget] = useState('500');
  const [fundRequested, setFundRequested] = useState('1500');
  const [urgent, setUrgent] = useState(false);
  const [skillsInput, setSkillsInput] = useState('Electrical, React, Django, Teamwork');
  const [experienceHours, setExperienceHours] = useState('12');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) return;

    const skillsArray = skillsInput.split(',').map(s => s.trim()).filter(Boolean);

    store.createIssue({
      title,
      description,
      type: issueType,
      location,
      urgent,
      budget: issueType === ISSUE_TYPES.PAID_GIG ? Number(budget) : null,
      fundRequested: issueType === ISSUE_TYPES.CIVIC_GOVT ? Number(fundRequested) : null,
      experienceHours: issueType === ISSUE_TYPES.VOLUNTEER ? Number(experienceHours) : null,
      requiredSkills: skillsArray
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-zinc-900 border border-zinc-700 w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-950">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">Report Issue / Post Opportunity</h3>
            <p className="text-xs text-zinc-400">Post a paid gig, volunteer task, or a government-funded civic issue.</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-zinc-400 hover:text-white rounded-md hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 flex-1 text-sm">
          
          {/* Issue Type Selector Tabs */}
          <div>
            <label className="text-xs font-mono text-zinc-400 uppercase block mb-2">Select Issue Category</label>
            <div className="grid grid-cols-3 gap-3">
              
              <button
                type="button"
                onClick={() => setIssueType(ISSUE_TYPES.CIVIC_GOVT)}
                className={`p-3 rounded-lg border text-left flex flex-col justify-between transition-all ${
                  issueType === ISSUE_TYPES.CIVIC_GOVT
                    ? 'bg-amber-950/60 border-amber-500 text-amber-200'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                <Building2 className="w-5 h-5 text-amber-400 mb-2" />
                <div>
                  <div className="font-bold text-xs text-white">Govt Civic Issue</div>
                  <div className="text-[10px] opacity-75">Pole collapse, canal, roads</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setIssueType(ISSUE_TYPES.PAID_GIG)}
                className={`p-3 rounded-lg border text-left flex flex-col justify-between transition-all ${
                  issueType === ISSUE_TYPES.PAID_GIG
                    ? 'bg-zinc-800 border-brand-green text-white'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                <DollarSign className="w-5 h-5 text-brand-green mb-2" />
                <div>
                  <div className="font-bold text-xs text-white">Paid Freelance Gig</div>
                  <div className="text-[10px] opacity-75">Hire skilled workers</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setIssueType(ISSUE_TYPES.VOLUNTEER)}
                className={`p-3 rounded-lg border text-left flex flex-col justify-between transition-all ${
                  issueType === ISSUE_TYPES.VOLUNTEER
                    ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                <HeartHandshake className="w-5 h-5 text-emerald-400 mb-2" />
                <div>
                  <div className="font-bold text-xs text-white">Volunteer Task</div>
                  <div className="text-[10px] opacity-75">Free work for experience</div>
                </div>
              </button>

            </div>
          </div>

          {/* Title */}
          <div>
            <label className="text-xs font-mono text-zinc-400 uppercase block mb-1">Issue Title / Headline *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={
                issueType === ISSUE_TYPES.CIVIC_GOVT
                  ? "e.g., Electric Pole Collapsed & Wire Hazard on Main Rd"
                  : issueType === ISSUE_TYPES.PAID_GIG
                  ? "e.g., React & Django Web Application Developer Needed"
                  : "e.g., Weekend Tutoring & Mentorship Volunteer"
              }
              className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-white placeholder-zinc-600 focus:outline-none focus:border-brand-green"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-mono text-zinc-400 uppercase block mb-1">Detailed Description *</label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide complete context, scope of work, safety concerns, or deliverables required..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-white placeholder-zinc-600 focus:outline-none focus:border-brand-green"
            />
          </div>

          {/* Dynamic Category Specific Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Location */}
            <div>
              <label className="text-xs font-mono text-zinc-400 uppercase block mb-1">City Location / Ward *</label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Ward 4 / Downtown / Remote"
                className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-white font-mono"
              />
            </div>

            {/* Conditional Value Fields */}
            {issueType === ISSUE_TYPES.PAID_GIG && (
              <div>
                <label className="text-xs font-mono text-zinc-400 uppercase block mb-1">Fixed Budget ($ USD) *</label>
                <input
                  type="number"
                  required
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-white font-mono"
                />
              </div>
            )}

            {issueType === ISSUE_TYPES.CIVIC_GOVT && (
              <div>
                <label className="text-xs font-mono text-amber-400 uppercase block mb-1">Requested Govt Fund Grant ($) *</label>
                <input
                  type="number"
                  required
                  value={fundRequested}
                  onChange={(e) => setFundRequested(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-white font-mono"
                />
              </div>
            )}

            {issueType === ISSUE_TYPES.VOLUNTEER && (
              <div>
                <label className="text-xs font-mono text-emerald-400 uppercase block mb-1">Volunteer Hours Logged *</label>
                <input
                  type="number"
                  required
                  value={experienceHours}
                  onChange={(e) => setExperienceHours(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-white font-mono"
                />
              </div>
            )}

          </div>

          {/* Required Skills Input */}
          <div>
            <label className="text-xs font-mono text-zinc-400 uppercase block mb-1">Required Skills (Comma separated)</label>
            <input
              type="text"
              value={skillsInput}
              onChange={(e) => setSkillsInput(e.target.value)}
              placeholder="e.g. Electrical Safety, React, Django, Construction"
              className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-white font-mono text-xs"
            />
          </div>

          {/* Urgency Checkbox */}
          <div className="pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={urgent}
                onChange={(e) => setUrgent(e.target.checked)}
                className="w-4 h-4 accent-red-500 rounded bg-zinc-950 border-zinc-700"
              />
              <span className="text-xs font-mono text-zinc-300 flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
                Mark as High Priority / Emergency Issue
              </span>
            </label>
          </div>

          {/* Submit Action Buttons */}
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
              <Plus className="w-4 h-4" />
              <span>Publish Issue</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
