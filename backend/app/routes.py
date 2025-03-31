from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from fastapi.responses import FileResponse
from app.models import FamilyInput, ImageToTextRequest, ImageToTextResponse
from app.llama import generate_tasks, get_image_to_text
import shutil
import os

router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/input")
async def process_family_data(family: FamilyInput):
    family_dict = family.model_dump()
    tasks = generate_tasks(family_dict)
    return {"tasks": tasks}

@router.post("/image-to-text")
async def image_to_text(
    task_title: str = Form(None),  
    user_prompt: str = Form(None),  
    image: UploadFile = File(...)
):
    try:
        print(f"Received: {task_title}, {user_prompt}, {image.filename}")

        # Save uploaded image
        image_path = os.path.join(UPLOAD_DIR, image.filename)
        with open(image_path, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)

        if not os.path.exists(image_path):
            raise HTTPException(status_code=500, detail="Image save failed")

        # Generate accessible image URL
        image_url = f"http://localhost:8000/uploads/{image.filename}"

        prompt = user_prompt if user_prompt else f"This is the task: {task_title}."
        result_text = get_image_to_text(image_url, prompt)  # Pass URL instead of file path

        print(f"Processing complete: {result_text}")

        return ImageToTextResponse(result_text=result_text)
    
    except Exception as e:
        print(f"Error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


# ✅ New Route: Serve Uploaded Images
@router.get("/uploads/{filename}")
async def get_uploaded_image(filename: str):
    file_path = os.path.join(UPLOAD_DIR, filename)
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Image not found")
    return FileResponse(file_path, media_type="image/png")  # Change media type if needed
