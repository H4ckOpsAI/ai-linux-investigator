import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

export const AttackTimeline = ({ timeline }) => {
  if (!timeline || timeline.length === 0) return null;

  return (
    <section>
      <div className="mb-4 px-2">
        <h2 className="text-xl font-bold text-white tracking-tight mb-1">Event Sequence</h2>
      </div>

      <div className="bg-surface/20 border border-white/5 rounded-card overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-surface/40">
              <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider w-24">Order</th>
              <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider w-48">Event Type</th>
              <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Telemetry Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {timeline.map((event, i) => (
              <motion.tr 
                key={event.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="hover:bg-white/[0.02] transition-colors group"
              >
                <td className="py-3 px-6 whitespace-nowrap">
                  <div className="flex items-center gap-2 text-gray-500 font-mono text-xs">
                    <Clock className="w-3 h-3" />
                    T0+{event.order}
                  </div>
                </td>
                <td className="py-3 px-6 whitespace-nowrap">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-danger/10 text-danger uppercase tracking-wide border border-danger/20">
                    {event.type}
                  </span>
                </td>
                <td className="py-3 px-6">
                  <div className="text-sm font-semibold text-gray-200 mb-0.5">{event.title}</div>
                  <div className="text-xs text-gray-500 truncate max-w-[500px] xl:max-w-[800px] group-hover:text-gray-300 transition-colors">
                    {event.description}
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
