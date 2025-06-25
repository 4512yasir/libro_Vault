from flask import Flask
from flask_cors import CORS
from App.database import db  

def create_app():
    app = Flask(__name__)
    
    # Configuration
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///../db/libro_vault.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = 'your_secret_key_here'

    # Initialize extensions
    db.init_app(app)
    CORS(app)

    
    from App.routes.books import books_bp
    from App.routes.member import members_bp
    from App.routes.guest import guests_bp

    # Register blueprints
    app.register_blueprint(books_bp, url_prefix='/books')
    app.register_blueprint(members_bp, url_prefix='/members')
    app.register_blueprint(guests_bp, url_prefix='/guests')

    return app
