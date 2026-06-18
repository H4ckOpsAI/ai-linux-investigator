def parse_users(raw_data):

    users = []

    lines = raw_data.strip().split("\n")

    for line in lines:

        parts = line.split(":")

        if len(parts) >= 7:

            users.append({
                "username": parts[0],
                "uid": parts[2],
                "gid": parts[3],
                "home": parts[5],
                "shell": parts[6]
            })

    return users
