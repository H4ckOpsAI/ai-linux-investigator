from src.utils.command_runner import run_command


def collect_processes():
    return run_command("docker exec ubuntu-target ps aux")
