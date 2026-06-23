/**
 * Transforms technical events into a human-readable investigation story.
 * Pure function: No side effects.
 *
 * @param {Array} timeline - Ordered timeline events
 * @returns {Array} An array of narrative paragraph strings
 */
export const buildNarrative = (timeline = []) => {
  const safeTimeline = Array.isArray(timeline) ? timeline : [];
  
  if (safeTimeline.length === 0) {
    return [
      "No correlated attack sequence has been detected.",
      "The system currently shows no definitive signs of a multi-stage attack based on the available evidence."
    ];
  }

  const narrative = [];
  
  const hasType = (type) => safeTimeline.some(t => t.type === type);

  if (hasType('access')) {
    narrative.push("The attacker likely gained initial access to the system, potentially through compromised credentials or an exposed service like SSH.");
  }
  if (hasType('persistence')) {
    narrative.push("Following access, a persistence mechanism was established (e.g., via a malicious cron job) to ensure continued control over the host.");
  }
  if (hasType('c2')) {
    narrative.push("A network listener was deployed to facilitate external command and control communication.");
  }
  if (hasType('execution')) {
    narrative.push("Suspicious payloads or unauthorized processes were then executed on the compromised machine.");
  }
  if (hasType('impact')) {
    narrative.push("The attack ultimately led to measurable system impact, characterized by significant resource exhaustion or destructive behavior.");
  }

  return narrative;
};
