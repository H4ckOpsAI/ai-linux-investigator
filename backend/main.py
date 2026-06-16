import json

from src.services.evidence_service import collect_all_evidence


evidence = collect_all_evidence()

with open("output/evidence.json", "w") as file:
    json.dump(
        evidence,
        file,
        indent=4
    )

print("Evidence saved successfully.")
