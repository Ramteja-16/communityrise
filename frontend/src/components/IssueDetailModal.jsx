import React, { useState } from 'react';
import { store, ISSUE_TYPES, ISSUE_STATUS, USER_ROLES } from '../services/store';
import { X, MapPin, Clock, DollarSign, Users, ShieldAlert, Award, Building2, CheckCircle, ArrowRight, FileText } from 'lucide-react';

export default function IssueDetailModal({ issue, onClose, onFormTeamClick }) {
  if (!issue) return null;

  const currentUser = store.getUser();
  const [govtFundInput, setGovtFundInput] = useState(issue.fundRequested || 1500);
  const [govtNotes, setGovtNotes] = useState(issue.govtNotes || '');

  const isAssigned = (issue.volunteersAssigned || []).includes(currentUser.id);
  const hasApplied = (issue.applicants || []).some(a => a.id === currentUser.id);

  const handleClaim = () => {
    store.claimIssue(issue.id, currentUser);
    onClose();
  };

  const handleGovtApprove = () => {
    store.approveGovtFunding(issue.id, issue.teamId, Number(govtFundInput), govtNotes);
    onClose();
  };

  const handleMarkResolved = () => {
    store.updateIssueStatus(issue.id, ISSUE_STATUS.RESOLVED);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-zinc-900 border border-zinc-700 w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-950">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-brand-green">
              {issue.type.replace('_', ' ')}
            </span>
            <span className="text-zinc-600">•</span>
            <span className="text-xs font-mono text-zinc-400">ID: {issue.id}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-zinc-400 hover:text-white rounded-md hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
          
          {/* Title & Urgent Badge */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-2xl font-extrabold text-white leading-snug">{issue.title}</h2>
              {issue.urgent && (
                <span className="bg-red-950 text-red-400 border border-red-800 text-xs px-2.5 py-0.5 rounded font-mono uppercase flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5" /> Urgent Action Needed
                </span>
              )}
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-zinc-400 pt-1">
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                <span>{issue.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-zinc-500" />
                <span>Posted on {new Date(issue.createdAt).toLocaleString()}</span>
              </div>
              <div>
                <span>Posted by: <strong className="text-zinc-200">{issue.postedBy}</strong></span>
              </div>
            </div>
          </div>

          {/* Issue Description */}
          <div className="p-4 bg-zinc-950 rounded-lg border border-zinc-800 text-zinc-300 leading-relaxed">
            <h4 className="text-xs font-mono text-zinc-400 uppercase mb-2">Issue / Requirement Overview</h4>
            <p className="whitespace-pre-line text-sm">{issue.description}</p>
          </div>

          {/* Required Skills */}
          {issue.requiredSkills && issue.requiredSkills.length > 0 && (
            <div>
              <h4 className="text-xs font-mono text-zinc-400 uppercase mb-2">Required Skills & Expertise</h4>
              <div className="flex flex-wrap gap-2">
                {issue.requiredSkills.map((skill, idx) => (
                  <span key={idx} className="bg-zinc-800 text-zinc-200 text-xs px-3 py-1 rounded border border-zinc-700 font-mono">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Special Category Boxes */}
          {/* 1. Paid Gig Box */}
          {issue.type === ISSUE_TYPES.PAID_GIG && (
            <div className="p-4 bg-zinc-950 rounded-lg border border-zinc-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-zinc-400 uppercase">Offered Compensation</span>
                <div className="text-2xl font-extrabold text-white font-mono flex items-center gap-1">
                  <DollarSign className="w-5 h-5 text-brand-green" />
                  <span>${issue.budget}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono text-zinc-400">Total Applicants</span>
                <div className="text-sm font-bold text-zinc-200 font-mono">
                  {(issue.applicants || []).length} dev(s) applied
                </div>
              </div>
            </div>
          )}

          {/* 2. Civic Govt Funding Box */}
          {issue.type === ISSUE_TYPES.CIVIC_GOVT && (
            <div className="p-4 bg-amber-950/40 rounded-lg border border-amber-800/60 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-amber-400" />
                  <span className="text-xs font-mono text-amber-300 uppercase font-semibold">Government Civic Status</span>
                </div>
                <span className="text-xs font-mono text-amber-300 px-2 py-0.5 border border-amber-700 rounded">
                  Status: {issue.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-mono pt-2 border-t border-amber-900/60">
                <div>
                  <span className="text-amber-400/80">Requested Govt Budget:</span>
                  <div className="text-base font-bold text-amber-200">${issue.fundRequested || 0}</div>
                </div>
                <div>
                  <span className="text-amber-400/80">Approved & Disbursed:</span>
                  <div className="text-base font-bold text-emerald-400">${issue.fundGranted || 0}</div>
                </div>
              </div>

              {issue.govtNotes && (
                <div className="text-xs text-amber-200/90 pt-2 border-t border-amber-900/60">
                  <strong>Official Govt Order Note:</strong> {issue.govtNotes}
                </div>
              )}
            </div>
          )}

          {/* Government Official Action Controls (Visible if active role is GOVT_OFFICIAL) */}
          {currentUser.activeRole === USER_ROLES.GOVT_OFFICIAL && issue.type === ISSUE_TYPES.CIVIC_GOVT && (
            <div className="p-4 bg-zinc-950 rounded-lg border border-amber-800/80 space-y-3">
              <h4 className="text-xs font-mono text-amber-400 uppercase flex items-center gap-2 font-bold">
                <Building2 className="w-4 h-4" />
                Government Official Authorization Panel
              </h4>
              <p className="text-xs text-zinc-400">
                Review this civic issue report and disburse official municipal funds to the volunteer team.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="text-[11px] font-mono text-zinc-400 block mb-1">Approved Fund Amount ($)</label>
                  <input
                    type="number"
                    value={govtFundInput}
                    onChange={(e) => setGovtFundInput(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-1.5 text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono text-zinc-400 block mb-1">Government Order Reference Note</label>
                  <input
                    type="text"
                    value={govtNotes}
                    onChange={(e) => setGovtNotes(e.target.value)}
                    placeholder="e.g. Approved under Disaster Resolution Act #402"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-1.5 text-xs text-white"
                  />
                </div>
              </div>

              <button
                onClick={handleGovtApprove}
                className="btn-primary w-full text-xs py-2 bg-amber-500 hover:bg-amber-600 text-black font-bold mt-2"
              >
                Approve & Disburse Municipal Funds (${govtFundInput})
              </button>
            </div>
          )}

        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between gap-3">
          
          <button
            onClick={onClose}
            className="btn-secondary text-xs py-2 px-4"
          >
            Close
          </button>

          <div className="flex items-center gap-2">
            
            {/* Civic Issue Team Formation Button */}
            {issue.type === ISSUE_TYPES.CIVIC_GOVT && issue.status !== ISSUE_STATUS.RESOLVED && (
              <button
                onClick={() => {
                  onClose();
                  onFormTeamClick(issue);
                }}
                className="btn-outline text-xs py-2 px-4 font-mono"
              >
                <Users className="w-4 h-4 text-brand-green" />
                <span>Form Volunteer Execution Team</span>
              </button>
            )}

            {/* Claim / Apply Button */}
            {issue.type !== ISSUE_TYPES.CIVIC_GOVT && (
              <button
                onClick={handleClaim}
                disabled={isAssigned || hasApplied}
                className="btn-primary text-xs py-2 px-4"
              >
                {isAssigned || hasApplied ? (
                  <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4" /> Already Claimed</span>
                ) : (
                  <span>{issue.type === ISSUE_TYPES.PAID_GIG ? 'Apply for Paid Contract' : 'Claim Volunteer Task'}</span>
                )}
              </button>
            )}

            {/* Mark Resolved Option */}
            {issue.status !== ISSUE_STATUS.RESOLVED && (
              <button
                onClick={handleMarkResolved}
                className="btn-secondary text-xs py-2 px-3 border-emerald-800 text-emerald-400 hover:bg-emerald-950"
              >
                Mark Resolved
              </button>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
