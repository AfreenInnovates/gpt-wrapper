import os
from dotenv import load_dotenv

load_dotenv()

NEBIUS_API_KEY = os.getenv("NEBIUS_API_KEY")
API_BASE_URL = "https://api.studio.nebius.com/v1/"
VISION_MODEL_NAME = "Qwen/Qwen2-VL-72B-Instruct"
TEXT_MODEL_NAME = "meta-llama/Meta-Llama-3.1-70B-Instruct"

if not NEBIUS_API_KEY:
    raise ValueError("NEBIUS_API_KEY is missing. Check your .env file.")
