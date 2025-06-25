from flask import Blueprint, request, jsonify

guests_bp = Blueprint('guests', __name__)


guests = []

@guests_bp.route('/', methods=['POST'])
def register_guest():
    data = request.get_json()
    guests.append(data)
    return jsonify({"message": "Guest registered successfully", "guest": data}), 201

# Get all guests
@guests_bp.route('/', methods=['GET'])
def get_guests():
    return jsonify({"guests": guests})

# Get a single guest by name (temporary lookup)
@guests_bp.route('/<string:name>', methods=['GET'])
def get_guest(name):
    guest = next((g for g in guests if g.get('fullName') == name), None)
    if guest:
        return jsonify(guest)
    return jsonify({"error": "Guest not found"}), 404
