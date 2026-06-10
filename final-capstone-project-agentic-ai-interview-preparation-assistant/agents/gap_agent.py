import json
from utils.llm import generate_response


def analyze_gap(resume_data: dict, jd_data: dict) -> dict:
    """
    Compare resume skills against JD required skills.
    Returns matched_skills, missing_skills, and match_percentage.
    """
    resume_skills = resume_data.get("skills", [])
    required_skills = jd_data.get("required_skills", [])

    prompt = f"""Compare the candidate's skills against the job's required skills.

Candidate skills: {json.dumps(resume_skills)}
Required skills: {json.dumps(required_skills)}

Return ONLY valid JSON with this exact structure (no markdown, no extra text):
{{
  "matched_skills": ["skills present in both lists"],
  "missing_skills": ["skills required but not in candidate's resume"]
}}

Use case-insensitive comparison. Group similar technologies (e.g., "JS" and "JavaScript" are the same)."""

    response = generate_response(prompt)

    cleaned = response.strip()
    if cleaned.startswith("```"):
        cleaned = cleaned.split("```")[1]
        if cleaned.startswith("json"):
            cleaned = cleaned[4:]
        cleaned = cleaned.strip()

    try:
        result = json.loads(cleaned)
    except json.JSONDecodeError:
        result = {"matched_skills": [], "missing_skills": required_skills}

    # Calculate match percentage
    total = len(required_skills)
    matched = len(result.get("matched_skills", []))
    match_percentage = round((matched / total * 100) if total > 0 else 0, 1)
    result["match_percentage"] = match_percentage

    return result
