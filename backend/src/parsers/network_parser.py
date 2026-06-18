def parse_network_activity(raw_data):
    connections = []

    lines = raw_data.strip().splitlines()

    for line in lines[1:]:
        if ":" not in line:
            continue

        parts = line.split()

        if len(parts) < 5:
            continue

        local_address = parts[4]

        port = local_address.split(":")[-1]

        process = "unknown"

        if 'users:(("' in line:
            try:
                process = line.split('users:(("')[1].split('"')[0]
            except:
                pass

        connections.append({
            "port": port,
            "process": process
        })

    return connections
