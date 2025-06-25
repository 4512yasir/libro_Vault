from flask import Blueprint, request, jsonify
from App.database import db
from App.models import Book

books_bp = Blueprint('books', __name__)

# GET all books
@books_bp.route('/', methods=['GET'])
def get_books():
    books = Book.query.all()
    return jsonify([book.to_dict() for book in books]), 200

# GET book by ID
@books_bp.route('/<int:id>', methods=['GET'])
def get_book(id):
    book = Book.query.get(id)
    if not book:
        return jsonify({"error": "Book not found"}), 404
    return jsonify(book.to_dict()), 200

# POST create a new book
@books_bp.route('/', methods=['POST'])
def add_book():
    data = request.get_json()

    if not data.get('title') or not data.get('author'):
        return jsonify({"error": "Title and Author are required"}), 400

    new_book = Book(
        title=data['title'],
        author=data['author'],
        genre=data.get('genre', ''),
        available=data.get('available', True)
    )

    db.session.add(new_book)
    db.session.commit()
    return jsonify(new_book.to_dict()), 201

# PUT update a book
@books_bp.route('/<int:id>', methods=['PUT'])
def update_book(id):
    book = Book.query.get(id)
    if not book:
        return jsonify({"error": "Book not found"}), 404

    data = request.get_json()
    book.title = data.get('title', book.title)
    book.author = data.get('author', book.author)
    book.genre = data.get('genre', book.genre)
    book.available = data.get('available', book.available)

    db.session.commit()
    return jsonify(book.to_dict()), 200

# DELETE a book
@books_bp.route('/<int:id>', methods=['DELETE'])
def delete_book(id):
    book = Book.query.get(id)
    if not book:
        return jsonify({"error": "Book not found"}), 404

    db.session.delete(book)
    db.session.commit()
    return jsonify({"message": "Book deleted successfully"}), 200
