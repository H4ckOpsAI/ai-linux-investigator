from src.utils.telemetry_reader import read_latest_telemetry

def collect_cron_jobs():
    return read_latest_telemetry("cron.log")
