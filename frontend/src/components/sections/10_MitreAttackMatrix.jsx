import React from 'react';
import { GlassCard } from '../common/GlassCard';
import { Target, Shield, Crosshair } from 'lucide-react';
import { motion } from 'framer-motion';

export const MitreAttackMatrix = ({ mitreTechniques }) => {
  if (!mitreTechniques || mitreTechniques.length === 0) return null;

  return (
    <section>
      <div className="mb-4 px-2">
        <h2 className="text-xl font-bold text-white tracking-tight mb-1 flex items-center gap-2">
          <Crosshair className="w-5 h-5 text-danger" /> MITRE ATT&CK Matrix
        </h2>
        <p className="text-gray-400 text-sm">Threat intelligence mapping derived from active findings.</p>
      </div>

      <div className="bg-surface/20 border border-white/5 rounded-card overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-surface/40">
              <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tactic</th>
              <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Technique</th>
              <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Triggering Finding</th>
              <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Supporting Evidence</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {mitreTechniques.map((mitre, i) => (
              <motion.tr 
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="hover:bg-white/[0.02] transition-colors"
              >
                <td className="py-4 px-6 whitespace-nowrap">
                  <span className="font-bold text-white">{mitre.tactic}</span>
                </td>
                <td className="py-4 px-6 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-xs font-bold bg-white/10 text-gray-300 font-mono">
                      {mitre.techniqueId}
                    </span>
                    <span className="text-sm font-semibold text-danger">{mitre.technique}</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="text-sm text-gray-300">{mitre.triggeringFinding}</div>
                </td>
                <td className="py-4 px-6">
                  <div className="text-xs text-gray-500 font-mono max-w-[400px] truncate" title={mitre.supportingEvidence}>
                    {mitre.supportingEvidence || "No direct evidence extracted"}
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
