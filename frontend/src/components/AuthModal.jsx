import React, { useState } from 'react';
import { store, USER_ROLES } from '../services/store';
import { X, User, Building2, Sparkles, Code, Check, Save } from 'lucide-react';

export default function AuthModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [user, setUser] = useState(store.getUser());
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [skills, setSkills] = useState(user.skills.join(', '));

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const skillsArray = skills.split(',').map(s => s.trim()).filter(Boolean);
    store.updateUserProfile({ name, email, skills: skillsArray });
    onClose();
  };

  const selectPersona = (role, personaName, personaEmail, personaSkills) => {
    store.setUserRole(role);
    store.updateUserProfile({
      name: personaName,
      email: personaEmail,
      skills: personaSkills
    });
    setUser(store.getUser());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-zinc-900 border border-zinc-700 w-full max-w-lg rounded-xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-950">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">Account & Role Management</h3>
            <p className="text-xs text-zinc-400">Switch persona or update user credentials.</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-zinc-400 hover:text-white rounded-md hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preset Quick Personas */}
        <div className="p-6 space-y-5 text-sm overflow-y-auto max-h-[80vh]">
          
          <div>
            <label className="text-xs font-mono text-zinc-400 uppercase block mb-2">Switch Quick Persona Preset</label>
            <div className="grid grid-cols-2 gap-2">
              
              <button
                type="button"
                onClick={() => selectPersona(USER_ROLES.WORKER_VOLUNTEER, 'Samir Ramteke', 'samir@communityrise.org', ['React', 'Django', 'Electrical Safety', 'Teamwork'])}
                className={`p-2.5 rounded border text-left flex items-center justify-between text-xs transition-colors ${
                  user.activeRole === USER_ROLES.WORKER_VOLUNTEER ? 'bg-emerald-950 border-emerald-700 text-emerald-300 font-bold' : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <div>
                    <div>Skilled Worker</div>
                    <div className="text-[10px] text-zinc-400 font-normal">Samir Ramteke</div>
                  </div>
                </div>
                {user.activeRole === USER_ROLES.WORKER_VOLUNTEER && <Check className="w-3.5 h-3.5 text-brand-green" />}
              </button>

              <button
                type="button"
                onClick={() => selectPersona(USER_ROLES.GOVT_OFFICIAL, 'Director Vance', 'vance@citygov.gov', ['Municipal Grants', 'Civic Safety', 'Disaster Relief'])}
                className={`p-2.5 rounded border text-left flex items-center justify-between text-xs transition-colors ${
                  user.activeRole === USER_ROLES.GOVT_OFFICIAL ? 'bg-amber-950 border-amber-700 text-amber-300 font-bold' : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-amber-400" />
                  <div>
                    <div>Govt Official</div>
                    <div className="text-[10px] text-zinc-400 font-normal">Director Vance</div>
                  </div>
                </div>
                {user.activeRole === USER_ROLES.GOVT_OFFICIAL && <Check className="w-3.5 h-3.5 text-brand-green" />}
              </button>

              <button
                type="button"
                onClick={() => selectPersona(USER_ROLES.CITIZEN, 'Sarah Jenkins', 'sarah@community.org', ['Community Lead', 'Urban Planning'])}
                className={`p-2.5 rounded border text-left flex items-center justify-between text-xs transition-colors ${
                  user.activeRole === USER_ROLES.CITIZEN ? 'bg-zinc-800 border-zinc-600 text-white font-bold' : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-zinc-400" />
                  <div>
                    <div>Citizen Poster</div>
                    <div className="text-[10px] text-zinc-400 font-normal">Sarah Jenkins</div>
                  </div>
                </div>
                {user.activeRole === USER_ROLES.CITIZEN && <Check className="w-3.5 h-3.5 text-brand-green" />}
              </button>

              <button
                type="button"
                onClick={() => selectPersona(USER_ROLES.ADMIN_DEV, 'Dev Superadmin', 'admin@django.api', ['Django REST', 'System Analytics'])}
                className={`p-2.5 rounded border text-left flex items-center justify-between text-xs transition-colors ${
                  user.activeRole === USER_ROLES.ADMIN_DEV ? 'bg-purple-950 border-purple-700 text-purple-300 font-bold' : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Code className="w-4 h-4 text-purple-400" />
                  <div>
                    <div>Admin / Dev</div>
                    <div className="text-[10px] text-zinc-400 font-normal">Superadmin</div>
                  </div>
                </div>
                {user.activeRole === USER_ROLES.ADMIN_DEV && <Check className="w-3.5 h-3.5 text-brand-green" />}
              </button>

            </div>
          </div>

          {/* Edit Profile Form */}
          <form onSubmit={handleSaveProfile} className="space-y-4 pt-4 border-t border-zinc-800">
            <div className="text-xs font-mono text-zinc-400 uppercase">Edit Profile Details</div>

            <div>
              <label className="text-xs font-mono text-zinc-400 block mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-1.5 text-white"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-zinc-400 block mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-1.5 text-white"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-zinc-400 block mb-1">Your Skills (Comma separated)</label>
              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-1.5 text-white font-mono text-xs"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary text-xs py-1.5 px-4"
              >
                Close
              </button>
              <button
                type="submit"
                className="btn-primary text-xs py-1.5 px-4"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </form>

        </div>

      </div>
    </div>
  );
}
