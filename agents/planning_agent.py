import json
from utils.llm import generate_response


def plan_next_question(
    resume_data: dict,
    jd_data: dict,
    candidate_profile: dict,
    evaluation_history: list[dict],
    candidate_level: str,
) -> dict:
    """
    Use LLM to reason about the interview state and decide the best next topic.
    Returns: {"next_topic": str, "difficulty": str, "reason": str}
    """
    prompt = f"""You are a strategic technical interviewer planning the next question in a live interview.

Candidate Level: {candidate_level}

Resume Skills: {json.dumps(resume_data.get('skills', []))}
Resume Projects: {json.dumps([p.get('name', '') + ': ' + ', '.join(p.get('technologies', [])) for p in resume_data.get('projects', [])])}
JD Required Skills: {json.dumps(jd_data.get('required_skills', []))}
JD Responsibilities: {json.dumps(jd_data.get('responsibilities', []))}

Candidate Profile:
- Topics Covered: {json.dumps(candidate_profile.get('covered_topics', []))}
- Strong Topics: {json.dumps(candidate_profile.get('strong_topics', []))}
- Weak Topics: {json.dumps(candidate_profile.get('weak_topics', []))}

Evaluation History (most recent last):
{json.dumps(evaluation_history[-5:] if evaluation_history else [], indent=2)}

Reason carefully about:
1. Which topics have already been covered sufficiently?
2. Where is the candidate strong — go deeper?
3. Where is the candidate weak — ask foundational follow-ups?
4. What important JD skills have NOT been explored yet (knowledge gaps)?
5. What difficulty level is appropriate given the progression so far?
6. What is the single best next topic to ask about?

Return ONLY valid JSON with this exact structure (no markdown, no extra text):
{{
  "next_topic": "<specific topic to ask about>",
  "difficulty": "<easy|medium|hard>",
  "reason": "<2-3 sentence reasoning>"
}}"""

    response = generate_response(prompt).strip()
    if response.startswith("```"):
        response = response.split("```")[1]
        if response.startswith("json"):
            response = response[4:]
        response = response.strip()

    try:
        return json.loads(response)
    except json.JSONDecodeError:
        return {
            "next_topic": "general technical skills",
            "difficulty": "medium",
            "reason": "Could not parse planning response. Falling back to general question.",
        }
