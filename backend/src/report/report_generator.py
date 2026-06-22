def generate_report(findings):

    score = 0

    for finding in findings:

        severity = finding.get("severity", "LOW")

        if severity == "HIGH":
            score += 30

        elif severity == "MEDIUM":
            score += 15

        else:
            score += 5

    if score > 100:
        score = 100

    if score >= 70:
        risk_level = "HIGH"

    elif score >= 40:
        risk_level = "MEDIUM"

    else:
        risk_level = "LOW"

    report = []

    report.append("Investigation Report")
    report.append("=" * 50)
    report.append("")

    report.append(f"Risk Score: {score}/100")
    report.append(f"Risk Level: {risk_level}")
    report.append("")

    report.append("Summary")
    report.append("-" * 20)

    report.append(
        "The investigation identified suspicious activities "
        "within the monitored Linux environment."
    )

    report.append("")

    report.append("Findings")
    report.append("-" * 20)
    report.append("")

    for index, finding in enumerate(findings, start=1):

        report.append(f"{index}. {finding['type']}")
        report.append(f"   Severity: {finding['severity']}")
        report.append(f"   {finding['description']}")
        report.append("")

    report.append("Recommendations")
    report.append("-" * 20)

    report.append(
        "1. Terminate suspicious processes."
    )

    report.append(
        "2. Remove unauthorized cron jobs."
    )

    report.append(
        "3. Investigate unexpected network listeners."
    )

    report.append(
        "4. Review login activity and user accounts."
    )

    report.append(
        "5. Reset credentials if compromise is confirmed."
    )

    report.append("")

    report.append(
        f"Overall Assessment: {risk_level} RISK"
    )

    return "\n".join(report)
