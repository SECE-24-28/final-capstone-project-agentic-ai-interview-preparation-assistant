def get_default_profile() -> dict:
    return {
        "covered_topics": [],
        "strong_topics": [],
        "weak_topics": [],
        "question_history": [],
        "answer_history": [],
    }


def update_memory(
    profile: dict,
    evaluation_history: list[dict],
    question: str,
    answer: str,
    topic: str,
    score: float,
    feedback: str,
) -> dict:
    """
    Store the latest Q/A/topic/score/feedback and update the candidate profile.
    Returns the updated profile.
    """
    # Record in history
    profile["question_history"].append(question)
    profile["answer_history"].append(answer)

    if topic and topic not in profile["covered_topics"]:
        profile["covered_topics"].append(topic)

    # Update strong / weak topic lists based on score
    if score >= 7.0:
        if topic and topic not in profile["strong_topics"]:
            profile["strong_topics"].append(topic)
        # Remove from weak if it was there
        if topic in profile["weak_topics"]:
            profile["weak_topics"].remove(topic)
    elif score < 4.0:
        if topic and topic not in profile["weak_topics"]:
            profile["weak_topics"].append(topic)

    # Append to evaluation history (passed by reference from session state)
    evaluation_history.append({
        "question": question,
        "answer": answer,
        "topic": topic,
        "score": score,
        "feedback": feedback,
    })

    return profile
