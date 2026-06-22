from src.analyzers.process_analyzer import analyze_processes
from src.analyzers.network_analyzer import analyze_network
from src.analyzers.cron_analyzer import analyze_cron_jobs
from src.analyzers.login_analyzer import analyze_logins


def investigate(evidence):

    findings = []

    findings.extend(
        analyze_processes(
            evidence["processes"]
        )
    )

    findings.extend(
        analyze_network(
            evidence["network_activity"]
        )
    )

    findings.extend(
        analyze_cron_jobs(
            evidence["cron_jobs"]
        )
    )

    findings.extend(
        analyze_logins(
            evidence["login_activity"]
        )
    )

    return findings
