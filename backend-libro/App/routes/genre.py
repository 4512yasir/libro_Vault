from flask import Blueprint, request, jsonify
from App.database import db
from App.models import Genre

genre_bp = Blueprint('genres', __name__)

# Get all genres
@genre_bp.route('/', methods=['GET'])
def get_genres():
    genres = Genre.query.all()
    return jsonify([genre.to_dict() for genre in genres]), 200

# Add a new genre
@genre_bp.route('/', methods=['POST'])
def add_genre():
    data = request.get_json()

    if not data.get('name'):
        return jsonify({"error": "Genre name is required"}), 400

    new_genre = Genre(name=data['name'])
    db.session.add(new_genre)
    db.session.commit()

    return jsonify(new_genre.to_dict()), 201

# Update a genre
@genre_bp.route('/<int:id>', methods=['PUT'])
def update_genre(id):
    genre = Genre.query.get(id)
    if not genre:
        return jsonify({"error": "Genre not found"}), 404

    data = request.get_json()
    genre.name = data.get('name', genre.name)
    db.session.commit()

    return jsonify(genre.to_dict()), 200

# Delete a genre
@genre_bp.route('/<int:id>', methods=['DELETE'])
def delete_genre(id):
    genre = Genre.query.get(id)
    if not genre:
        return jsonify({"error": "Genre not found"}), 404

    db.session.delete(genre)
    db.session.commit()

    return jsonify({"message": "Genre deleted successfully"}), 200
