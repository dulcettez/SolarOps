# SolarOps - Solar Panel Defect Detection System
An advanced, economics-aware AI platform designed to detect solar panel defects using YOLO9, supporting both normal and thermal images.

---

## 📋 Table of Contents
- [Problem Statement](#problem-statement)
- [Project Architecture](#project-architecture)
- [Team Structure](#team-structure)
- [Classes](#classes)
- [Results](#results)
- [Tech Stack](#tech-stack)
- [Project Setup](#project-setup)
- [Folder Structure](#folder-structure)
- [How to Run](#how-to-run)

---

## 📌 Problem Statement

Solar panels can develop several defects — like bird droppings, dust accumulation, physical or electrical damage — that reduce their efficiency. The goal of this project is to automatically detect and segment such defects using YOLOv9c-seg, improving maintenance workflows and power-output monitoring.

---

## 🏗️ Project Architecture

```
User uploads image (Frontend)
        ↓
Backend receives image → loads fine-tuned YOLOv9 model
        ↓
Model runs prediction → returns defect class + confidence
        ↓
Result saved to MySQL database (Aiven)
        ↓
Result displayed to user (Frontend)
```

---

## 👥 Team Structure

| Role | Responsibility |
|------|----------------|
| **Model Training** | Training YOLOv9c-seg on normal & thermal images (Colab) |
| **Integration** | Connecting trained models to the backend |
| **Backend** | Flask/FastAPI server, model inference script |
| **Frontend** | User interface for image upload and result display |
| **Database** | MySQL schema design and Aiven cloud setup |

---

## 🏷️ Classes

The model detects and segments **6 defect types**:

1. 🐦 Bird-drop
2. ⚠️ Defective
3. 🌫️ Dusty
4. ⚡ Electrical-Damage
5. ✅ Non-Defective
6. 💥 Physical-Damage

---

## 📊 Results

After training the YOLOv9c-seg model on the custom Solar Panel Defect Detection dataset from Roboflow:

| Metric | Bounding Box | Segmentation Mask |
|--------|-------------|-------------------|
| Precision | 0.786 | 0.779 |
| Recall | 0.715 | 0.689 |
| mAP@50 | 0.776 | 0.736 |
| mAP@50–95 | 0.583 | 0.501 |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Model** | YOLOv9c-seg (Ultralytics) |
| **Training** | Google Colab (GPU T4) |
| **Dataset** | Roboflow |
| **Backend** | Python |
| **Database** | MySQL (Aiven cloud) |
| **Model Storage** | Google Drive |
| **Version Control** | GitHub |

---

## 📁 Folder Structure

```
solar-panel-defect-detection/
│
├── notebooks/
│   ├── normal_image_training.ipynb     # YOLOv9 training on normal images
│   └── thermal_image_training.ipynb    # YOLOv9 training on thermal images
│
├── backend/
│   ├── app.py                          # Main backend server
│   └── model_inference.py              # Model loading and prediction logic
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── .gitignore
└── README.md
```

---

## ⚙️ Project Setup

### Prerequisites
- Python 3.8+
- pip
- Google account (for Colab & Drive)
- Aiven account (for database)

### Install Dependencies
```bash
pip install ultralytics mysql-connector-python flask pillow torch torchvision
```

### Environment Variables
Create a `.env` file in the `backend/` folder (never commit this):
```
DB_HOST=your_aiven_host
DB_PORT=your_port
DB_USER=avnadmin
DB_PASSWORD=your_password
DB_NAME=defaultdb
```

---

## 🚀 How to Run

### 1. Training (Google Colab)
- Open either notebook in `notebooks/`
- Run all cells from top to bottom
- The last cell saves the fine-tuned model to Google Drive

### 2. Backend
```bash
cd backend
python app.py
```

### 3. Frontend
- Open `frontend/index.html` in your browser
- Upload a solar panel image
- View the defect detection result

---

## ⚠️ Important Notes

- `.pt` model files are stored in **Google Drive** (not GitHub — too large)
- Database credentials are stored in `.env` (not committed to GitHub)
- `ca.pem` SSL certificate is required for Aiven database connection (share privately with teammates)
- Always run `git pull` before making changes to avoid conflicts

---

## 📎 Resources

- [Ultralytics YOLOv9 Docs](https://docs.ultralytics.com)
- [Roboflow Dataset](https://roboflow.com)
- [Aiven MySQL](https://aiven.io)
