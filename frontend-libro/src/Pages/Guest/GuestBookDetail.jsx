import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import "../../css/guest-content.css";

export default function GuestBookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const allBooks = JSON.parse(localStorage.getItem("guestBooks")) || [];
    const foundBook = allBooks.find((b) => String(b.id) === id);
    setBook(foundBook);

    if (user?.role === "guest" && foundBook) {
      const guestLog = JSON.parse(localStorage.getItem("guestBookLog")) || [];
      const alreadyLogged = guestLog.find((b) => b.id === foundBook.id);
      if (!alreadyLogged) {
        guestLog.push(foundBook);
        localStorage.setItem("guestBookLog", JSON.stringify(guestLog));
      }
    }
  }, [id]);

  if (!user || user.role !== "guest") {
    return <Navigate to="/guest" />;
  }

  if (!book) {
    return <p className="loading">Loading book details...</p>;
  }

  return (
    <div className="guest-book-details">
      <h2>{book.title}</h2>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Description:</strong> {book.description}</p>
    </div>
  );
}
