import React from 'react';
import { ISSUE_TYPES, ISSUE_STATUS, store, USER_ROLES } from '../services/store';
import { MapPin, Clock, DollarSign, Users, ShieldAlert, Award, ArrowRight, CheckCircle } from 'lucide-react';

export default function IssueCard({ issue, onSelectIssue, onFormTeamClick }) {
  const currentUser = store.getUser();

  const getTypeBadge = (type) => {
    switch (type) {
      case ISSUE_TYPES.PAID_GIG:
        return { label: 'Paid Gig', className: 'badge-paid' };
      case ISSUE_TYPES.VOLUNTEER:
        return { label: 'Volunteer Service', className: 'badge-green' };
      case ISSUE_TYPES.CIVIC_GOVT:
        return { label: 'Govt Civic Issue', className: 'badge-civic' };
      default:
        return { label: 'General', className: 'badge-status' };
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case ISSUE_STATUS.OPEN:
        return { label: 'Open', color: 'text-brand-green border-brand-green/40' };
      case ISSUE_STATUS.CLAIMED:
        return { label: 'Claimed', color: 'text-blue-400 border-blue-800' };
      case ISSUE_STATUS.IN_PROGRESS:
        return { label: 'In Progress', color: 'text-amber-400 border-amber-800' };
      case ISSUE_STATUS.TEAM_FORMED:
        return { label: 'Team Formed', color: 'text-purple-400 border-purple-800' };
      case ISSUE_STATUS.FUNDED:
        return { label: 'Govt Funded', color: 'text-emerald-400 border-emerald-700 bg-emerald-950/40' };
      case ISSUE_STATUS.RESOLVED:
        return { label: 'Resolved', color: 'text-zinc-400 border-zinc-700' };
      default:
        return { label: status, color: 'text-zinc-400 border-zinc-700' };
    }
  };

  const typeInfo = getTypeBadge(issue.type);
  const statusInfo = getStatusBadge(issue.status);

  const handleQuickClaim = (e) => {
    e.stopPropagation();
    store.claimIssue(issue.id, currentUser);
  };

  const isAssigned = (issue.volunteersAssigned || []).includes(currentUser.id);
  const hasApplied = (issue.applicants || []).some(a => a.id === currentUser.id);

  return (
    <div 
      onClick={() => onSelectIssue(issue)}
      className="card-minimal cursor-pointer group flex flex-col justify-between hover:border-brand-green/60 transition-all duration-200"
    >
      <div>
        
        {/* Top Header Tags */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className={typeInfo.className}>{typeInfo.label}</span>
            {issue.urgent && (
              <span className="bg-red-950 text-red-400 border border-red-800 text-[10px] px-2 py-0.5 rounded font-mono uppercase flex items-center gap-1">
                <ShieldAlert className="w-3 h-3" /> Urgent
              </span>
            )}
          </div>
          <span className={`text-xs px-2 py-0.5 border rounded font-mono ${statusInfo.color}`}>
            {statusInfo.label}
          </span>
        </div>

        {/* Issue Title */}
        <h4 className="text-base font-bold text-white group-hover:text-brand-green transition-colors line-clamp-2">
          {issue.title}
        </h4>

        {/* Location & Time */}
        <div className="flex items-center gap-4 text-xs font-mono text-zinc-400 mt-2">
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-zinc-500" />
            <span className="truncate max-w-[140px]">{issue.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-zinc-500" />
            <span>{new Date(issue.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Short Description */}
        <p className="text-xs text-zinc-400 mt-3 line-clamp-3 leading-relaxed">
          {issue.description}
        </p>

        {/* Skills Tag Chips */}
        {issue.requiredSkills && issue.requiredSkills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4">
            {issue.requiredSkills.map((skill, idx) => (
              <span key={idx} className="bg-zinc-800/80 text-zinc-300 text-[11px] px-2 py-0.5 rounded border border-zinc-700 font-mono">
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer Info & Action Bar */}
      <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between gap-2">
        
        {/* Left Financial / Volunteer Indicator */}
        <div>
          {issue.type === ISSUE_TYPES.PAID_GIG && (
            <div className="flex items-center gap-1 text-sm font-bold text-white font-mono">
              <DollarSign className="w-4 h-4 text-brand-green" />
              <span>${issue.budget}</span>
              <span className="text-[10px] text-zinc-400 font-sans font-normal">Fixed Budget</span>
            </div>
          )}

          {issue.type === ISSUE_TYPES.VOLUNTEER && (
            <div className="flex items-center gap-1 text-xs font-mono text-emerald-400">
              <Award className="w-3.5 h-3.5" />
              <span>{issue.experienceHours || 10} hrs Exp Badge</span>
            </div>
          )}

          {issue.type === ISSUE_TYPES.CIVIC_GOVT && (
            <div className="flex items-center gap-1 text-xs font-mono text-amber-400">
              <Users className="w-3.5 h-3.5" />
              <span>
                {issue.fundGranted > 0 
                  ? `$${issue.fundGranted} Govt Funded` 
                  : `$${issue.fundRequested || 1000} Requested`}
              </span>
            </div>
          )}
        </div>

        {/* Right CTA */}
        <div className="flex items-center gap-2">
          {issue.type === ISSUE_TYPES.CIVIC_GOVT && issue.status !== ISSUE_STATUS.RESOLVED && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onFormTeamClick(issue);
              }}
              className="btn-outline text-xs py-1 px-2.5 font-mono"
            >
              <Users className="w-3.5 h-3.5 text-brand-green" />
              <span>Form Team</span>
            </button>
          )}

          {issue.type !== ISSUE_TYPES.CIVIC_GOVT && (
            <button
              onClick={handleQuickClaim}
              disabled={isAssigned || hasApplied}
              className={`text-xs py-1.5 px-3 rounded font-mono font-medium transition-colors ${
                isAssigned || hasApplied 
                  ? 'bg-zinc-800 text-zinc-500 border border-zinc-700 cursor-not-allowed'
                  : 'bg-brand-green text-black hover:bg-brand-greenHover'
              }`}
            >
              {isAssigned || hasApplied ? (
                <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Claimed</span>
              ) : (
                <span>{issue.type === ISSUE_TYPES.PAID_GIG ? 'Apply Gig' : 'Claim Task'}</span>
              )}
            </button>
          )}

          <div className="text-zinc-500 group-hover:text-brand-green transition-colors">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

      </div>
    </div>
  );
}
