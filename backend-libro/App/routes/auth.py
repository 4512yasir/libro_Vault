from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from App.database import db
from App.models import Member

# Blueprint definition
auth_bp = Blueprint('auth', __name__)

# Register with Password Hashing
@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    role = data.get('role', 'member')

    if not username or not email or not password:
        return jsonify({"error": "Username, Email, and Password are required"}), 400

    hashed_password = generate_password_hash(password)

    new_member = Member(username=username, email=email, password=hashed_password, role=role)

    db.session.add(new_member)
    db.session.commit()

    return jsonify({"message": "User registered successfully", "user": new_member.to_dict()}), 201


# Login with Password Check
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "Username and Password are required"}), 400

    member = Member.query.filter_by(username=username).first()

    if not member or not check_password_hash(member.password, password):
        return jsonify({"error": "Invalid credentials"}), 401

    return jsonify({"message": "Login successful", "user": member.to_dict()}), 200
