import React, { useState, useEffect, useRef } from 'react';
import { Activity, Network, Users, Clock, LogIn, ChevronRight, ChevronDown, AlertTriangle } from 'lucide-react';

const DenseEvidenceRow = ({ record, isHighlighted, onEntityClick }) => {
  const [expanded, setExpanded] = useState(false);
  const keys = Object.keys(record);
  
  // Extract primary identifiers for dense view
  const primaryKeys = keys.slice(0, 3);
  
  useEffect(() => {
    if (isHighlighted) setExpanded(true);
  }, [isHighlighted]);

  return (
    <div className={`border-b border-white/5 last:border-0 transition-colors group text-sm ${
      isHighlighted ? 'bg-primary/20 border-l-2 border-l-primary' : 'hover:bg-white/[0.02]'
    }`}>
      <div 
        className="flex items-center px-4 py-2 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <button className="text-gray-600 group-hover:text-gray-300 mr-3 shrink-0">
          {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
        
        <div className="flex-1 grid grid-cols-3 gap-4 items-center">
          {primaryKeys.map((k, idx) => (
            <div key={k} className="flex flex-col justify-center min-w-0">
              <span 
                className={`font-mono truncate ${idx === 0 ? 'text-gray-200 font-bold' : 'text-gray-400'}`}
              >
                {String(record[k]) || '-'}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {expanded && (
        <div className="bg-background/30 border-t border-white/5 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-4 shadow-inner">
          {keys.map(k => (
            <div key={k}>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">{k}</span>
              <span 
                className="text-sm text-gray-300 font-mono break-all cursor-pointer border-b border-dashed border-gray-600 hover:text-primary hover:border-primary pb-0.5 inline-block transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  onEntityClick(k.includes('ip') ? 'IP Address' : k.includes('user') ? 'User' : 'Entity', String(record[k]));
                }}
              >
                {String(record[k]) || 'null'}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const EvidenceExplorer = ({ evidence, targetEvidence, onEntityClick }) => {
  const [activeTab, setActiveTab] = useState('processes');
  const scrollRef = useRef(null);

  // All possible tabs
  const tabs = [
    { id: 'processes', label: 'Processes', icon: Activity, data: evidence?.processes || [] },
    { id: 'network_activity', label: 'Network', icon: Network, data: evidence?.network_activity || [] },
    { id: 'users', label: 'Identity', icon: Users, data: evidence?.users || [] },
    { id: 'cron_jobs', label: 'Persistence', icon: Clock, data: evidence?.cron_jobs || [] },
    { id: 'login_activity', label: 'Logins', icon: LogIn, data: evidence?.login_activity || [] }
  ];

  useEffect(() => {
    if (targetEvidence?.category) {
      setActiveTab(targetEvidence.category);
      if (scrollRef.current) {
        scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [targetEvidence]);

  const activeData = tabs.find(t => t.id === activeTab) || tabs[0];
  const primaryKeys = activeData.data.length > 0 ? Object.keys(activeData.data[0]).slice(0, 3) : [];

  return (
    <section ref={scrollRef} className="scroll-mt-24">
      <div className="mb-4 px-2">
        <h2 className="text-xl font-bold text-white tracking-tight mb-1">Forensic Telemetry</h2>
      </div>

      <div className="bg-surface/20 border border-white/5 rounded-card overflow-hidden">
        {/* Compact Tabs */}
        <div className="flex items-center overflow-x-auto hide-scrollbar border-b border-white/10 bg-surface/40 px-2 py-1 gap-1">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded text-xs font-semibold transition-all whitespace-nowrap ${
                  isActive ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                }`}
              >
                <Icon className="w-3 h-3" />
                {tab.label}
                <span className={`ml-1 px-1.5 rounded-full text-[10px] ${isActive ? 'bg-primary/20 text-primary' : 'bg-surface'}`}>
                  {tab.data.length}
                </span>
              </button>
            );
          })}
        </div>

        {activeData.data.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center bg-background/20">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle className="w-8 h-8 text-gray-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-400 mb-2">No {activeData.label} Telemetry Available</h3>
            <p className="text-gray-500 text-sm max-w-md">
              The sensor may be offline, data collection is incomplete, or no relevant telemetry was captured for this category during the investigation window.
            </p>
          </div>
        ) : (
          <>
            {/* Table Header (Dense) */}
            <div className="flex items-center px-4 py-2 bg-surface/30 border-b border-white/5">
              <div className="w-7 shrink-0"></div>
              <div className="flex-1 grid grid-cols-3 gap-4">
                {primaryKeys.map(k => (
                  <div key={k} className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                    {k}
                  </div>
                ))}
              </div>
            </div>

            {/* Rows */}
            <div className="bg-background/20 max-h-[500px] overflow-y-auto">
              {activeData.data.map((record, i) => {
                const isTarget = targetEvidence?.identifier && Object.values(record).some(val => String(val) === targetEvidence.identifier);
                return (
                  <DenseEvidenceRow 
                    key={i} 
                    record={record} 
                    isHighlighted={isTarget} 
                    onEntityClick={onEntityClick} 
                  />
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
};
