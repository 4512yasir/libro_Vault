from flask import Blueprint, request, jsonify
from App.database import db
from App.models import Guest

guests_bp = Blueprint('guests', __name__)

# Register new guest
@guests_bp.route('/', methods=['POST'])
def register_guest():
    data = request.get_json()

    if not data.get('fullName') or not data.get('phone') or not data.get('purpose'):
        return jsonify({"error": "Full Name, Phone, and Purpose are required"}), 400

    new_guest = Guest(
        fullName=data['fullName'],
        phone=data['phone'],
        institution=data.get('institution', ''),
        purpose=data['purpose'],
        date=data.get('date')
    )

    db.session.add(new_guest)
    db.session.commit()

    return jsonify(new_guest.to_dict()), 201

# Get all guests
@guests_bp.route('/', methods=['GET'])
def get_guests():
    guests = Guest.query.all()
    return jsonify([guest.to_dict() for guest in guests]), 200

# Get guest by name
@guests_bp.route('/<string:name>', methods=['GET'])
def get_guest(name):
    guest = Guest.query.filter_by(fullName=name).first()
    if guest:
        return jsonify(guest.to_dict()), 200
    return jsonify({"error": "Guest not found"}), 404
