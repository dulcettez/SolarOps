import sqlite3

DB_NAME = "solar.db"

def init_db():
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()

    cursor.executescript("""
    CREATE TABLE IF NOT EXISTS users (
        email TEXT PRIMARY KEY
    );

    CREATE TABLE IF NOT EXISTS panels (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL,
        filename TEXT NOT NULL,
        file_path TEXT,
        defect_class TEXT,
        confidence REAL,
        image_type TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(email) REFERENCES users(email)
    );
    """)

    conn.commit()
    conn.close()

def create_user(email):
    """Register a user if not exists"""
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()

    try:
        cursor.execute("INSERT INTO users (email) VALUES (?)", (email,))
        conn.commit()
    except sqlite3.IntegrityError:
        # user already exists (ignore)
        pass
    finally:
        conn.close()


def verify_user(email):
    """Simple auth: user exists in DB"""
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()

    cursor.execute("SELECT email FROM users WHERE email=?", (email,))
    user = cursor.fetchone()

    conn.close()
    return user is not None


def save_prediction(email, filename, file_path, defect_class, confidence, image_type):
    """Store ML prediction result"""
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()

    # ensure user exists
    create_user(email)

    cursor.execute("""
        INSERT INTO panels (
            email,
            filename,
            file_path,
            defect_class,
            confidence,
            image_type
        )
        VALUES (?, ?, ?, ?, ?, ?)
    """, (
        email,
        filename,
        file_path,
        defect_class,
        confidence,
        image_type
    ))

    conn.commit()
    conn.close()

def get_user_predictions(email):
    """Fetch all predictions for a user"""
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()

    cursor.execute("""
        SELECT filename, defect_class, confidence, image_type, created_at
        FROM panels
        WHERE email=?
        ORDER BY created_at DESC
    """, (email,))

    data = cursor.fetchall()
    conn.close()

    return data