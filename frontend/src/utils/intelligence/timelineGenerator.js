/**
 * Generates a chronological timeline based on finding correlation.
 * Pure function: No side effects, no DOM access.
 *
 * @param {Array} findings - The raw findings from the backend
 * @param {Object} evidence - The raw evidence from the backend
 * @returns {Array} An array of timeline event objects
 */
export const generateTimeline = (findings = [], evidence = {}) => {
  const safeFindings = Array.isArray(findings) ? findings : [];
  const timeline = [];
  let orderCounter = 0;

  const findingsStr = safeFindings.map(f => JSON.stringify(f)).join(' ').toLowerCase();

  const addEvent = (title, type, description) => {
    timeline.push({
      id: `event-${orderCounter}`,
      order: orderCounter++,
      title,
      type,
      description
    });
  };

  const getDesc = (f) => f ? (f.description || f.type || JSON.stringify(f)) : '';

  // 1. Initial Access
  const loginFindings = safeFindings.filter(f => {
    const s = JSON.stringify(f).toLowerCase();
    return s.includes('login') || s.includes('ssh') || s.includes('access');
  });
  if (loginFindings.length > 0 || (evidence.users && evidence.users.length > 0)) {
    addEvent('Initial Access', 'access', loginFindings.length > 0 ? getDesc(loginFindings[0]) : 'Suspicious or unauthorized access detected on the system.');
  }

  // 2. Persistence
  const persistenceFindings = safeFindings.filter(f => {
    const s = JSON.stringify(f).toLowerCase();
    return s.includes('cron') || s.includes('persistence');
  });
  if (persistenceFindings.length > 0 || (evidence.cron_jobs && evidence.cron_jobs.length > 0)) {
    addEvent('Persistence Established', 'persistence', persistenceFindings.length > 0 ? getDesc(persistenceFindings[0]) : 'A persistence mechanism such as a cron job was created.');
  }

  // 3. Command & Control
  const c2Findings = safeFindings.filter(f => {
    const s = JSON.stringify(f).toLowerCase();
    return s.includes('listener') || s.includes('netcat') || s.includes('port') || s.includes('nc ');
  });
  if (c2Findings.length > 0 || findingsStr.includes('nc -l') || (evidence.network && evidence.network.length > 0)) {
    addEvent('Command & Control', 'c2', c2Findings.length > 0 ? getDesc(c2Findings[0]) : 'A network listener was started, likely for external command and control.');
  }

  // 4. Execution
  const execFindings = safeFindings.filter(f => {
    const s = JSON.stringify(f).toLowerCase();
    return s.includes('process') || s.includes('miner') || s.includes('malware') || s.includes('executed');
  });
  if (execFindings.length > 0 || (evidence.processes && evidence.processes.length > 0)) {
    addEvent('Malicious Execution', 'execution', execFindings.length > 0 ? getDesc(execFindings[0]) : 'Suspicious processes or malware execution observed.');
  }

  // 5. Impact
  const impactFindings = safeFindings.filter(f => {
    const s = JSON.stringify(f).toLowerCase();
    return s.includes('cpu') || s.includes('abuse') || s.includes('impact') || s.includes('mining');
  });
  if (impactFindings.length > 0) {
    addEvent('System Impact', 'impact', impactFindings.length > 0 ? getDesc(impactFindings[0]) : 'High system resource abuse or other impact detected.');
  }

  return timeline;
};
