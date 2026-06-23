import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { GlassCard } from '../common/GlassCard';
import { Bot, ShieldAlert, Target, ShieldCheck, FileSearch, Copy, Download, Printer } from 'lucide-react';
import { motion } from 'framer-motion';

export const ExecutiveAIReport = ({ aiAnalysis }) => {
  if (!aiAnalysis) return null;

  const sections = useMemo(() => {
    const results = [];
    const regex = /\*\*(.*?)\*\*:\s*([\s\S]*?)(?=\*\*|$)/g;
    let match;
    while ((match = regex.exec(aiAnalysis)) !== null) {
      if (match[1] && match[2]) {
        results.push({ title: match[1].replace(/:$/, '').trim(), content: match[2].trim() });
      }
    }
    return results;
  }, [aiAnalysis]);

  const getIconForSection = (title) => {
    const t = title.toLowerCase();
    if (t.includes('summary')) return FileSearch;
    if (t.includes('scenario') || t.includes('attack')) return Target;
    if (t.includes('risk')) return ShieldAlert;
    if (t.includes('recommend')) return ShieldCheck;
    return Bot;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(aiAnalysis);
  };

  const handleExportMd = () => {
    const blob = new Blob([aiAnalysis], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `incident-report-${new Date().toISOString().split('T')[0]}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section>
      <div className="mb-4 px-2 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight mb-1 flex items-center gap-2">
            <Bot className="w-5 h-5 text-primary" /> Automated Incident Briefing
          </h2>
        </div>
        
        {/* Export Toolbar */}
        <div className="flex items-center gap-2 bg-surface/30 p-1 rounded-lg border border-white/5">
          <button onClick={handleCopy} className="p-2 hover:bg-white/10 rounded text-gray-400 hover:text-white transition-colors" title="Copy Report">
            <Copy className="w-4 h-4" />
          </button>
          <button onClick={handleExportMd} className="p-2 hover:bg-white/10 rounded text-gray-400 hover:text-white transition-colors" title="Export Markdown">
            <Download className="w-4 h-4" />
          </button>
          <button onClick={handlePrint} className="p-2 hover:bg-white/10 rounded text-gray-400 hover:text-white transition-colors" title="Print Report">
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {sections.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" id="printable-report">
          {sections.map((sec, idx) => {
            const Icon = getIconForSection(sec.title);
            const isFullWidth = idx === 0 || sec.title.toLowerCase().includes('summary');
            
            return (
              <GlassCard 
                key={idx} 
                className={`p-6 ${isFullWidth ? 'lg:col-span-2' : ''} bg-surface/20`}
                variant="default"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Icon className="w-5 h-5 text-gray-400" />
                  <h3 className="text-lg font-bold text-white tracking-tight">{sec.title}</h3>
                </div>
                
                <div className="prose prose-invert prose-sm max-w-none prose-p:text-gray-300 prose-p:leading-relaxed prose-li:text-gray-300 prose-strong:text-white prose-strong:font-bold">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {sec.content}
                  </ReactMarkdown>
                </div>
              </GlassCard>
            );
          })}
        </div>
      ) : (
        <GlassCard className="p-8" variant="default" id="printable-report">
          <div className="prose prose-invert prose-sm max-w-none prose-headings:text-white prose-headings:font-bold prose-p:text-gray-300 prose-p:leading-relaxed prose-li:text-gray-300 prose-strong:text-white prose-strong:font-bold">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {aiAnalysis}
            </ReactMarkdown>
          </div>
        </GlassCard>
      )}
    </section>
  );
};
