import React, { useState, useEffect } from "react";
import "../../css/admin.css";

export default function AdminBorrowingHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/borrowings/')
      .then(response => response.json())
      .then(data => setHistory(data))
      .catch(error => console.error("Error fetching history:", error));
  }, []);

  return (
    <div className="borrowing-page">
      <h2>Borrowing History</h2>

      {history.length === 0 ? (
        <p>No borrowing history available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Member ID</th>
              <th>Book ID</th>
              <th>Borrow Date</th>
              <th>Due Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item) => (
              <tr key={item.id}>
                <td>{item.member_id}</td>
                <td>{item.book_id}</td>
                <td>{item.borrow_date}</td>
                <td>{item.due_date}</td>
                <td>{item.returned ? "Returned" : "Borrowed"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
