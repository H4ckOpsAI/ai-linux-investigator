/**
 * Maps the investigation findings to standard attack chain stages.
 * Pure function: No side effects.
 *
 * @param {Array} findings - The raw findings
 * @param {Object} evidence - The raw evidence
 * @returns {Array} Array of stage objects indicating activity
 */
export const mapAttackChain = (findings = [], evidence = {}) => {
  const safeFindingsStr = (Array.isArray(findings) ? findings : []).map(f => JSON.stringify(f)).join(' ').toLowerCase();
  
  const chain = [
    { stage: "Initial Access", active: false },
    { stage: "Persistence", active: false },
    { stage: "Command & Control", active: false },
    { stage: "Execution", active: false },
    { stage: "Impact", active: false }
  ];

  // Map keywords to stages
  if (safeFindingsStr.includes('login') || safeFindingsStr.includes('ssh') || safeFindingsStr.includes('access')) {
    chain[0].active = true;
  }
  if (safeFindingsStr.includes('cron') || safeFindingsStr.includes('persistence')) {
    chain[1].active = true;
  }
  if (safeFindingsStr.includes('listener') || safeFindingsStr.includes('netcat') || safeFindingsStr.includes('port') || safeFindingsStr.includes('nc ')) {
    chain[2].active = true;
  }
  if (safeFindingsStr.includes('miner') || safeFindingsStr.includes('malware') || safeFindingsStr.includes('process')) {
    chain[3].active = true;
  }
  if (safeFindingsStr.includes('cpu') || safeFindingsStr.includes('abuse') || safeFindingsStr.includes('impact') || safeFindingsStr.includes('mining')) {
    chain[4].active = true;
  }

  // Ensure logical flow conceptually (if a later stage is active, assume earlier path existed)
  let pathIsActive = false;
  for (let i = chain.length - 1; i >= 0; i--) {
    if (chain[i].active) pathIsActive = true;
    if (pathIsActive) chain[i].active = true;
  }

  return chain;
};
