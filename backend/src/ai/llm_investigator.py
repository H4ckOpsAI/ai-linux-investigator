def build_investigation_prompt(evidence, findings):

    prompt = """
You are a cybersecurity investigator.

Analyze the collected evidence and findings.

Provide:

1. Executive Summary
2. Likely Attack Scenario
3. Risk Assessment
4. Recommended Actions

==============================
COLLECTED EVIDENCE
==============================

PROCESSES:
"""

    for process in evidence.get("processes", []):

        prompt += (
            f"- PID: {process.get('pid')} | "
            f"CPU: {process.get('cpu')}% | "
            f"COMMAND: {process.get('command')}\n"
        )

    prompt += "\nNETWORK ACTIVITY:\n"

    for network in evidence.get("network_activity", []):

        prompt += (
            f"- PORT: {network.get('port')} | "
            f"PROCESS: {network.get('process')}\n"
        )

    prompt += "\nCRON JOBS:\n"

    for cron in evidence.get("cron_jobs", []):

        prompt += (
            f"- {cron.get('schedule')} "
            f"{cron.get('command')}\n"
        )

    prompt += "\nLOGIN ACTIVITY:\n"

    for login in evidence.get("login_activity", []):

        prompt += (
            f"- USER: {login.get('user')} | "
            f"SOURCE IP: {login.get('source_ip')}\n"
        )

    prompt += """

==============================
INVESTIGATION FINDINGS
==============================

"""

    for index, finding in enumerate(findings, start=1):

        prompt += (
            f"{index}. "
            f"{finding.get('type')} | "
            f"{finding.get('severity')} | "
            f"{finding.get('description')}\n"
        )

    prompt += """

==============================
RESPONSE FORMAT
==============================

Executive Summary:

Likely Attack Scenario:

Risk Assessment:

Recommended Actions:
"""

    return prompt
