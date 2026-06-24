from groq import Groq

from src.config.settings import GROQ_API_KEY


def get_ai_analysis(prompt):
    if not GROQ_API_KEY:
        return "AI Intelligence disabled: GROQ_API_KEY missing from environment"

    client = Groq(api_key=GROQ_API_KEY)

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.2
    )

    return response.choices[0].message.content
