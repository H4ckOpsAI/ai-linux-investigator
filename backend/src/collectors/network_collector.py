from src.utils.telemetry_reader import read_latest_telemetry

def collect_network():
    return read_latest_telemetry("network.log")
