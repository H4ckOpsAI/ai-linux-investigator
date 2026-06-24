import { useState, useEffect, useCallback } from 'react';
import { generateTimeline } from '../utils/intelligence/timelineGenerator';
import { buildNarrative } from '../utils/intelligence/narrativeBuilder';
import { calculatePosture } from '../utils/intelligence/postureCalculator';
import { mapAttackChain } from '../utils/intelligence/attackChainMapper';
import { mapMitreTechniques } from '../utils/intelligence/mitreMapper';

/**
 * Orchestrates fetching backend data and running derived intelligence transformers.
 */
export const useInvestigationWorkspace = () => {
  const [data, setData] = useState({
    evidence: {},
    findings: [],
    aiAnalysis: "",
    timeline: [],
    narrative: [],
    posture: null,
    attackChain: [],
    mitreTechniques: []
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/investigate');
      
      if (!response.ok) {
        throw new Error(`API returned status: ${response.status}`);
      }

      const rawData = await response.json();
      
      // Defensive parsing
      const evidence = rawData.evidence || {};
      const findings = Array.isArray(rawData.findings) ? rawData.findings : [];
      const aiAnalysis = rawData.ai_analysis || "No AI analysis available at this time.";

      // Phase 9.1: MITRE ATT&CK Enrichment
      const { enrichedFindings, mitreTechniques } = mapMitreTechniques(findings);

      // Invoke Pure Function Intelligence Generators
      const timeline = generateTimeline(enrichedFindings, evidence);
      const narrative = buildNarrative(timeline);
      const posture = calculatePosture(enrichedFindings, evidence);
      const attackChain = mapAttackChain(enrichedFindings, evidence);

      setData({
        evidence,
        findings: enrichedFindings,
        aiAnalysis,
        timeline,
        narrative,
        posture,
        attackChain,
        mitreTechniques
      });

    } catch (err) {
      console.error("Failed to fetch investigation data:", err);
      setError("Failed to connect to the investigation backend. Please ensure the backend is running at http://127.0.0.1:8000.");
      
      // Safe defaults on failure to prevent UI crash
      const defaultPosture = calculatePosture([], {});
      const defaultChain = mapAttackChain([], {});
      
      setData({
        evidence: {},
        findings: [],
        aiAnalysis: "Error connecting to AI backend.",
        timeline: [],
        narrative: ["Investigation data could not be retrieved."],
        posture: defaultPosture,
        attackChain: defaultChain
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    ...data,
    loading,
    error,
    refresh: fetchData
  };
};
