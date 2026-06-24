import React from 'react';
import { GlassCard } from '../common/GlassCard';
import { SeverityBadge } from '../common/SeverityBadge';
import { AlertCircle, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

export const FindingsExplorer = ({ findings, onEvidenceJump, onEntityClick }) => {
  if (!findings || findings.length === 0) {
    return (
      <section>
        <div className="mb-8 px-2">
          <h2 className="text-3xl font-bold text-white tracking-tight mb-2">Investigation Case Notes</h2>
        </div>
        <GlassCard className="p-12 text-center border border-white/5 bg-surface/20">
          <p className="text-xl text-gray-500">No high-confidence findings detected.</p>
        </GlassCard>
      </section>
    );
  }

  // Helper to guess evidence category based on finding type
  const guessCategory = (type) => {
    const t = type.toLowerCase();
    if (t.includes('process')) return 'processes';
    if (t.includes('network') || t.includes('listen')) return 'network_activity';
    if (t.includes('login')) return 'login_activity';
    if (t.includes('cron') || t.includes('persistence')) return 'cron_jobs';
    return 'processes';
  };

  return (
    <section>
      <div className="mb-8 px-2">
        <h2 className="text-3xl font-bold text-white tracking-tight mb-2">Investigation Case Notes</h2>
        <p className="text-gray-400 text-lg">Detailed forensic findings and context.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {findings.map((finding, idx) => {
          const contextKeys = Object.keys(finding).filter(k => !['severity', 'type', 'description'].includes(k));
          const targetCategory = guessCategory(finding.type);
          
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <GlassCard className="h-full flex flex-col overflow-hidden" variant="default">
                {/* Header */}
                <div className="p-8 border-b border-white/5 bg-surface/30">
                  <div className="flex justify-between items-start mb-4">
                    <SeverityBadge level={finding.severity?.toLowerCase()} />
                    <span className="text-sm font-mono text-gray-500">ID: FND-{idx.toString().padStart(4, '0')}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white leading-tight mb-3">{finding.type}</h3>
                  {finding.mitre && finding.mitre.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {finding.mitre.map((m, i) => (
                        <div key={i} className="flex items-center gap-1.5 px-2.5 py-1 bg-white/5 border border-white/10 rounded-md">
                          <span className="text-xs font-bold text-gray-400">{m.tactic}</span>
                          <span className="text-gray-600">|</span>
                          <span className="text-xs font-mono text-danger font-bold">{m.techniqueId}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Body */}
                <div className="p-8 flex-1 flex flex-col gap-8">
                  <div>
                    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" /> What Happened
                    </h4>
                    <p className="text-lg text-gray-200 leading-relaxed">
                      {finding.description}
                    </p>
                  </div>

                  {contextKeys.length > 0 && (
                    <div className="mt-auto pt-6 border-t border-white/5">
                      <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Supporting Evidence</h4>
                      <div className="grid grid-cols-2 gap-4">
                        {contextKeys.map(k => (
                          <div 
                            key={k} 
                            onClick={() => onEvidenceJump(targetCategory, String(finding[k]))}
                            className="bg-background/50 rounded-lg p-4 border border-white/5 hover:border-primary/50 hover:bg-primary/5 cursor-pointer transition-colors group relative"
                            title="Jump to Evidence Explorer"
                          >
                            <ExternalLink className="w-4 h-4 text-primary absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{k}</div>
                            <div 
                              className="text-base text-gray-200 font-mono break-all group-hover:text-primary transition-colors inline-block"
                              onClick={(e) => {
                                e.stopPropagation(); // prevent jumping to evidence if we just want to pivot
                                onEntityClick(k.includes('ip') ? 'IP Address' : k.includes('user') ? 'User' : 'Entity', String(finding[k]));
                              }}
                            >
                              <span className="border-b border-dashed border-gray-600 hover:border-primary hover:text-primary pb-0.5">
                                {String(finding[k])}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
