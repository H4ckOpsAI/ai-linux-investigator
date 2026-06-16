from src.utils.command_runner import run_command


def collect_users():
    return run_command(
        "docker exec ubuntu-target cat /etc/passwd"
    )
