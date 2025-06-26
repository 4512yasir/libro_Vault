import React from "react";
import "../../css/books.css";

export default function BookCard({ book, onBorrow, isBorrowed, showBorrowButton }) {
  return (
    <div className="book-card">
      <h3 className="book-title">{book.title}</h3>
      <p className="book-author"><strong>Author:</strong> {book.author}</p>
      {book.genre && <p className="book-genre"><strong>Genre:</strong> {book.genre}</p>}
      {book.description && <p className="book-description">{book.description.slice(0, 100)}...</p>}

      {showBorrowButton && (
        <button
          className={`borrow-button ${isBorrowed ? "borrowed" : ""}`}
          onClick={() => onBorrow(book)}
          disabled={isBorrowed}
        >
          {isBorrowed ? "Borrowed" : "Borrow"}
        </button>
      )}
    </div>
  );
}
