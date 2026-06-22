import json

from src.services.evidence_service import collect_all_evidence
from src.services.investigation_service import investigate
from src.report.report_generator import generate_report


evidence = collect_all_evidence()

findings = investigate(evidence)

report = generate_report(findings)

result = {
    "evidence": evidence,
    "findings": findings
}

with open("output/evidence.json", "w") as file:
    json.dump(
        result,
        file,
        indent=4
    )

with open("output/report.txt", "w") as file:
    file.write(report)

print("Investigation completed successfully.")
