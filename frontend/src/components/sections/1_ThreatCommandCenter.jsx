import React from 'react';
import { Activity, AlertOctagon, CheckCircle2, ShieldAlert, Target, Search } from 'lucide-react';
import { GlassCard } from '../common/GlassCard';

export const ThreatCommandCenter = ({ posture, isRunning, onRun, evidence, aiAnalysis }) => {
  if (!posture) return null;

  const scores = Object.values(posture).map(p => p.score);
  const maxScore = Math.max(...scores, 0);
  const isCritical = maxScore >= 80;

  return (
    <section className="relative w-full border-b border-white/10 mb-12 bg-surface/30">
      <div className={`absolute inset-0 opacity-10 pointer-events-none transition-colors duration-1000 ${isCritical ? 'bg-gradient-to-b from-danger/40 to-transparent' : 'bg-gradient-to-b from-success/40 to-transparent'}`}></div>

      <div className="max-w-[1600px] mx-auto px-6 py-12 relative z-10 flex flex-col xl:flex-row gap-8 justify-between items-start xl:items-center">
        
        {/* Left Content - Compact Snapshot */}
        <div className="flex-1 w-full">
          <div className="flex items-center gap-3 mb-4">
            {isCritical ? (
              <div className="flex items-center gap-2 px-3 py-1 bg-danger/10 border border-danger/30 rounded text-danger font-bold tracking-widest text-xs uppercase">
                <AlertOctagon className="w-4 h-4" /> Active Incident
              </div>
            ) : (
              <div className="flex items-center gap-2 px-3 py-1 bg-success/10 border border-success/30 rounded text-success font-bold tracking-widest text-xs uppercase">
                <CheckCircle2 className="w-4 h-4" /> Normal Telemetry
              </div>
            )}
            <div className="px-3 py-1 bg-surface border border-white/10 rounded text-gray-400 font-semibold tracking-widest text-xs uppercase">
              Env: Production
            </div>
          </div>

          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
            Investigation Snapshot
          </h1>
          <p className="text-base text-gray-400 max-w-2xl mb-6">
            {isCritical 
              ? "Immediate triage required. High-confidence indicators of compromise identified in the latest telemetry scan."
              : "Continuous monitoring active. No critical indicators identified."}
          </p>

          <div className="flex flex-wrap gap-4">
            <GlassCard className="px-4 py-3 flex items-center gap-4 w-48">
              <ShieldAlert className="w-6 h-6 text-danger" />
              <div>
                <div className="text-xs text-gray-500 uppercase font-bold tracking-wider">Risk Level</div>
                <div className="text-lg text-white font-mono font-bold">{isCritical ? 'CRITICAL' : 'LOW'}</div>
              </div>
            </GlassCard>
            <GlassCard className="px-4 py-3 flex items-center gap-4 w-48">
              <Target className="w-6 h-6 text-primary" />
              <div>
                <div className="text-xs text-gray-500 uppercase font-bold tracking-wider">Top Vector</div>
                <div className="text-sm text-white font-bold truncate">Execution / C2</div>
              </div>
            </GlassCard>
            <GlassCard className="px-4 py-3 flex items-center gap-4 w-48">
              <Search className="w-6 h-6 text-secondary" />
              <div>
                <div className="text-xs text-gray-500 uppercase font-bold tracking-wider">Status</div>
                <div className="text-sm text-white font-bold">Awaiting Analyst</div>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Right Content - Compact Controls */}
        <div className="w-full xl:w-auto flex items-center gap-6 shrink-0 bg-background/50 p-6 rounded-2xl border border-white/5">
          <div className="flex flex-col items-end text-right">
            <span className="text-gray-500 uppercase tracking-widest font-bold text-xs mb-1">Max Threat Score</span>
            <span className={`text-6xl font-black tracking-tighter leading-none ${isCritical ? 'text-danger' : 'text-success'}`}>
              {maxScore}
            </span>
          </div>

          <button
            onClick={onRun}
            disabled={isRunning}
            className={`w-full py-4 rounded-xl font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2 ${
              isRunning 
                ? 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/10'
                : 'bg-primary hover:bg-primary/90 text-white shadow-lg hover:-translate-y-0.5'
            }`}
          >
            <Activity className="w-5 h-5" />
            {isRunning ? 'Analyzing...' : 'Run Scan'}
          </button>

          {/* Engine Status Panel */}
          <div className="w-full mt-4 pt-4 border-t border-white/5 flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500 font-semibold">Engine Core</span>
              <span className="text-success font-mono font-bold flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse"></span>ONLINE</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500 font-semibold">Host Sensor</span>
              <span className={evidence ? "text-success font-mono font-bold" : "text-warning font-mono font-bold"}>
                {evidence ? 'ONLINE' : 'PENDING'}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500 font-semibold">AI Analysis</span>
              <span className={aiAnalysis ? "text-success font-mono font-bold" : "text-warning font-mono font-bold"}>
                {aiAnalysis ? 'ONLINE' : 'PENDING'}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs mt-1 pt-2 border-t border-white/5">
              <span className="text-gray-500 font-semibold">Last Update</span>
              <span className="text-gray-400 font-mono">{new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
