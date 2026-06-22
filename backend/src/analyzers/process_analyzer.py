def analyze_processes(processes):

    findings = []

    for process in processes:

        try:
            cpu = float(process["cpu"])

            if cpu > 80:
                findings.append({
                    "severity": "HIGH",
                    "type": "Suspicious Process",
                    "description": f"High CPU process detected: {process['command']}",
                    "pid": process["pid"]
                })

        except:
            pass

    return findings
