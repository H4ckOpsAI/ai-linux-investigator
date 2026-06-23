import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../common/GlassCard';
import { SeverityBadge } from '../common/SeverityBadge';

export const SecurityPostureSummary = ({ posture }) => {
  if (!posture) return null;

  const getReason = (key, score) => {
    if (score < 40) return "No significant anomalies detected.";
    switch(key) {
      case 'identityRisk': return "Suspicious or unauthorized login activity observed.";
      case 'networkRisk': return "Unknown listeners or risky external connections detected.";
      case 'persistenceRisk': return "Anomalous cron jobs or startup scripts identified.";
      case 'executionRisk': return "High CPU abuse or unauthorized process execution.";
      default: return "Anomalies detected.";
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <section className="mb-8">
      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4 px-1">Security Posture Summary</h3>
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {Object.entries(posture).map(([key, data]) => (
          <GlassCard key={key} className="p-5 flex flex-col justify-between" variant={data.score >= 80 ? 'danger' : 'default'}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-300 font-medium capitalize">
                {key.replace('Risk', ' Risk')}
              </span>
              <SeverityBadge level={data.severity} />
            </div>
            
            <div className="mb-3">
              <span className="text-3xl font-bold text-white">{data.score}</span>
              <span className="text-gray-500 text-sm ml-1">/ 100</span>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed border-t border-white/5 pt-3">
              {getReason(key, data.score)}
            </p>
          </GlassCard>
        ))}
      </motion.div>
    </section>
  );
};
