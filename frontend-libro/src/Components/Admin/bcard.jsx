import React from "react";

export default function BookCard({ book, onDelete, onEdit }) {
  return (
    <div className="book-card">
      <h4>{book.title}</h4>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Genre:</strong> {book.genre}</p>
      <p><strong>Copies:</strong> {book.copies}</p>
      <button onClick={onEdit}>Edit</button>
      <button onClick={() => onDelete(book.id)}>Delete</button>
    </div>
  );
}