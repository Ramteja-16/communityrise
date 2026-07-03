import React, { useState, useEffect } from 'react';
import { store, ISSUE_TYPES, ISSUE_STATUS } from '../services/store';
import IssueCard from './IssueCard';
import { Search, Filter, ShieldAlert, Sparkles, DollarSign, Building2, Layers, RefreshCw } from 'lucide-react';

export default function IssueFeed({ onSelectIssue, onFormTeamClick, onOpenPostModal }) {
  const [issues, setIssues] = useState(store.getIssues());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [urgentOnly, setUrgentOnly] = useState(false);

  useEffect(() => {
    return store.subscribe(() => {
      setIssues(store.getIssues());
    });
  }, []);

  const filteredIssues = issues.filter(issue => {
    // Search query matching
    const matchesSearch = 
      issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (issue.requiredSkills && issue.requiredSkills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())));

    // Type matching
    const matchesType = selectedType === 'ALL' || issue.type === selectedType;

    // Status matching
    const matchesStatus = statusFilter === 'ALL' || issue.status === statusFilter;

    // Urgency matching
    const matchesUrgent = !urgentOnly || issue.urgent === true;

    return matchesSearch && matchesType && matchesStatus && matchesUrgent;
  });

  return (
    <section className="py-10 bg-brand-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Feed Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <Layers className="w-6 h-6 text-brand-green" />
              Active City Issues & Opportunities
            </h2>
            <p className="text-xs font-mono text-zinc-400 mt-1">
              Browse paid gigs, volunteer experience roles, or form a team for government-funded civic fixes.
            </p>
          </div>

          <button
            onClick={() => store.resetToDefault()}
            className="btn-outline text-xs py-1.5 px-3 self-start md:self-auto font-mono"
            title="Reset feed to initial demo data"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>
        </div>

        {/* Search Bar & Primary Type Filter Tabs */}
        <div className="space-y-4 mb-8">
          
          {/* Top Search Input */}
          <div className="relative">
            <Search className="w-5 h-5 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search issues by skill (e.g. Electric, React, Django), city location, or issue name..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-11 pr-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-brand-green transition-all"
            />
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-zinc-900/60 p-2 rounded-lg border border-zinc-800">
            
            {/* Left Type Tabs */}
            <div className="flex items-center space-x-1 overflow-x-auto py-1">
              <button
                onClick={() => setSelectedType('ALL')}
                className={`px-3 py-1.5 rounded text-xs font-mono font-medium transition-all ${
                  selectedType === 'ALL'
                    ? 'bg-zinc-800 text-brand-green border border-zinc-700 font-semibold'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                All Issues ({issues.length})
              </button>

              <button
                onClick={() => setSelectedType(ISSUE_TYPES.PAID_GIG)}
                className={`px-3 py-1.5 rounded text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
                  selectedType === ISSUE_TYPES.PAID_GIG
                    ? 'bg-zinc-800 text-white border border-zinc-700 font-semibold'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                <DollarSign className="w-3.5 h-3.5 text-brand-green" />
                Paid Gigs
              </button>

              <button
                onClick={() => setSelectedType(ISSUE_TYPES.VOLUNTEER)}
                className={`px-3 py-1.5 rounded text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
                  selectedType === ISSUE_TYPES.VOLUNTEER
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800 font-semibold'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                Volunteer Roles
              </button>

              <button
                onClick={() => setSelectedType(ISSUE_TYPES.CIVIC_GOVT)}
                className={`px-3 py-1.5 rounded text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
                  selectedType === ISSUE_TYPES.CIVIC_GOVT
                    ? 'bg-amber-950 text-amber-300 border border-amber-800 font-semibold'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                <Building2 className="w-3.5 h-3.5 text-amber-400" />
                Govt Civic Issues
              </button>
            </div>

            {/* Right Urgency & Status Dropdown */}
            <div className="flex items-center gap-3">
              
              {/* Urgent Toggle */}
              <label className="flex items-center gap-2 text-xs font-mono text-zinc-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={urgentOnly}
                  onChange={(e) => setUrgentOnly(e.target.checked)}
                  className="w-4 h-4 accent-emerald-500 rounded bg-zinc-800 border-zinc-700"
                />
                <span className="flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
                  Urgent Only
                </span>
              </label>

              {/* Status Select */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-zinc-900 border border-zinc-700 rounded text-xs text-zinc-300 font-mono py-1.5 px-2.5 focus:outline-none focus:border-brand-green"
              >
                <option value="ALL">Status: All</option>
                <option value={ISSUE_STATUS.OPEN}>Open</option>
                <option value={ISSUE_STATUS.FUNDED}>Govt Funded</option>
                <option value={ISSUE_STATUS.IN_PROGRESS}>In Progress</option>
                <option value={ISSUE_STATUS.RESOLVED}>Resolved</option>
              </select>

            </div>

          </div>

        </div>

        {/* Issue Grid */}
        {filteredIssues.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIssues.map((issue) => (
              <IssueCard
                key={issue.id}
                issue={issue}
                onSelectIssue={onSelectIssue}
                onFormTeamClick={onFormTeamClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-zinc-900/40 rounded-xl border border-zinc-800 space-y-4">
            <Filter className="w-10 h-10 text-zinc-600 mx-auto" />
            <h3 className="text-base font-semibold text-white">No Issues Match Your Filter</h3>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto">
              Try adjusting your search terms or select a different issue category.
            </p>
            <button
              onClick={onOpenPostModal}
              className="btn-primary text-xs py-2 px-4 mx-auto"
            >
              Post the First Issue
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
