from src.utils.command_runner import run_command


def collect_cron_jobs():
    return run_command(
        "docker exec ubuntu-target crontab -l"
    )
