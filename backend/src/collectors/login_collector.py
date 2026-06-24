from src.utils.telemetry_reader import read_latest_telemetry

def collect_login_activity():
    return read_latest_telemetry("logins.log")
