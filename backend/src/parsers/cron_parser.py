def parse_cron_jobs(raw_data):
    cron_jobs = []

    lines = raw_data.strip().splitlines()

    for line in lines:
        parts = line.split()

        if len(parts) >= 6:
            schedule = " ".join(parts[:5])
            command = " ".join(parts[5:])

            cron_jobs.append({
                "schedule": schedule,
                "command": command
            })

    return cron_jobs