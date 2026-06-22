def analyze_logins(logins):

    findings = []

    seen = set()

    for login in logins:

        user = login.get("user")
        source_ip = login.get("source_ip")

        identifier = (user, source_ip)

        if identifier in seen:
            continue

        seen.add(identifier)

        findings.append({
            "severity": "LOW",
            "type": "Login Activity",
            "description": (
                f"User {user} logged in from {source_ip}"
            )
        })

    return findings
