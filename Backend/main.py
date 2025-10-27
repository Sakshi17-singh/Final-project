from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3
import bcrypt

app = FastAPI()

# --- CORS ---
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Database Setup ---
def get_db_connection():
    conn = sqlite3.connect("users.db")
    conn.row_factory = sqlite3.Row
    return conn

# --- Models ---
class SignupData(BaseModel):
    username: str
    email: str
    mobile: str
    password: str

class LoginData(BaseModel):
    email: str
    password: str

# --- Routes ---
@app.post("/signup")
def signup(data: SignupData):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM users WHERE email = ?", (data.email,))
    existing_user = cursor.fetchone()
    if existing_user:
        conn.close()
        raise HTTPException(status_code=400, detail="Email already exists")

    hashed_pw = bcrypt.hashpw(data.password.encode('utf-8'), bcrypt.gensalt())
    cursor.execute(
        "INSERT INTO users (username, email, mobile, password) VALUES (?, ?, ?, ?)",
        (data.username, data.email, data.mobile, hashed_pw)
    )
    conn.commit()
    conn.close()
    return {"message": "User registered successfully"}

@app.post("/login")
def login(data: LoginData):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE email = ?", (data.email,))
    user = cursor.fetchone()
    conn.close()

    if not user:
        raise HTTPException(status_code=404, detail="Email not found")

    stored_password = user["password"]
    if not bcrypt.checkpw(data.password.encode("utf-8"), stored_password):
        raise HTTPException(status_code=401, detail="Invalid password")

    return {"message": "Login successful"}
