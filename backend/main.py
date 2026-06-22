import json

from src.services.evidence_service import collect_all_evidence
from src.services.investigation_service import investigate
from src.report.report_generator import generate_report
from src.services.ai_service import generate_ai_report


evidence = collect_all_evidence()

findings = investigate(evidence)

report = generate_report(findings)

ai_analysis = generate_ai_report(evidence,findings)

result = {
    "evidence": evidence,
    "findings": findings,
    "ai_analysis": ai_analysis
}

with open("output/evidence.json", "w") as file:
    json.dump(
        result,
        file,
        indent=4
    )

with open("output/report.txt", "w") as file:
    file.write(report)

with open(
    "output/ai_analysis.txt",
    "w"
) as file:

    file.write(ai_analysis)

print("Investigation completed successfully.")
print("AI Analysis completed successfully.")
