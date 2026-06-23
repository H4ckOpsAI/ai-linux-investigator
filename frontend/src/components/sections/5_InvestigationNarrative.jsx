import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

export const InvestigationNarrative = ({ narrative }) => {
  if (!narrative || narrative.length === 0) return null;

  return (
    <section>
      <div className="mb-8 px-2 flex items-center gap-4">
        <div className="p-3 bg-surface border border-white/10 rounded-xl">
          <FileText className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Analyst Observations</h2>
          <p className="text-gray-400 text-lg">Synthesized attack story derived from forensic evidence.</p>
        </div>
      </div>

      <div className="pl-6 border-l-4 border-primary/30 py-4 space-y-8">
        {narrative.map((paragraph, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="text-xl text-gray-200 leading-relaxed font-medium max-w-4xl"
          >
            {paragraph}
          </motion.div>
        ))}
      </div>
    </section>
  );
};
