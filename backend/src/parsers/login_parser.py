def parse_login_activity(raw_data):

    logins = []

    lines = raw_data.strip().split("\n")

    for line in lines:

        if line.startswith("wtmp"):
            continue

        if not line.strip():
            continue

        parts = line.split()

        if len(parts) >= 3:

            logins.append({
                "user": parts[0],
                "source_ip": parts[2]
            })

    return logins
