from flask import Flask
from flask_cors import CORS
from App.models import db, Book, Member, Guest

def create_app():
    app = Flask(__name__)

    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///../db/libro_vault.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = 'your_secret_key_here'

    db.init_app(app)
    CORS(app)

    # Import blueprints
    from App.routes.books import books_bp
    from App.routes.member import members_bp
    from App.routes.guest import guests_bp
    from App.routes.borrow import borrowing_bp
    from App.routes.inventory import inventory_bp  
    from App.routes.genre import genre_bp          

    # Register blueprints
    app.register_blueprint(books_bp, url_prefix='/books')
    app.register_blueprint(members_bp, url_prefix='/members')
    app.register_blueprint(guests_bp, url_prefix='/guests')
    app.register_blueprint(borrowing_bp, url_prefix='/borrowings')
    app.register_blueprint(inventory_bp, url_prefix='/inventory')  
    app.register_blueprint(genre_bp, url_prefix='/genres')         

    return app
