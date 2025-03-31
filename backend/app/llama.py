import openai
import json
from app.config import NEBIUS_API_KEY, API_BASE_URL, VISION_MODEL_NAME, TEXT_MODEL_NAME

client = openai.OpenAI(
    base_url="https://api.studio.nebius.com/v1/",
    api_key=NEBIUS_API_KEY
)

VALID_MODELS = ["vision", "text-to-image", "text-to-text", "speech-recognition"]

def generate_tasks(family_data):
    prompt = f"""
    You are an AI assistant that fairly distributes household tasks and suggests AI-powered assistance for each.

    **Family Members:**
    {json.dumps(family_data['members'], indent=4)}

    **Pending Tasks:**
    {json.dumps(family_data['pending_tasks'], indent=4)}

    **Task Assignment Rules:**
    - Distribute tasks evenly among members.
    - Consider their **roles** and **preferences** when assigning tasks. If a person likes to go out, assign them outdoor tasks, if someone likes to stay indoors, assign them indoor tasks. So analyze preferences, and tasks properly before assigning.
    - **Pair people together ONLY if their preferences align**; otherwise, assign tasks individually.
    - If someone is not interested in doing something, assign them with a task which is simple or easy to complete.
    - If assigning multiple people, list them together in **one string**, separated by commas (e.g., `"Alice, Bob"`).
    - Prioritize urgent tasks first.
    - Return **ONLY** a JSON array with task assignments, keeping task descriptions concise (3-4 words max).

    **AI Assistance Rules:**
    - Suggest an AI-based model that could assist with each task.
    - Choose from:
      - `"vision"` → for image-based recognition.
      - `"text-to-image"` → for generating visuals.
      - `"image-to-text"` → for generating descriptions/help with sending image of task, and receiving tips/responses on how to do it.
      - `"text-to-text"` → for summarization or automation.
      - `"speech-recognition"` → for voice-based interactions.
    - Ensure the model is **ONLY** from the above list.
    - Provide a **short, clear reason** why the model applies.

    **STRICT OUTPUT FORMAT:**
    Return JSON **only**, structured like this:
    ```json
    [
        {{"task": "Buy groceries", "assigned_to": "Alice, Bob", "ai_assistance": {{"model": "vision", "reason": "Object detection for grocery lists"}}}},
        {{"task": "Do laundry", "assigned_to": "Charlie", "ai_assistance": {{"model": "text-to-text", "reason": "Automated reminders for washing schedule"}}}}
    ]
    ```
    """

    try:
        response = client.chat.completions.create(
            model=TEXT_MODEL_NAME,
            max_tokens=512,
            temperature=0.5,
            top_p=0.9,
            extra_body={"top_k": 50},
            messages=[{"role": "system", "content": prompt}]
        )

        message = response.choices[0].message.content.strip()

        try:
            if "```json" in message:
                message = message.split("```json")[1].split("```")[0].strip()
            
            parsed_response = json.loads(message)
            for task in parsed_response:
                if task["ai_assistance"]["model"] not in VALID_MODELS:
                    task["ai_assistance"]["model"] = "text-to-text" 

            return parsed_response

        except json.JSONDecodeError:
            print(f"Invalid JSON received: {message}")
            return {"error": "AI returned invalid JSON"}

    except Exception as e:
        print(f"Error calling API: {e}")
        return {"error": "Failed to fetch AI response"}


import openai

def get_image_to_text(image_url: str, prompt: str):
    try:
        response = client.chat.completions.create(
            model=VISION_MODEL_NAME,
            temperature=0,
            messages=[
                {"role": "system", "content": "You are an AI that processes images."},
                {"role": "user", "content": [
                    {"type": "text", "text": prompt},
                    {"type": "image_url", "image_url": {"url": image_url}}
                ]}
            ]
        )
        return response.choices[0].message.content
    
    except Exception as e:
        print(f"API Error: {str(e)}")
        if "Unable to process request" in str(e):
            return "Nebius API is temporarily unavailable. Please try again later."
        return "Error processing image."
