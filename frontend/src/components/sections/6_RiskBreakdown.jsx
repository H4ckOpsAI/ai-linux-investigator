import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../common/GlassCard';

export const RiskBreakdown = ({ posture }) => {
  if (!posture) return null;

  const categories = Object.keys(posture).map(key => ({
    label: key.replace('Risk', ''),
    score: posture[key].score
  }));

  return (
    <section className="mb-8">
      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4 px-1">Risk Category Breakdown</h3>
      <GlassCard className="p-8">
        <div className="space-y-8">
          {categories.map((cat, i) => (
            <div key={cat.label}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300 font-semibold uppercase tracking-wider text-sm">{cat.label}</span>
                <span className="text-white font-bold">{cat.score}%</span>
              </div>
              <div className="w-full h-3 bg-surface rounded-full overflow-hidden border border-white/5 relative">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${cat.score}%` }}
                  transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                  className={`h-full absolute top-0 left-0 rounded-full ${
                    cat.score >= 80 ? 'bg-danger shadow-[0_0_10px_rgba(239,68,68,0.5)]' :
                    cat.score >= 60 ? 'bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]' :
                    cat.score >= 40 ? 'bg-warning shadow-[0_0_10px_rgba(245,158,11,0.5)]' :
                    'bg-success shadow-[0_0_10px_rgba(34,197,94,0.5)]'
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </section>
  );
};
