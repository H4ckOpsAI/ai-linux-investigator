/**
 * Calculates risk scores for specific security posture categories.
 * Pure function: No side effects.
 *
 * @param {Array} findings - The raw findings
 * @param {Object} evidence - The raw evidence
 * @returns {Object} Posture scores and status strings
 */
export const calculatePosture = (findings = [], evidence = {}) => {
  const safeFindingsStr = (Array.isArray(findings) ? findings : []).map(f => JSON.stringify(f)).join(' ').toLowerCase();
  const safeEvidence = evidence || {};

  const posture = {
    identityRisk: { score: 10, status: 'Low', severity: 'low' },
    networkRisk: { score: 10, status: 'Low', severity: 'low' },
    persistenceRisk: { score: 10, status: 'Low', severity: 'low' },
    executionRisk: { score: 10, status: 'Low', severity: 'low' }
  };

  // Identity Risk
  if (safeFindingsStr.includes('login') || safeFindingsStr.includes('ssh')) posture.identityRisk.score += 40;
  if (safeEvidence.users && safeEvidence.users.length > 0) posture.identityRisk.score += 30;

  // Network Risk
  if (safeFindingsStr.includes('listener') || safeFindingsStr.includes('port') || safeFindingsStr.includes('nc -l') || safeFindingsStr.includes('nc ')) posture.networkRisk.score += 50;
  if (safeEvidence.network && safeEvidence.network.length > 0) posture.networkRisk.score += 40;

  // Persistence Risk
  if (safeFindingsStr.includes('cron') || safeFindingsStr.includes('persistence')) posture.persistenceRisk.score += 60;
  if (safeEvidence.cron_jobs && safeEvidence.cron_jobs.length > 0) posture.persistenceRisk.score += 30;

  // Execution Risk
  if (safeFindingsStr.includes('miner') || safeFindingsStr.includes('cpu') || safeFindingsStr.includes('mining')) posture.executionRisk.score += 60;
  if (safeFindingsStr.includes('process') || safeFindingsStr.includes('malware')) posture.executionRisk.score += 30;
  if (safeEvidence.processes && safeEvidence.processes.length > 0) posture.executionRisk.score += 20;

  // Cap at 100 and set status strings
  Object.keys(posture).forEach(key => {
    let score = Math.min(100, posture[key].score);
    posture[key].score = score;
    
    if (score >= 80) {
      posture[key].status = 'Critical';
      posture[key].severity = 'critical';
    } else if (score >= 60) {
      posture[key].status = 'High';
      posture[key].severity = 'high';
    } else if (score >= 40) {
      posture[key].status = 'Medium';
      posture[key].severity = 'medium';
    }
  });

  return posture;
};
