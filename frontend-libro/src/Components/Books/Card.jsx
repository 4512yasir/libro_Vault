import React from "react";
import "../../css/books.css";

export default function BookCard({ book, onBorrow, isBorrowed, showBorrowButton }) {
  return (
    <div className="book-card">
      <h3>{book.title}</h3>
      <p>Author: {book.author}</p>

      {showBorrowButton && (
        <button
          onClick={() => onBorrow(book)}
          disabled={isBorrowed}
        >
          {isBorrowed ? "Borrowed" : "Borrow"}
        </button>
      )}
    </div>
  );
}
