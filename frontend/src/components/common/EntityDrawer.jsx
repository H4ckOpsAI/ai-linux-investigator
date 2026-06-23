import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Activity, Network, Users } from 'lucide-react';
import { SeverityBadge } from './SeverityBadge';

export const EntityDrawer = ({ isOpen, onClose, entity, findings, evidence }) => {
  if (!isOpen || !entity) return null;

  // Derive related findings
  const relatedFindings = findings?.filter(f => 
    JSON.stringify(f).toLowerCase().includes(entity.value.toLowerCase())
  ) || [];

  // Derive related evidence
  const relatedEvidence = [];
  if (evidence) {
    Object.keys(evidence).forEach(category => {
      evidence[category]?.forEach(record => {
        if (JSON.stringify(record).toLowerCase().includes(entity.value.toLowerCase())) {
          relatedEvidence.push({ category, record });
        }
      });
    });
  }

  // Calculate generic risk based on finding involvement
  let risk = "LOW";
  if (relatedFindings.some(f => f.severity === 'CRITICAL')) risk = "CRITICAL";
  else if (relatedFindings.some(f => f.severity === 'HIGH')) risk = "HIGH";
  else if (relatedFindings.some(f => f.severity === 'MEDIUM')) risk = "MEDIUM";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end pointer-events-none">
        
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
          onClick={onClose}
        />

        {/* Drawer */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-lg h-full bg-surface border-l border-white/10 shadow-2xl flex flex-col pointer-events-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10 bg-surface/50">
            <div>
              <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1 flex items-center gap-2">
                <Search className="w-3 h-3" /> Entity Details
              </div>
              <h2 className="text-2xl font-bold text-white font-mono break-all pr-4">{entity.value}</h2>
            </div>
            <button 
              onClick={onClose}
              className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {/* Meta */}
            <div className="flex items-center justify-between bg-background/50 p-4 rounded-lg border border-white/5">
              <div>
                <span className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Type</span>
                <span className="text-base text-gray-200 font-semibold">{entity.type}</span>
              </div>
              <div className="text-right">
                <span className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Derived Risk</span>
                <SeverityBadge level={risk.toLowerCase()} />
              </div>
            </div>

            {/* Related Findings */}
            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 border-b border-white/5 pb-2">
                Related Findings ({relatedFindings.length})
              </h3>
              {relatedFindings.length > 0 ? (
                <div className="space-y-3">
                  {relatedFindings.map((f, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold text-white">{f.type}</span>
                        <SeverityBadge level={f.severity?.toLowerCase()} />
                      </div>
                      <p className="text-sm text-gray-400">{f.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 italic">No findings directly associated with this entity.</p>
              )}
            </div>

            {/* Related Evidence */}
            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 border-b border-white/5 pb-2">
                Related Telemetry ({relatedEvidence.length})
              </h3>
              {relatedEvidence.length > 0 ? (
                <div className="space-y-3">
                  {relatedEvidence.map((e, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-lg">
                      <div className="text-xs font-bold text-primary uppercase tracking-widest mb-2">{e.category}</div>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(e.record).slice(0, 4).map(([k, v]) => (
                          <div key={k} className="flex flex-col">
                            <span className="text-[10px] text-gray-500 uppercase">{k}</span>
                            <span className="text-xs text-gray-300 font-mono truncate">{String(v)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 italic">No raw telemetry associated with this entity.</p>
              )}
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
