from src.ai.llm_investigator import build_investigation_prompt
from src.ai.groq_client import get_ai_analysis


def generate_ai_report(
    evidence,
    findings
):

    prompt = build_investigation_prompt(
        evidence,
        findings
    )

    analysis = get_ai_analysis(
        prompt
    )

    return analysis
