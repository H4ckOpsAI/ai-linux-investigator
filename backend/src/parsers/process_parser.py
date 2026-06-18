def parse_processes(raw_data):
    processes = []

    lines = raw_data.strip().splitlines()

    for line in lines[1:]:
        parts = line.split(None, 10)

        if len(parts) < 11:
            continue

        process = {
            "user": parts[0],
            "pid": parts[1],
            "cpu": parts[2],
            "memory": parts[3],
            "command": parts[10]
        }

        processes.append(process)

    return processes
