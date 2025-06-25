from flask import Blueprint, request, jsonify
from App.database import db
from App.models import Genre

genre_bp = Blueprint('genre', __name__)

# Get all genres
@genre_bp.route('/', methods=['GET'])
def get_genres():
    genres = Genre.query.all()
    return jsonify([genre.to_dict() for genre in genres]), 200

# Add a new genre
@genre_bp.route('/', methods=['POST'])
def add_genre():
    data = request.get_json()
    name = data.get('name')

    if not name:
        return jsonify({"error": "Genre name is required"}), 400

    new_genre = Genre(name=name)
    db.session.add(new_genre)
    db.session.commit()
    return jsonify(new_genre.to_dict()), 201

# Delete a genre
@genre_bp.route('/<int:id>', methods=['DELETE'])
def delete_genre(id):
    genre = Genre.query.get(id)
    if not genre:
        return jsonify({"error": "Genre not found"}), 404

    db.session.delete(genre)
    db.session.commit()
    return jsonify({"message": "Genre deleted successfully"}), 200
