from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
import sqlite3
from passlib.hash import bcrypt  # ✅ use passlib instead of standalone bcrypt

app = FastAPI()

# CORS settings
origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database
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

# Models
class UserCreate(BaseModel):
    username: str
    email: EmailStr
    mobile: str
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

# Signup endpoint
@app.post("/signup")
def signup(user: UserCreate):
    hashed_password = bcrypt.hash(user.password)  # ✅ hash password
    try:
        cursor.execute(
            "INSERT INTO users (username, email, mobile, password) VALUES (?, ?, ?, ?)",
            (user.username, user.email, user.mobile, hashed_password)
        )
        conn.commit()
        return {"message": "User created successfully"}
    except sqlite3.IntegrityError:
        raise HTTPException(status_code=400, detail="Username or email already exists")

# Login endpoint
@app.post("/login")
def login(user: UserLogin):
    cursor.execute("SELECT password FROM users WHERE email = ?", (user.email,))
    row = cursor.fetchone()
    if row is None:
        raise HTTPException(status_code=400, detail="Email not found")

    stored_password = row[0]

    if not bcrypt.verify(user.password, stored_password):  # ✅ verify password
        raise HTTPException(status_code=400, detail="Incorrect password")

    return {"message": "Login successful"}

@app.get("/")
def root():
    return {"message": "Server is running"}
