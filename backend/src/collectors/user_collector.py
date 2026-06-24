from src.utils.telemetry_reader import read_latest_telemetry

def collect_users():
    return read_latest_telemetry("users.log")
