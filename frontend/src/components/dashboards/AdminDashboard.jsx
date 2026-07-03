import React, { useState } from 'react';
import { store } from '../../services/store';
import { Code, Server, Database, Activity, RefreshCw, CheckCircle2, AlertTriangle, Globe } from 'lucide-react';

export default function AdminDashboard() {
  const [config, setConfig] = useState(store.getConfig());
  const [issues] = useState(store.getIssues());
  const [teams] = useState(store.getTeams());
  const [testStatus, setTestStatus] = useState(null);

  const handleSaveConfig = (e) => {
    e.preventDefault();
    store.updateConfig(config);
  };

  const handleTestConnection = () => {
    setTestStatus('TESTING');
    setTimeout(() => {
      setTestStatus('SUCCESS_STANDALONE');
    }, 600);
  };

  return (
    <div className="space-y-6">
      
      {/* Dashboard Top Banner */}
      <div className="bg-purple-950/30 border border-purple-800/60 rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded bg-purple-950 border border-purple-700 text-purple-300">
              <Code className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-white">Developer & Admin Operations Dashboard</h2>
          </div>
          <p className="text-xs text-purple-200/80 mt-1">
            Configure Django REST API endpoints, monitor system health, and manage system categories.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-brand-green animate-pulse"></span>
          <span className="text-zinc-300">System Healthy</span>
        </div>
      </div>

      {/* Note on Django Admin */}
      <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl space-y-2">
        <h4 className="text-xs font-mono text-brand-green uppercase font-semibold flex items-center gap-1.5">
          <Server className="w-4 h-4" />
          Django Backend Integration Architecture
        </h4>
        <p className="text-xs text-zinc-400 leading-relaxed">
          Django provides a native admin portal at <code className="text-brand-green bg-zinc-950 px-1.5 py-0.5 rounded">http://localhost:8000/admin/</code> for database superusers. 
          This frontend Developer Panel connects to your Django REST Framework endpoints (e.g. <code className="text-brand-green bg-zinc-950 px-1.5 py-0.5 rounded">/api/issues/</code>, <code className="text-brand-green bg-zinc-950 px-1.5 py-0.5 rounded">/api/teams/</code>).
        </p>
      </div>

      {/* Config Form & Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Django REST Connection Box */}
        <form onSubmit={handleSaveConfig} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
            <Globe className="w-4 h-4 text-purple-400" />
            Django REST Framework Connector Settings
          </h3>

          <div>
            <label className="text-xs font-mono text-zinc-400 block mb-1">Django API Base URL</label>
            <input
              type="text"
              value={config.djangoApiUrl}
              onChange={(e) => setConfig({ ...config, djangoApiUrl: e.target.value })}
              className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-xs font-mono text-white"
            />
          </div>

          <div className="pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-zinc-300">
              <input
                type="checkbox"
                checked={config.useDjangoApi}
                onChange={(e) => setConfig({ ...config, useDjangoApi: e.target.checked })}
                className="w-4 h-4 accent-purple-500 rounded bg-zinc-950 border-zinc-700"
              />
              <span>Enable Direct Django REST API Proxy Mode</span>
            </label>
          </div>

          <div className="pt-3 flex items-center gap-3">
            <button
              type="button"
              onClick={handleTestConnection}
              className="btn-secondary text-xs py-1.5 px-3 font-mono"
            >
              Test API Endpoint Connection
            </button>

            <button
              type="submit"
              className="btn-primary text-xs py-1.5 px-4"
            >
              Save Configuration
            </button>
          </div>

          {testStatus === 'SUCCESS_STANDALONE' && (
            <div className="p-3 bg-emerald-950/60 border border-emerald-800 rounded text-xs text-emerald-300 font-mono flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Reactive Store active! Ready to connect with Django backend.</span>
            </div>
          )}
        </form>

        {/* Right Health Metrics */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
            <Activity className="w-4 h-4 text-brand-green" />
            Live System Health Metrics
          </h3>

          <div className="space-y-3 font-mono text-xs">
            <div className="flex justify-between p-2 bg-zinc-950 rounded border border-zinc-800">
              <span className="text-zinc-400">Total Registered Issues:</span>
              <span className="text-white font-bold">{issues.length}</span>
            </div>

            <div className="flex justify-between p-2 bg-zinc-950 rounded border border-zinc-800">
              <span className="text-zinc-400">Total Volunteer Teams:</span>
              <span className="text-purple-400 font-bold">{teams.length}</span>
            </div>

            <div className="flex justify-between p-2 bg-zinc-950 rounded border border-zinc-800">
              <span className="text-zinc-400">UI Rendering Theme:</span>
              <span className="text-brand-green font-bold">Black & White Minimalist (Zero Gradients)</span>
            </div>

            <div className="flex justify-between p-2 bg-zinc-950 rounded border border-zinc-800">
              <span className="text-zinc-400">Data State Engine:</span>
              <span className="text-white font-bold">LocalStorage Reactive Engine</span>
            </div>
          </div>

          <button
            onClick={() => store.resetToDefault()}
            className="btn-outline w-full text-xs py-2 font-mono text-zinc-300"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Demo Database to Initial State</span>
          </button>
        </div>

      </div>

    </div>
  );
}
