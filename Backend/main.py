from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
from passlib.hash import bcrypt
from fastapi.middleware.cors import CORSMiddleware
import sqlite3

app = FastAPI()

# CORS for React frontend
origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database setup
conn = sqlite3.connect("users.db", check_same_thread=False)
cursor = conn.cursor()
cursor.execute("""
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    email TEXT UNIQUE,
    mobile TEXT,
    password TEXT
)
""")
conn.commit()

# Pydantic model
class UserCreate(BaseModel):
    username: str
    email: EmailStr
    mobile: str
    password: str

# Signup endpoint
@app.post("/signup")
def create_user(user: UserCreate):
    hashed_password = bcrypt.hash(user.password)

    try:
        cursor.execute(
            "INSERT INTO users (username, email, mobile, password) VALUES (?, ?, ?, ?)",
            (user.username, user.email, user.mobile, hashed_password)
        )
        conn.commit()
        return {"message": "User created successfully"}
    except sqlite3.IntegrityError:
        raise HTTPException(status_code=400, detail="Username or email already exists")

# Test endpoint
@app.get("/")
def read_root():
    return {"message": "Server is running"}
