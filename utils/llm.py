import os
from dotenv import load_dotenv
from groq import Groq, APIError, APIConnectionError, RateLimitError

# Load .env file from project root (works regardless of where app is launched from)
load_dotenv()

MODEL = "llama-3.3-70b-versatile"

def _get_client() -> Groq:
    """Initialize and return a Groq client. Raises if API key is missing."""
    api_key = os.environ.get("GROQ_API_KEY")
    if not api_key:
        raise EnvironmentError(
            "GROQ_API_KEY environment variable is not set. "
            "Please set it before running the application."
        )
    return Groq(api_key=api_key)


def generate_response(prompt: str) -> str:
    """Send a prompt to the Groq LLM and return the text response."""
    try:
        client = _get_client()
        response = client.chat.completions.create(
            model=MODEL,
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7,
        )
        return response.choices[0].message.content.strip()
    except EnvironmentError:
        raise
    except RateLimitError:
        raise RuntimeError("Groq API rate limit exceeded. Please wait and try again.")
    except APIConnectionError:
        raise RuntimeError("Unable to connect to Groq API. Check your internet connection.")
    except APIError as e:
        raise RuntimeError(f"Groq API error: {e}")
    except Exception as e:
        raise RuntimeError(f"Unexpected error calling LLM: {e}")
