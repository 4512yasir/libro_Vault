import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../css/admin.css";

export default function GuestBooks() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/books")
      .then((r) => r.json())
      .then((data) => {
        setBooks(data);
        localStorage.setItem("guestBooks", JSON.stringify(data));
      })
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  const filteredBooks = books.filter((b) =>
    b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="guest-books-page">
      <h2>Available Books</h2>

      <input
        type="text"
        placeholder="Search by title or author..."
        className="guest-search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredBooks.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <div className="book-grid">
          {filteredBooks.map((b) => (
            <Link to={`/guest-book/${b.id}`} key={b.id} className="book-card">
              <h3>{b.title}</h3>
              <p>by {b.author}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
