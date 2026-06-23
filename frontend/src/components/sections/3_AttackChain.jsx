import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../common/GlassCard';
import { LogIn, Clock, Radio, Cpu, AlertTriangle } from 'lucide-react';

const icons = {
  "Initial Access": LogIn,
  "Persistence": Clock,
  "Command & Control": Radio,
  "Execution": Cpu,
  "Impact": AlertTriangle
};

const getTriggerContext = (stage, findings) => {
  if (!findings) return null;
  const fstr = (f) => JSON.stringify(f).toLowerCase();
  let match = null;
  if (stage === "Initial Access") match = findings.find(f => fstr(f).includes('login') || fstr(f).includes('ssh') || fstr(f).includes('access'));
  else if (stage === "Persistence") match = findings.find(f => fstr(f).includes('cron') || fstr(f).includes('persist'));
  else if (stage === "Command & Control") match = findings.find(f => fstr(f).includes('nc ') || fstr(f).includes('listen') || fstr(f).includes('port'));
  else if (stage === "Execution") match = findings.find(f => fstr(f).includes('process') || fstr(f).includes('miner') || fstr(f).includes('malware'));
  else if (stage === "Impact") match = findings.find(f => fstr(f).includes('cpu') || fstr(f).includes('impact') || fstr(f).includes('mining'));

  return match ? (match.description || match.type) : null;
};

export const AttackChain = ({ attackChain, findings }) => {
  if (!attackChain || attackChain.length === 0) return null;

  return (
    <section>
      <div className="mb-4 px-2">
        <h2 className="text-xl font-bold text-white tracking-tight mb-1">Kill Chain Analysis</h2>
      </div>

      <div className="relative p-6 bg-surface/20 border border-white/5 rounded-card">
        <div className="flex flex-col xl:flex-row items-stretch justify-between gap-4 relative z-10 w-full overflow-x-auto hide-scrollbar">
          
          <div className="hidden xl:block absolute top-8 left-10 right-10 h-0.5 bg-surface border-y border-white/5 z-0">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="h-full bg-danger/50"
            />
          </div>

          {attackChain.map((step, index) => {
            const Icon = icons[step.stage] || AlertTriangle;
            const isActive = step.active;
            const triggerContext = getTriggerContext(step.stage, findings);
            
            return (
              <GlassCard 
                key={step.stage}
                variant={isActive ? 'danger' : 'default'}
                className={`relative z-10 flex-1 min-w-[240px] p-4 flex flex-col transition-all duration-300 ${
                  isActive ? 'border-danger/30 bg-background/80' : 'opacity-60 bg-surface/50 border-white/5'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded flex items-center justify-center shrink-0 ${
                    isActive ? 'bg-danger/20 text-danger' : 'bg-surface border border-white/10 text-gray-500'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className={`text-sm font-bold ${isActive ? 'text-white' : 'text-gray-400'}`}>
                      {step.stage}
                    </h3>
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${
                      isActive ? 'text-danger' : 'text-gray-600'
                    }`}>
                      {isActive ? 'Detected' : 'Monitoring'}
                    </span>
                  </div>
                </div>
                
                {isActive && triggerContext && (
                  <div className="mt-auto pt-3 border-t border-white/5">
                    <p className="text-xs text-gray-300 leading-snug line-clamp-2" title={triggerContext}>
                      <span className="text-gray-500 font-semibold mr-1">Trigger:</span>
                      {triggerContext}
                    </p>
                  </div>
                )}
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};
