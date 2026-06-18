import json
from utils.llm import generate_response


def analyze_resume(resume_text: str) -> dict:
    """
    Analyze resume text and extract structured information.
    Returns dict with skills, projects, experience, and education.
    """
    prompt = f"""Analyze the following resume and extract information into a JSON object.

Return ONLY valid JSON with this exact structure (no markdown, no extra text):
{{
  "skills": ["skill1", "skill2"],
  "projects": [
    {{"name": "Project Name", "description": "Brief description", "technologies": ["tech1"]}}
  ],
  "experience": [
    {{"title": "Job Title", "company": "Company", "duration": "Duration", "responsibilities": ["resp1"]}}
  ],
  "education": [
    {{"degree": "Degree", "institution": "Institution", "year": "Year"}}
  ]
}}

Resume:
{resume_text}"""

    response = generate_response(prompt)

    # Strip markdown code fences if present
    cleaned = response.strip()
    if cleaned.startswith("```"):
        cleaned = cleaned.split("```")[1]
        if cleaned.startswith("json"):
            cleaned = cleaned[4:]
        cleaned = cleaned.strip()

    try:
        return json.loads(cleaned)
    except json.JSONDecodeError:
        # Fallback: return minimal structure to avoid crashing downstream agents
        return {"skills": [], "projects": [], "experience": [], "education": []}
