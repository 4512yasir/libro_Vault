from flask import Blueprint, jsonify


members_bp = Blueprint('members', __name__)


@members_bp.route('/', methods=['GET'])
def get_members():
    return jsonify({"message": "Members route is working"})
