from flask import Blueprint, jsonify

# Create the blueprint
books_bp = Blueprint('books', __name__)

# Example route
@books_bp.route('/', methods=['GET'])
def get_books():
    return jsonify({"message": "Books route is working"})
