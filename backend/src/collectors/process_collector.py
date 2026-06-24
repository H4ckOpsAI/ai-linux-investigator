from src.utils.telemetry_reader import read_latest_telemetry

def collect_processes():
    return read_latest_telemetry("processes.log")
