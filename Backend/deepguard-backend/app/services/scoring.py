def combine_scores(scores: dict):
    # Simple average (you can replace with weighted ensemble)
    return round(sum(scores.values()) / len(scores), 2)
