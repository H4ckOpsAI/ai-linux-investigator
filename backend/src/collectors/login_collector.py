from src.utils.command_runner import run_command


def collect_login_activity():
    return run_command(
        "docker exec ubuntu-target last"
    )
