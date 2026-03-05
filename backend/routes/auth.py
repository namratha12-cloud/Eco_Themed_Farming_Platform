from flask import Blueprint, request, jsonify  # pyre-ignore[21]
from werkzeug.security import generate_password_hash, check_password_hash  # pyre-ignore[21]
from db.config import get_db  # pyre-ignore[21]

auth = Blueprint('auth', __name__)

@auth.post("/register")
def register():
    data = request.json
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    phone = data.get("phone")
    location = data.get("location")

    if not email or not password or not name:
        return jsonify({"error": "Missing fields"}), 400

    db = get_db()
    cursor = db.cursor()

    # Check if email exists
    cursor.execute("SELECT * FROM farmers WHERE email=?", (email,))
    existing = cursor.fetchone()
    if existing:
        return jsonify({"error": "Email already exists"}), 409

    hashed_pw = generate_password_hash(password)

    cursor.execute("""
        INSERT INTO farmers (name, email, password_hash, phone, location)
        VALUES (?, ?, ?, ?, ?)
    """, (name, email, hashed_pw, phone, location))

    db.commit()

    return jsonify({"message": "Farmer registered successfully!"}), 201



@auth.post("/login")
def login():
    data = request.json
    db = get_db()
    cursor = db.cursor()

    # Query without dictionary=True (it's in Row factory)
    cursor.execute("SELECT * FROM farmers WHERE email=?", (data["email"],))
    farmer = cursor.fetchone()

    if farmer and check_password_hash(farmer["password_hash"], data["password"]):
        return jsonify({"authenticated": True, "farmer_id": farmer["id"]}), 200

    return jsonify({"authenticated": False}), 401


@auth.get("/profile")
def get_profile():
    farmer_id = request.args.get("farmer_id")
    if not farmer_id:
        return jsonify({"error": "farmer_id required"}), 400
    
    db = get_db()
    cursor = db.cursor()
    cursor.execute("SELECT id, name, email, phone, location FROM farmers WHERE id=?", (farmer_id,))
    farmer = cursor.fetchone()
    
    if farmer:
        return jsonify(dict(farmer)), 200
    return jsonify({"error": "Farmer not found"}), 404

@auth.post("/update-profile")
def update_profile():
    data = request.json
    farmer_id = data.get("farmer_id")
    if not farmer_id:
        return jsonify({"error": "farmer_id required"}), 400
    
    db = get_db()
    cursor = db.cursor()
    
    cursor.execute("""
        UPDATE farmers 
        SET name=?, email=?, phone=?, location=?
        WHERE id=?
    """, (data.get("name"), data.get("email"), data.get("phone"), data.get("location"), farmer_id))
    
    db.commit()
    return jsonify({"message": "Profile updated successfully"}), 200
