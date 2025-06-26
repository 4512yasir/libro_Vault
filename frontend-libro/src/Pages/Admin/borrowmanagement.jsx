import React, { useState, useEffect } from "react";
import "../../css/admin.css";

export default function AdminBorrowingManagement() {
  const [borrowings, setBorrowings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchBorrowings();
  }, []);

  const fetchBorrowings = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/borrowings");
      if (!res.ok) throw new Error("Failed to fetch borrowings");

      const data = await res.json();
      setBorrowings(data.filter((b) => !b.returned));
    } catch (error) {
      console.error("Error fetching borrowings:", error);
    }
  };

  const returnBook = async (id) => {
    try {
      const res = await fetch(`http://127.0.0.1:5000/borrowings/return/${id}`, { method: "PUT" });
      if (res.ok) {
        setBorrowings((prev) => prev.filter((b) => b.id !== id));
      } else {
        console.error("Failed to return the book.");
      }
    } catch (error) {
      console.error("Error returning book:", error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const filteredBorrowings = borrowings.filter((b) =>
    b.book_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.member_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="borrowing-page">
      <h2>Borrowing Management</h2>

      <input
        type="text"
        placeholder="Search by book or member..."
        className="borrowing-search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredBorrowings.length === 0 ? (
        <p>No active borrowings found.</p>
      ) : (
        <div className="borrowing-grid">
          {filteredBorrowings.map((b) => (
            <div key={b.id} className="borrowing-card">
              <h3>{b.book_title}</h3>
              <p><strong>Borrowed by:</strong> {b.member_name}</p>
              <p><strong>Borrow Date:</strong> {formatDate(b.borrow_date)}</p>
              <p><strong>Due Date:</strong> {formatDate(b.due_date)}</p>
              <button onClick={() => returnBook(b.id)}>Mark as Returned</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}