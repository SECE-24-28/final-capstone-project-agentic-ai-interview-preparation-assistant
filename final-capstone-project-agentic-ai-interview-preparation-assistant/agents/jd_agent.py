import json
from utils.llm import generate_response


def analyze_jd(jd_text: str) -> dict:
    """
    Analyze job description text and extract structured requirements.
    Returns dict with required_skills, preferred_skills, responsibilities, and experience_requirements.
    """
    prompt = f"""Analyze the following job description and extract information into a JSON object.

Return ONLY valid JSON with this exact structure (no markdown, no extra text):
{{
  "required_skills": ["skill1", "skill2"],
  "preferred_skills": ["skill1", "skill2"],
  "responsibilities": ["responsibility1", "responsibility2"],
  "experience_requirements": ["requirement1", "requirement2"]
}}

Job Description:
{jd_text}"""

    response = generate_response(prompt)

    cleaned = response.strip()
    if cleaned.startswith("```"):
        cleaned = cleaned.split("```")[1]
        if cleaned.startswith("json"):
            cleaned = cleaned[4:]
        cleaned = cleaned.strip()

    try:
        return json.loads(cleaned)
    except json.JSONDecodeError:
        return {
            "required_skills": [],
            "preferred_skills": [],
            "responsibilities": [],
            "experience_requirements": [],
        }
