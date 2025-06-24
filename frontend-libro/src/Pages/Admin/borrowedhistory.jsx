import React, { useState, useEffect } from "react";
import "../../css/admin.css";

export default function AdminBorrowingHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("borrowHistory")) || [];
    setHistory(data);
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
              <th>Book Title</th>
              <th>Borrower</th>
              <th>Borrow Date</th>
              <th>Return Date</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, index) => (
              <tr key={index}>
                <td>{item.title}</td>
                <td>{item.borrower}</td>
                <td>{item.borrowDate}</td>
                <td>{item.returnDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
