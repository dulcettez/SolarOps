import sqlite3

def init_db():
    """Run once to create tables"""
    conn = sqlite3.connect('solar.db')
    conn.executescript("""
        CREATE TABLE IF NOT EXISTS users (
            email TEXT PRIMARY KEY,
            password TEXT NOT NULL
        );
        
        CREATE TABLE IF NOT EXISTS panels (
            email TEXT NOT NULL,
            panel_id TEXT NOT NULL,
            normal_image BLOB NOT NULL,
            thermal_image BLOB NOT NULL,
            severity TEXT,
            recommended_action TEXT,
            next_maintenance TEXT,
            PRIMARY KEY (email, panel_id),
            FOREIGN KEY (email) REFERENCES users(email)
        );
    """)
    conn.close()

def register_user(email, password):
    """Add new user"""
    conn = sqlite3.connect('solar.db')
    try:
        conn.execute("INSERT INTO users (email, password) VALUES (?, ?)", (email, password))
        conn.commit()
    except sqlite3.IntegrityError:
        print("Email already exists")
    finally:
        conn.close()

def save_panel(email, password, panel_id, normal_path, thermal_path, severity, action, maintenance):
    """Upload or overwrite panel (only for this user)"""
    conn = sqlite3.connect('solar.db')
    cursor = conn.cursor()
    
    # Verify login
    cursor.execute("SELECT 1 FROM users WHERE email=? AND password=?", (email, password))
    if not cursor.fetchone():
        raise Exception("Invalid email or password")
    
    # Read image files as binary
    with open(normal_path, 'rb') as f:
        normal_blob = f.read()
    with open(thermal_path, 'rb') as f:
        thermal_blob = f.read()
    
    # Insert or overwrite (ON CONFLICT = same email+panel_id)
    cursor.execute("""
        INSERT INTO panels (email, panel_id, normal_image, thermal_image, severity, recommended_action, next_maintenance)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(email, panel_id) 
        DO UPDATE SET
            normal_image=excluded.normal_image,
            thermal_image=excluded.thermal_image,
            severity=excluded.severity,
            recommended_action=excluded.recommended_action,
            next_maintenance=excluded.next_maintenance
    """, (email, panel_id, normal_blob, thermal_blob, severity, action, maintenance))
    
    conn.commit()
    conn.close()

def get_panels(email, password):
    """Get all panels for logged-in user"""
    conn = sqlite3.connect('solar.db')
    cursor = conn.cursor()
    
    # Verify login
    cursor.execute("SELECT email FROM users WHERE email=? AND password=?", (email, password))
    if not cursor.fetchone():
        return None
    
    cursor.execute("""
        SELECT panel_id, normal_image, severity, next_maintenance, recommended_action 
        FROM panels 
        WHERE email=?
    """, (email,))
    
    panels = cursor.fetchall()
    conn.close()
    return panels

def get_panel_by_id(email, password, panel_id):
    """Get specific panel for user"""
    conn = sqlite3.connect('solar.db')
    cursor = conn.cursor()
    
    cursor.execute("SELECT 1 FROM users WHERE email=? AND password=?", (email, password))
    if not cursor.fetchone():
        return None
    
    cursor.execute("""
        SELECT panel_id, normal_image, severity, next_maintenance, recommended_action 
        FROM panels 
        WHERE email=? AND panel_id=?
    """, (email, panel_id))
    
    panel = cursor.fetchone()
    conn.close()
    return panel