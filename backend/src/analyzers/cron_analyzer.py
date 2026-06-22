def analyze_cron_jobs(cron_jobs):

    findings = []

    for job in cron_jobs:

        command = job.get("command", "")

        if "/tmp/" in command:

            findings.append({
                "severity": "HIGH",
                "type": "Persistence Mechanism",
                "description": f"Suspicious cron job detected: {command}"
            })

    return findings
