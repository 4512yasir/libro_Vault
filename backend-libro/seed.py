from App import create_app
from App.models import db, Book, Member, Guest

app = create_app()

with app.app_context():
    # Clear existing data
    db.session.query(Book).delete()
    db.session.query(Member).delete()
    db.session.query(Guest).delete()

    # Seed Books
    books = [
        Book(title="Clean Code", author="Robert C. Martin", description="A Handbook of Agile Software Craftsmanship", genre="Programming"),
        Book(title="The Pragmatic Programmer", author="Andrew Hunt", description="Your Journey to Mastery", genre="Programming"),
        Book(title="Atomic Habits", author="James Clear", description="An Easy & Proven Way to Build Good Habits & Break Bad Ones", genre="Self-help")
    ]

    # Seed Members
    members = [
        Member(username="admin", email="admin@example.com", role="admin"),
        Member(username="member1", email="member1@example.com", role="member")
    ]

    # Seed Guests
    guests = [
        Guest(full_name="John Doe", phone="0712345678", institution="Nairobi Uni", purpose="Research", date="2025-06-22"),
        Guest(full_name="Jane Smith", phone="0798765432", institution="JKUAT", purpose="Reading", date="2025-06-22")
    ]

    db.session.add_all(books + members + guests)
    db.session.commit()
    print("✅ Seeding completed successfully!")
