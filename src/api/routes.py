from fastapi import APIRouter

from src.services.evidence_service import collect_all_evidence
from src.services.investigation_service import investigate
from src.services.ai_service import generate_ai_report

router = APIRouter()


@router.get("/investigate")
def run_investigation():

    evidence = collect_all_evidence()

    findings = investigate(evidence)

    ai_analysis = generate_ai_report(
        evidence,
        findings
    )

    return {
        "evidence": evidence,
        "findings": findings,
        "ai_analysis": ai_analysis
    }
