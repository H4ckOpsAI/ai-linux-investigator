from src.collectors.process_collector import collect_processes
from src.collectors.network_collector import collect_network
from src.collectors.user_collector import collect_users
from src.collectors.cron_collector import collect_cron_jobs
from src.collectors.login_collector import collect_login_activity


def collect_all_evidence():

    evidence = {
        "processes": collect_processes(),
        "network_activity": collect_network(),
        "users": collect_users(),
        "cron_jobs": collect_cron_jobs(),
        "login_activity": collect_login_activity()
    }

    return evidence
