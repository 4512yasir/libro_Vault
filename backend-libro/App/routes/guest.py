from flask import Blueprint, request, jsonify
from App.database import db
from App.models import Guest
from datetime import datetime

guests_bp = Blueprint('guests', __name__)

# Register a new guest
@guests_bp.route('/', methods=['POST'])
def register_guest():
    data = request.get_json()

    if not data.get('full_name') or not data.get('phone'):
        return jsonify({"error": "Full name and phone are required"}), 400

    new_guest = Guest(
        full_name=data['full_name'],
        phone=data['phone'],
        institution=data.get('institution', ''),
        purpose=data.get('purpose', ''),
        date=datetime.now().strftime('%Y-%m-%d')
    )

    db.session.add(new_guest)
    db.session.commit()

    return jsonify(new_guest.to_dict()), 201

# Get all guests
@guests_bp.route('/', methods=['GET'])
def get_guests():
    guests = Guest.query.all()
    return jsonify([guest.to_dict() for guest in guests]), 200

# Get a guest by ID
@guests_bp.route('/<int:id>', methods=['GET'])
def get_guest(id):
    guest = Guest.query.get(id)
    if not guest:
        return jsonify({"error": "Guest not found"}), 404
    return jsonify(guest.to_dict()), 200

# Delete a guest
@guests_bp.route('/<int:id>', methods=['DELETE'])
def delete_guest(id):
    guest = Guest.query.get(id)
    if not guest:
        return jsonify({"error": "Guest not found"}), 404

    db.session.delete(guest)
    db.session.commit()
    return jsonify({"message": "Guest deleted successfully"}), 200
