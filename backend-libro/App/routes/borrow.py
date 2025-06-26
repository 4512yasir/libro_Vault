from flask import Blueprint, request, jsonify
from datetime import datetime, timedelta
from App.database import db
from App.models import Borrowing, Book

borrowing_bp = Blueprint('borrowing', __name__)

# ✅ Borrow a Book
@borrowing_bp.route('/', methods=['POST'])
def borrow_book():
    data = request.get_json()

    if not data.get('member_id') or not data.get('book_id'):
        return jsonify({"error": "Member ID and Book ID are required"}), 400

    book = Book.query.get(data['book_id'])
    if not book:
        return jsonify({"error": "Book not found"}), 404

    if not book.available:
        return jsonify({"error": "Book is already borrowed"}), 400

    new_borrowing = Borrowing(
        member_id=data['member_id'],
        book_id=data['book_id'],
        borrow_date=datetime.now().strftime('%Y-%m-%d'),
        due_date=(datetime.now() + timedelta(days=14)).strftime('%Y-%m-%d'),
        returned=False
    )

    book.available = False  # Mark book as unavailable
    db.session.add(new_borrowing)
    db.session.commit()

    return jsonify(new_borrowing.to_dict()), 201

# ✅ Return a Book
@borrowing_bp.route('/return/<int:borrow_id>', methods=['PUT'])
def return_book(borrow_id):
    borrowing = Borrowing.query.get(borrow_id)
    if not borrowing:
        return jsonify({"error": "Borrow record not found"}), 404

    borrowing.returned = True

    book = Book.query.get(borrowing.book_id)
    if book:
        book.available = True

    db.session.commit()
    return jsonify({"message": "Book returned successfully"}), 200

@borrowing_bp.route('/', methods=['GET'])
def get_borrowings():
    borrowings = Borrowing.query.all()
    result = []

    for b in borrowings:
        book = Book.query.get(b.book_id)
        member = b.member  # Assuming you have a relationship set up: Borrowing -> Member

        result.append({
            "id": b.id,
            "book_id": b.book_id,
            "book_title": book.title if book else "Unknown Book",
            "member_id": b.member_id,
            "member_name": member.username if member else "Unknown Member",
            "borrow_date": b.borrow_date,
            "due_date": b.due_date,
            "returned": b.returned
        })

    return jsonify(result), 200


# ✅ Get a Member's Borrowing History
@borrowing_bp.route('/member/<int:member_id>', methods=['GET'])
def member_history(member_id):
    borrowings = Borrowing.query.filter_by(member_id=member_id).all()
    return jsonify([b.to_dict() for b in borrowings]), 200
