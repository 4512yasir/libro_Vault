import React from "react";
import "../../css/books.css"

export default function BookCard({ book }) {
  return (
    <div className="book-card">
      <img src={book.cover} alt={book.title} className="book-cover" />
      <h3>{book.title}</h3>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Genre:</strong> {book.genre}</p>
      <p><strong>Status:</strong> {book.available ? "Available" : "Borrowed"}</p>
    </div>
  );
}
