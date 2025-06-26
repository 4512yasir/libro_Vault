from flask import Blueprint, request, jsonify
from App.database import db
from App.models import Member

members_bp = Blueprint('members', __name__)


@members_bp.route('/', methods=['GET'])
def get_members():
    members = Member.query.all()
    return jsonify([member.to_dict() for member in members]), 200


@members_bp.route('/<int:id>', methods=['GET'])
def get_member(id):
    member = Member.query.get(id)
    if not member:
        return jsonify({"error": "Member not found"}), 404
    return jsonify(member.to_dict()), 200


@members_bp.route('/', methods=['POST'])
def add_member():
    data = request.get_json()

    if not data.get('username') or not data.get('role'):
        return jsonify({"error": "Username and Role are required"}), 400

    new_member = Member(
        username=data['username'],
        role=data['role']
    )

    db.session.add(new_member)
    db.session.commit()

    return jsonify(new_member.to_dict()), 201



@members_bp.route('/<int:id>', methods=['PUT'])
def update_member(id):
    member = Member.query.get(id)
    if not member:
        return jsonify({"error": "Member not found"}), 404

    data = request.get_json()
    member.username = data.get('username', member.username)
    member.role = data.get('role', member.role)

    db.session.commit()
    return jsonify(member.to_dict()), 200

# Delete member
@members_bp.route('/<int:id>', methods=['DELETE'])
def delete_member(id):
    member = Member.query.get(id)
    if not member:
        return jsonify({"error": "Member not found"}), 404

    db.session.delete(member)
    db.session.commit()
    return jsonify({"message": "Member deleted successfully"}), 200
