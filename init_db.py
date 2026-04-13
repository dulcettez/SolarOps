import mysql.connector
import ssl

conn = mysql.connector.connect(
    host="YOUR_HOST",           # from Aiven overview
    port=12345,                 # your port number
    user="avnadmin",
    password="YOUR_PASSWORD",
    database="defaultdb",
    ssl_ca="ca.pem",            # path to the CA cert you downloaded
    ssl_verify_cert=True
)

cursor = conn.cursor()

cursor.execute("""
    CREATE TABLE IF NOT EXISTS uploaded_images (
        id INT AUTO_INCREMENT PRIMARY KEY,
        filename VARCHAR(255) NOT NULL,
        file_path VARCHAR(500),
        defect_class VARCHAR(50),
        confidence FLOAT,
        uploaded_by VARCHAR(100),
        upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
""")

conn.commit()
print("Table created successfully!")
cursor.close()
conn.close()