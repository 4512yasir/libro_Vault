import React, { useEffect, useState } from "react";
import "../../css/member.css";

export default function BorrowedBooks() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("borrowedBooks")) || [];
    setBorrowedBooks(stored);
  }, []);

  const handleReturn = (book) => {
    const updatedBorrowed = borrowedBooks.filter(b => b.id !== book.id);
    setBorrowedBooks(updatedBorrowed);
    localStorage.setItem("borrowedBooks", JSON.stringify(updatedBorrowed));

    // Save to history
    const history = JSON.parse(localStorage.getItem("borrowHistory")) || [];
    const returnEntry = {
      ...book,
      returnedDate: new Date().toISOString().split("T")[0],
      fine: "Ksh 0", // we can simulate late fee later
    };
    localStorage.setItem("borrowHistory", JSON.stringify([...history, returnEntry]));

    alert(`Returned "${book.title}"`);
  };

  return (
    <div className="borrowed-books-page">
      <h2>Borrowed Books</h2>
      {borrowedBooks.length === 0 ? (
        <p>You have not borrowed any books yet.</p>
      ) : (
        <div className="borrowed-book-grid">
          {borrowedBooks.map((book) => (
            <div key={book.id} className="borrowed-book-card">
              <h3>{book.title}</h3>
              <p>Author: {book.author}</p>
              <button onClick={() => handleReturn(book)}>Return</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
