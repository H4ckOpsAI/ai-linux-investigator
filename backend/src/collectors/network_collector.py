from src.utils.command_runner import run_command


def collect_network():
    return run_command(
        "docker exec ubuntu-target ss -tulnp"
    )
