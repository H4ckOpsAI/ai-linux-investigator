export const mapMitreTechniques = (findings) => {
  if (!findings || !Array.isArray(findings)) return { enrichedFindings: [], mitreTechniques: [] };

  const MITRE_RULES = [
    {
      keywords: ['login', 'ssh', 'access'],
      tactic: 'Initial Access',
      technique: 'Valid Accounts',
      techniqueId: 'T1078',
      description: 'Adversaries may obtain and abuse credentials of existing accounts as a means of gaining Initial Access, Persistence, Privilege Escalation, or Defense Evasion.'
    },
    {
      keywords: ['cron', 'persist', 'job'],
      tactic: 'Persistence',
      technique: 'Scheduled Task / Job',
      techniqueId: 'T1053',
      description: 'Adversaries may abuse task scheduling functionality to facilitate initial or recurring execution of malicious code.'
    },
    {
      keywords: ['nc ', 'listen', 'port', 'bind'],
      tactic: 'Command and Control',
      technique: 'Ingress Tool Transfer',
      techniqueId: 'T1105',
      description: 'Adversaries may transfer tools or other files from an external system into a compromised environment.'
    },
    {
      keywords: ['process', 'script', 'malware', 'sh', 'bash'],
      tactic: 'Execution',
      technique: 'Command and Scripting Interpreter',
      techniqueId: 'T1059',
      description: 'Adversaries may abuse command and script interpreters to execute commands, scripts, or binaries.'
    },
    {
      keywords: ['miner', 'cpu', 'impact', 'mining', 'resource'],
      tactic: 'Impact',
      technique: 'Resource Hijacking',
      techniqueId: 'T1496',
      description: 'Adversaries may leverage the resources of co-opted systems in order to solve resource intensive problems, which may impact system availability.'
    }
  ];

  const enrichedFindings = [];
  const flatMitreTechniques = [];

  findings.forEach(finding => {
    const findingStr = JSON.stringify(finding).toLowerCase();
    const matchedMitre = [];

    // Support multiple MITRE mappings per finding
    MITRE_RULES.forEach(rule => {
      const matchFound = rule.keywords.some(keyword => findingStr.includes(keyword));
      if (matchFound) {
        // Clone rule without keywords
        const mitreObj = {
          tactic: rule.tactic,
          technique: rule.technique,
          techniqueId: rule.techniqueId,
          description: rule.description
        };
        matchedMitre.push(mitreObj);

        // Extract supporting evidence (keys that are not metadata)
        const contextKeys = Object.keys(finding).filter(k => !['severity', 'type', 'description'].includes(k));
        const evidenceContext = contextKeys.map(k => `${k}: ${finding[k]}`).join(', ');

        flatMitreTechniques.push({
          ...mitreObj,
          triggeringFinding: finding.type,
          findingDescription: finding.description,
          supportingEvidence: evidenceContext
        });
      }
    });

    enrichedFindings.push({
      ...finding,
      mitre: matchedMitre
    });
  });

  return {
    enrichedFindings,
    mitreTechniques: flatMitreTechniques
  };
};
