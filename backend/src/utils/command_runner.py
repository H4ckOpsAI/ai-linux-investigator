import subprocess
import shlex

def run_command(command):
    try:
        args = shlex.split(command)
        result = subprocess.check_output(
            args,
            shell=False,
            text=True
        )
        return result

    except Exception as e:
        return f"ERROR: {str(e)}"
