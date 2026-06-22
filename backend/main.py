import json

from src.services.evidence_service import collect_all_evidence
from src.services.investigation_service import investigate


evidence = collect_all_evidence()

findings = investigate(evidence)

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

print("Investigation completed successfully.")
