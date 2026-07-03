import React, { useState, useEffect } from 'react';
import { store, USER_ROLES } from '../services/store';
import { Building2, User, Shield, Code, PlusCircle, LogIn, Sparkles, ChevronDown, Check, LayoutDashboard, Compass } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenPostModal, onOpenAuthModal }) {
  const [user, setUser] = useState(store.getUser());
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  useEffect(() => {
    return store.subscribe(() => {
      setUser(store.getUser());
    });
  }, []);

  const handleRoleChange = (role) => {
    store.setUserRole(role);
    setRoleDropdownOpen(false);
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case USER_ROLES.CITIZEN:
        return { label: 'Citizen Poster', icon: User, color: 'bg-zinc-800 text-zinc-200 border-zinc-700' };
      case USER_ROLES.WORKER_VOLUNTEER:
        return { label: 'Worker / Volunteer', icon: Sparkles, color: 'bg-emerald-950 text-emerald-300 border-emerald-700' };
      case USER_ROLES.GOVT_OFFICIAL:
        return { label: 'Govt Official', icon: Building2, color: 'bg-amber-950 text-amber-300 border-amber-700' };
      case USER_ROLES.ADMIN_DEV:
        return { label: 'Admin / Developer', icon: Code, color: 'bg-purple-950 text-purple-300 border-purple-700' };
      default:
        return { label: 'Guest', icon: User, color: 'bg-zinc-800 text-zinc-400 border-zinc-700' };
    }
  };

  const currentBadge = getRoleBadge(user.activeRole);
  const BadgeIcon = currentBadge.icon;

  return (
    <header className="sticky top-0 z-40 bg-brand-black/90 backdrop-blur-md border-b border-brand-border transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand Name */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('explore')}>
            <div className="w-9 h-9 bg-brand-green text-black font-extrabold text-xl flex items-center justify-center rounded-md shadow-sm">
              CR
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                Community Rise
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 bg-zinc-800 text-brand-green border border-zinc-700 rounded">
                  v1.0
                </span>
              </span>
              <p className="text-[11px] text-zinc-400 hidden sm:block">Empower Skills • Resolve Civic Issues • Govt Funded</p>
            </div>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => setActiveTab('explore')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                activeTab === 'explore' 
                  ? 'bg-zinc-800 text-brand-green font-semibold border border-zinc-700' 
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <Compass className="w-4 h-4" />
              Explore Feed
            </button>

            <button
              onClick={() => setActiveTab('how-it-works')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'how-it-works' 
                  ? 'bg-zinc-800 text-brand-green font-semibold border border-zinc-700' 
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              How It Works
            </button>

            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                activeTab === 'dashboard' 
                  ? 'bg-zinc-800 text-brand-green font-semibold border border-zinc-700' 
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </button>
          </nav>

          {/* Right Side Actions & Role Switcher */}
          <div className="flex items-center gap-3">
            
            {/* Post Issue Button */}
            <button
              onClick={onOpenPostModal}
              className="btn-primary text-xs sm:text-sm py-1.5 px-3"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Report / Post Issue</span>
            </button>

            {/* Role Switcher Pill Dropdown */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md border text-xs font-mono font-medium transition-all ${currentBadge.color}`}
                title="Switch active user role"
              >
                <BadgeIcon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{currentBadge.label}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-zinc-900 border border-zinc-700 rounded-lg shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1.5 text-[11px] font-mono text-zinc-400 border-b border-zinc-800 uppercase tracking-wider">
                    Select Active Persona
                  </div>

                  <button
                    onClick={() => handleRoleChange(USER_ROLES.CITIZEN)}
                    className="w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-zinc-800 text-zinc-200 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-zinc-400" />
                      <div>
                        <div className="font-semibold">Citizen / Poster</div>
                        <div className="text-[10px] text-zinc-400">Post issues & hire help</div>
                      </div>
                    </div>
                    {user.activeRole === USER_ROLES.CITIZEN && <Check className="w-4 h-4 text-brand-green" />}
                  </button>

                  <button
                    onClick={() => handleRoleChange(USER_ROLES.WORKER_VOLUNTEER)}
                    className="w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-zinc-800 text-zinc-200 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      <div>
                        <div className="font-semibold">Worker / Volunteer</div>
                        <div className="text-[10px] text-zinc-400">Claim tasks & build skills</div>
                      </div>
                    </div>
                    {user.activeRole === USER_ROLES.WORKER_VOLUNTEER && <Check className="w-4 h-4 text-brand-green" />}
                  </button>

                  <button
                    onClick={() => handleRoleChange(USER_ROLES.GOVT_OFFICIAL)}
                    className="w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-zinc-800 text-zinc-200 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-amber-400" />
                      <div>
                        <div className="font-semibold font-mono">Govt Official</div>
                        <div className="text-[10px] text-zinc-400">Approve civic funding</div>
                      </div>
                    </div>
                    {user.activeRole === USER_ROLES.GOVT_OFFICIAL && <Check className="w-4 h-4 text-brand-green" />}
                  </button>

                  <button
                    onClick={() => handleRoleChange(USER_ROLES.ADMIN_DEV)}
                    className="w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-zinc-800 text-zinc-200 transition-colors border-t border-zinc-800 mt-1 pt-2"
                  >
                    <div className="flex items-center gap-2">
                      <Code className="w-4 h-4 text-purple-400" />
                      <div>
                        <div className="font-semibold font-mono">Admin / Developer</div>
                        <div className="text-[10px] text-zinc-400">Django API & System Stats</div>
                      </div>
                    </div>
                    {user.activeRole === USER_ROLES.ADMIN_DEV && <Check className="w-4 h-4 text-brand-green" />}
                  </button>
                </div>
              )}
            </div>

            {/* Login Account Trigger */}
            <button
              onClick={onOpenAuthModal}
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors"
              title="User Profile & Auth Options"
            >
              <LogIn className="w-4 h-4" />
            </button>

          </div>
        </div>
      </div>
    </header>
  );
}
