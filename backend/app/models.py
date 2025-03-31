from pydantic import BaseModel
from typing import List, Optional

class FamilyMember(BaseModel):
    name: str
    age: int
    role: str  
    preferences: List[str]  

class FamilyInput(BaseModel):
    num_members: int
    members: List[FamilyMember]
    pending_tasks: List[str]  

class ImageToTextRequest(BaseModel):
    task_title: str
    user_prompt: str

class ImageToTextResponse(BaseModel):
    result_text: str