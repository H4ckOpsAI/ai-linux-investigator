import os

def read_latest_telemetry(filename):
    """
    Reads the append-only telemetry log and extracts the latest snapshot.
    The format is:
    === 2026-06-24T13:15:22Z ===
    <output>
    """
    file_path = f"/telemetry/{filename}"
    
    if not os.path.exists(file_path):
        # Fallback for local testing if not running in docker with the mount
        local_fallback = f"./telemetry_mock/{filename}"
        if os.path.exists(local_fallback):
            file_path = local_fallback
        else:
            return ""

    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
            
        blocks = content.split("===")
        if len(blocks) > 0:
            return blocks[-1].strip()
        return ""
    except Exception as e:
        print(f"Error reading telemetry {filename}: {e}")
        return ""
