import React, { useEffect, useState } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import "../../css/guest-content.css";

export default function GuestBookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const allBooks = JSON.parse(localStorage.getItem("guestBooks")) || [];
    const foundBook = allBooks.find((b) => String(b.id) === id);
    setBook(foundBook);
    setLoading(false);

    if (user?.role === "guest" && foundBook) {
      const guestLog = JSON.parse(localStorage.getItem("guestBookLog")) || [];
      const alreadyLogged = guestLog.find((b) => b.id === foundBook.id);
      if (!alreadyLogged) {
        guestLog.push(foundBook);
        localStorage.setItem("guestBookLog", JSON.stringify(guestLog));
      }
    }
  }, [id, user]);

  if (!user || user.role !== "guest") {
    return <Navigate to="/guest" />;
  }

  if (loading) {
    return <p className="loading">Loading book details...</p>;
  }

  if (!book) {
    return <div className="error-message">Book not found. Please go back and select another book.</div>;
  }

  return (
    <div className="guest-book-details">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      <h2 className="book-title">{book.title}</h2>
      <p className="book-author"><strong>Author:</strong> {book.author}</p>
      <p className="book-description"><strong>Description:</strong> {book.description}</p>
      {book.genre && <p className="book-genre"><strong>Genre:</strong> {book.genre}</p>}
      {book.published_date && <p className="book-date"><strong>Published:</strong> {book.published_date}</p>}
    </div>
  );
}
