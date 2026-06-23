import React from 'react';
import { Shield, Activity, RefreshCw } from 'lucide-react';

/**
 * TopNav - Premium SaaS header for the investigation workspace.
 * @param {boolean} isRunning - Investigation status
 * @param {function} onRunInvestigation - Callback to trigger analysis
 */
export const TopNav = ({ isRunning, onRunInvestigation }) => {
  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-xl bg-background/80 border-b border-white/10">
      <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Brand & Logo */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/20 rounded-lg border border-primary/30">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-white leading-tight">AI Linux Investigator</h1>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
              </span>
              <span className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">System Active</span>
            </div>
          </div>
        </div>

        {/* Status & Actions */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Activity className="w-4 h-4" />
            <span>Last Scan: Just now</span>
          </div>
          <button
            onClick={onRunInvestigation}
            disabled={isRunning}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-btn font-medium text-sm transition-all duration-300
              ${isRunning 
                ? 'bg-surface border-white/10 text-gray-500 cursor-not-allowed' 
                : 'bg-primary hover:bg-primary/90 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)] hover:shadow-[0_0_25px_rgba(99,102,241,0.6)]'
              }
            `}
          >
            <RefreshCw className={`w-4 h-4 ${isRunning ? 'animate-spin' : ''}`} />
            {isRunning ? 'Analyzing Data...' : 'Run Investigation'}
          </button>
        </div>
      </div>
    </nav>
  );
};
