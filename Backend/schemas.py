from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    mobile: str   # ✅ Make sure this line exists
    password: str

class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    mobile: str

    class Config:
        from_attributes = True  # ✅ For Pydantic v2
