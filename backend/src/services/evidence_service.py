from src.collectors.process_collector import collect_processes
from src.collectors.network_collector import collect_network
from src.collectors.user_collector import collect_users
from src.collectors.cron_collector import collect_cron_jobs
from src.collectors.login_collector import collect_login_activity
from src.parsers.process_parser import parse_processes
from src.parsers.network_parser import parse_network_activity
from src.parsers.cron_parser import parse_cron_jobs
from src.parsers.user_parser import parse_users
from src.parsers.login_parser import parse_login_activity

def collect_all_evidence():

    raw_processes = collect_processes()
    raw_network = collect_network()
    raw_cron = collect_cron_jobs()

    evidence = {
        "processes": parse_processes(raw_processes),
        "network_activity": parse_network_activity(raw_network),
        "users": parse_users(collect_users()),
        "cron_jobs": parse_cron_jobs(raw_cron),
        "login_activity": parse_login_activity(collect_login_activity())
    }

    return evidence
