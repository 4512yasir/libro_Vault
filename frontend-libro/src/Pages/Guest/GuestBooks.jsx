import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../css/guest-content.css";

export default function GuestBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Simulated guest books from localStorage
    const dummyBooks = JSON.parse(localStorage.getItem("guestBooks")) || [
      { id: 1, title: "Clean Code", author: "Robert C. Martin", description: "A handbook of agile software craftsmanship." },
      { id: 2, title: "Atomic Habits", author: "James Clear", description: "An easy way to build good habits and break bad ones." },
      { id: 3, title: "The Pragmatic Programmer", author: "Andrew Hunt", description: "Tips for software engineers." }
    ];
    setBooks(dummyBooks);
    localStorage.setItem("guestBooks", JSON.stringify(dummyBooks)); // Save for later use
  }, []);

  return (
    <div className="guest-booklist">
      <h2>Available Books (Guest Access)</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id} className="book-list-item">
            <Link to={`/guest-book/${book.id}`}>{book.title} by {book.author}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
