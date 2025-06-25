from App.database import db


class Book(db.Model):
    __tablename__ = 'books'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    author = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    genre = db.Column(db.String(100))
    available = db.Column(db.Boolean, default=True)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "author": self.author,
            "description": self.description,
            "genre": self.genre,
            "available": self.available
        }

class Member(db.Model):
    __tablename__ = 'members'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    role = db.Column(db.String(50), default="member")

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "role": self.role
        }

class Guest(db.Model):
    __tablename__ = 'guests'

    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(50), nullable=False)
    institution = db.Column(db.String(100))
    purpose = db.Column(db.Text)
    date = db.Column(db.String(50))

    def to_dict(self):
        return {
            "id": self.id,
            "full_name": self.full_name,
            "phone": self.phone,
            "institution": self.institution,
            "purpose": self.purpose,
            "date": self.date
        }
class Borrowing(db.Model):
    __tablename__ = 'borrowings'

    id = db.Column(db.Integer, primary_key=True)
    member_id = db.Column(db.Integer, db.ForeignKey('members.id'))
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'))
    borrow_date = db.Column(db.String)
    due_date = db.Column(db.String)
    returned = db.Column(db.Boolean, default=False)

    def to_dict(self):
        return {
            "id": self.id,
            "member_id": self.member_id,
            "book_id": self.book_id,
            "borrow_date": self.borrow_date,
            "due_date": self.due_date,
            "returned": self.returned
        }
class Inventory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(50), nullable=False)  
    quantity = db.Column(db.Integer, default=1)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "category": self.category,
            "quantity": self.quantity
        }

class Genre(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name
        }


