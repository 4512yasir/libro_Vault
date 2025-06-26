from flask import Blueprint, request, jsonify
from App.database import db
from App.models import Inventory

inventory_bp = Blueprint('inventory', __name__)

# Get all inventory items
@inventory_bp.route('/', methods=['GET'])
def get_inventory():
    items = Inventory.query.all()
    return jsonify([item.to_dict() for item in items]), 200

# Add a new inventory item
@inventory_bp.route('/', methods=['POST'])
def add_inventory():
    data = request.get_json()

    if not data.get('name') or not data.get('category'):
        return jsonify({"error": "Name and Category are required"}), 400

    new_item = Inventory(
        name=data['name'],
        category=data['category'],
        quantity=data.get('quantity', 1)
    )

    db.session.add(new_item)
    db.session.commit()

    return jsonify(new_item.to_dict()), 201

# Update inventory item
@inventory_bp.route('/<int:id>', methods=['PUT'])
def update_inventory(id):
    item = Inventory.query.get(id)
    if not item:
        return jsonify({"error": "Item not found"}), 404

    data = request.get_json()
    item.name = data.get('name', item.name)
    item.category = data.get('category', item.category)
    item.quantity = data.get('quantity', item.quantity)

    db.session.commit()
    return jsonify(item.to_dict()), 200

# Delete inventory item
@inventory_bp.route('/<int:id>', methods=['DELETE'])
def delete_inventory(id):
    item = Inventory.query.get(id)
    if not item:
        return jsonify({"error": "Item not found"}), 404

    db.session.delete(item)
    db.session.commit()
    return jsonify({"message": "Item deleted successfully"}), 200
