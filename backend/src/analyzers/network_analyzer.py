def analyze_network(network_activity):

    findings = []

    for connection in network_activity:

        process = connection.get("process", "")

        if process == "nc":

            findings.append({
                "severity": "HIGH",
                "type": "Suspicious Network Listener",
                "description": "Netcat listener detected",
                "process": process
            })

    return findings
