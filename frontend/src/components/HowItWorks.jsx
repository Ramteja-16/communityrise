import React from 'react';
import { DollarSign, HeartHandshake, Building2, Users, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function HowItWorks() {
  return (
    <section className="py-16 bg-brand-black border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-mono text-brand-green uppercase tracking-widest mb-3">Our Core Mission & Workflow</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How Community Rise Solves Real-World Problems
          </h3>
          <p className="text-zinc-400 mt-4 text-base">
            We bridge the gap between skilled workers seeking work, citizens who need help, 
            and government bodies funding civic emergency teams.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Pillar 1: Paid Gigs & Skilled Work */}
          <div className="card-minimal flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-white mb-6">
                <DollarSign className="w-6 h-6 text-brand-green" />
              </div>
              <span className="text-xs font-mono text-brand-green uppercase">Pillar 1</span>
              <h4 className="text-xl font-bold text-white mt-1 mb-3">Paid Gigs & Skilled Work</h4>
              <p className="text-zinc-400 text-sm leading-relaxed">
                People or small organizations post paid jobs (e.g. web development, electrical repair, design, plumbing). Skilled people claim the job, get paid fairly, and gain ratings.
              </p>
            </div>
            <ul className="mt-6 pt-6 border-t border-zinc-800 space-y-2 text-xs text-zinc-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" />
                <span>Direct payout & contract options</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" />
                <span>Fair skill matching system</span>
              </li>
            </ul>
          </div>

          {/* Pillar 2: Volunteer & Experience */}
          <div className="card-minimal flex flex-col justify-between border-brand-green/30">
            <div>
              <div className="w-12 h-12 rounded-lg bg-emerald-950/60 border border-emerald-800/80 flex items-center justify-center text-emerald-400 mb-6">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono text-emerald-400 uppercase">Pillar 2</span>
              <h4 className="text-xl font-bold text-white mt-1 mb-3">Volunteer & Experience</h4>
              <p className="text-zinc-400 text-sm leading-relaxed">
                People wanting experience offer free/volunteer services to community centers & non-profits. Log verified volunteer hours and earn downloadable work credentials.
              </p>
            </div>
            <ul className="mt-6 pt-6 border-t border-zinc-800 space-y-2 text-xs text-zinc-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" />
                <span>Build verified portfolio & resume badges</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" />
                <span>Free community help for local NGOs</span>
              </li>
            </ul>
          </div>

          {/* Pillar 3: Govt-Funded Volunteer Teams */}
          <div className="card-minimal flex flex-col justify-between border-amber-900/40">
            <div>
              <div className="w-12 h-12 rounded-lg bg-amber-950/60 border border-amber-800/80 flex items-center justify-center text-amber-400 mb-6">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono text-amber-400 uppercase">Pillar 3</span>
              <h4 className="text-xl font-bold text-white mt-1 mb-3">Govt-Funded Volunteer Teams</h4>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Major city issues (like pole collapse, water line leaks) cannot be solved by 1 person. Volunteers form <strong>Teams</strong>, submit reports, and <strong>Govt Officials grant official funds</strong> to complete the fix.
              </p>
            </div>
            <ul className="mt-6 pt-6 border-t border-zinc-800 space-y-2 text-xs text-zinc-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" />
                <span>Team formation for emergency fixes</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" />
                <span>Government grant & municipal funding</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Real Example Focus Box */}
        <div className="mt-12 p-6 bg-zinc-900 border border-zinc-800 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-950 border border-amber-800 rounded-lg shrink-0">
              <ShieldAlert className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h5 className="text-base font-bold text-white">Why Government Integration is Essential</h5>
              <p className="text-xs text-zinc-400 mt-1 max-w-2xl">
                When a street light or electric pole collapses, individual citizens cannot handle it due to danger and equipment costs.
                Through Community Rise, citizens alert the city, volunteers register as an execution crew, and the municipal body provides the budget directly.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-brand-green shrink-0">
            <Users className="w-4 h-4" />
            <span>Power in Unity & Govt Action</span>
          </div>
        </div>

      </div>
    </section>
  );
}
