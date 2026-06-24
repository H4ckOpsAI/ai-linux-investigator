import React, { useState, useEffect } from 'react';
import { useInvestigationWorkspace } from './hooks/useInvestigationWorkspace';
import { TopNav } from './components/common/TopNav';
import { ThreatCommandCenter } from './components/sections/1_ThreatCommandCenter';
import { AttackChain } from './components/sections/3_AttackChain';
import { AttackTimeline } from './components/sections/4_AttackTimeline';
import { InvestigationNarrative } from './components/sections/5_InvestigationNarrative';
import { ExecutiveAIReport } from './components/sections/7_ExecutiveAIReport';
import { FindingsExplorer } from './components/sections/8_FindingsExplorer';
import { EvidenceExplorer } from './components/sections/9_EvidenceExplorer';
import { MitreAttackMatrix } from './components/sections/10_MitreAttackMatrix';
import { EntityDrawer } from './components/common/EntityDrawer';
import { AlertCircle, RotateCcw, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const { 
    evidence, findings, aiAnalysis, timeline, narrative, posture, attackChain, mitreTechniques,
    loading, error, refresh 
  } = useInvestigationWorkspace();

  const [loadingText, setLoadingText] = useState('Collecting Evidence...');
  
  // Phase 7 Correlation State
  const [activeEntity, setActiveEntity] = useState(null);
  const [targetEvidence, setTargetEvidence] = useState(null);

  const handleEntityClick = (type, value) => {
    setActiveEntity({ type, value });
  };

  const handleEvidenceJump = (category, identifier) => {
    setTargetEvidence({ category, identifier, timestamp: Date.now() });
    // Clear it after a moment so the same jump can be triggered again later if needed
    setTimeout(() => setTargetEvidence(null), 1000);
  };

  useEffect(() => {
    if (loading) {
      const texts = [
        'Collecting Evidence...',
        'Analyzing Processes...',
        'Correlating Findings...',
        'Generating Investigation Narrative...',
        'Preparing Executive Report...'
      ];
      let i = 0;
      const interval = setInterval(() => {
        i = (i + 1) % texts.length;
        setLoadingText(texts[i]);
      }, 1200);
      return () => clearInterval(interval);
    }
  }, [loading]);

  return (
    <div className="min-h-screen bg-background text-gray-100 selection:bg-primary/30 font-sans">
      <TopNav isRunning={loading} onRunInvestigation={refresh} />
      
      <main className="w-full">
        <AnimatePresence mode="wait">
          {error && (
            <div className="max-w-[1600px] mx-auto px-6 py-20">
              <motion.div 
                key="error"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-danger/10 border border-danger/20 rounded-card p-12 text-center max-w-2xl mx-auto shadow-[0_0_30px_rgba(239,68,68,0.1)]"
              >
                <div className="w-20 h-20 bg-danger/20 rounded-full flex items-center justify-center mx-auto mb-8">
                  <AlertCircle className="w-10 h-10 text-danger" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Investigation Engine Unavailable</h2>
                <p className="text-xl text-gray-400 mb-10">{error}</p>
                <button 
                  onClick={refresh}
                  className="bg-danger hover:bg-danger/90 text-white text-lg px-8 py-4 rounded-btn font-semibold flex items-center gap-3 mx-auto transition-all shadow-[0_0_15px_rgba(239,68,68,0.4)]"
                >
                  <RotateCcw className="w-6 h-6" />
                  Retry Connection
                </button>
              </motion.div>
            </div>
          )}

          {loading && !error && (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center min-h-[80vh]"
            >
              <div className="relative">
                <Shield className="w-32 h-32 text-primary opacity-20" />
                <div className="absolute inset-0 border-t-4 border-l-4 border-primary rounded-full animate-spin"></div>
                <div className="absolute inset-4 border-b-4 border-r-4 border-secondary rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
              </div>
              <h2 className="text-4xl font-bold text-white mt-12 mb-4 tracking-tight">Investigation in Progress</h2>
              <p className="text-primary font-mono text-xl animate-pulse tracking-widest uppercase">{loadingText}</p>
            </motion.div>
          )}

          {!loading && !error && posture && (
            <motion.div 
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full flex flex-col"
            >
              <ThreatCommandCenter posture={posture} isRunning={loading} onRun={refresh} evidence={evidence} aiAnalysis={aiAnalysis} />
              
              <div className="max-w-[1600px] w-full mx-auto px-6 space-y-12 pb-24">
                <AttackChain attackChain={attackChain} findings={findings} />
                <ExecutiveAIReport aiAnalysis={aiAnalysis} />
                <MitreAttackMatrix mitreTechniques={mitreTechniques} />
                <AttackTimeline timeline={timeline} />
                <InvestigationNarrative narrative={narrative} />
                <FindingsExplorer findings={findings} onEvidenceJump={handleEvidenceJump} onEntityClick={handleEntityClick} />
                <EvidenceExplorer evidence={evidence} targetEvidence={targetEvidence} onEntityClick={handleEntityClick} />
              </div>
              
              <EntityDrawer 
                isOpen={!!activeEntity} 
                onClose={() => setActiveEntity(null)} 
                entity={activeEntity} 
                findings={findings} 
                evidence={evidence} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
