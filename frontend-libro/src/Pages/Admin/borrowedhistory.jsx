import React, { useState, useEffect } from "react";
import "../../css/admin.css";

export default function AdminBorrowingHistory() {
  const [history, setHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/borrowings");
      if (!res.ok) throw new Error("Failed to fetch borrowings");

      const data = await res.json();
      setHistory(data);
    } catch (error) {
      console.error("Error fetching borrowing history:", error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const filteredHistory = history.filter((h) =>
    h.book_title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    h.member_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="history-page">
      <h2>Borrowing History</h2>

      <input
        type="text"
        placeholder="Search by book or member..."
        className="history-search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredHistory.length === 0 ? (
        <p>No borrowing history available.</p>
      ) : (
        <div className="history-grid">
          {filteredHistory.map((h) => (
            <div key={h.id} className="history-card">
              <h3>{h.book_title}</h3>
              <p><strong>Borrowed by:</strong> {h.member_name}</p>
              <p><strong>Borrow Date:</strong> {formatDate(h.borrow_date)}</p>
              <p><strong>Due Date:</strong> {formatDate(h.due_date)}</p>
              <p>
                <strong>Status: </strong>
                <span className={h.returned ? "returned" : "not-returned"}>
                  {h.returned ? "Returned" : "Not Returned"}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
