def analyze_logins(login_activity):

    findings = []

    for login in login_activity:

        user = login.get("user", "")
        source_ip = login.get("source_ip", "")

        findings.append({
            "severity": "INFO",
            "type": "Login Activity",
            "description": f"User {user} logged in from {source_ip}"
        })

        if user == "root":

            findings.append({
                "severity": "HIGH",
                "type": "Privileged Login",
                "description": f"Root login detected from {source_ip}"
            })

    return findings
