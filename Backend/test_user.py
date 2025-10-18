import sqlite3
import bcrypt


# Connect to your database
conn = sqlite3.connect("users.db")
cursor = conn.cursor()

# Create table if it doesn't exist
cursor.execute("""
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    email TEXT UNIQUE,
    mobile TEXT,
    password TEXT
)
""")

# Insert a test user
username = "testuser"
email = "testuser@example.com"
mobile = "9876543210"
password = "password123"

# Hash the password
hashed_password = bcrypt.hash(password)

try:
    cursor.execute(
        "INSERT INTO users (username, email, mobile, password) VALUES (?, ?, ?, ?)",
        (username, email, mobile, hashed_password)
    )
    conn.commit()
    print("Test user added successfully!")
except sqlite3.IntegrityError:
    print("User already exists!")

# Print all users
cursor.execute("SELECT id, username, email, mobile, password FROM users")
users = cursor.fetchall()
for user in users:
    print(user)

conn.close()
