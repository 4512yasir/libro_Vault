from flask import Blueprint, jsonify
from App.models import Book

inventory_bp = Blueprint('inventory', __name__)

# Get inventory summary
@inventory_bp.route('/', methods=['GET'])
def get_inventory():
    books = Book.query.all()
    total_books = len(books)
    available_books = len([book for book in books if book.available])
    borrowed_books = total_books - available_books

    return jsonify({
        "total_books": total_books,
        "available_books": available_books,
        "borrowed_books": borrowed_books
    }), 200
