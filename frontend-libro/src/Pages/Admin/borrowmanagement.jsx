import React, { useState, useEffect } from "react";
import "../../css/admin.css";

export default function AdminBorrowingManagement() {
  const [borrowings, setBorrowings] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("borrowedBooks")) || [];
    setBorrowings(data);
  }, []);

  const handleReturn = (index) => {
    const updatedBorrowings = [...borrowings];
    updatedBorrowings.splice(index, 1);
    setBorrowings(updatedBorrowings);
    localStorage.setItem("borrowedBooks", JSON.stringify(updatedBorrowings));
  };

  return (
    <div className="borrowing-page">
      <h2>Borrowing Management</h2>

      {borrowings.length === 0 ? (
        <p>No active borrowings.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Book Title</th>
              <th>Borrower</th>
              <th>Borrow Date</th>
              <th>Due Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {borrowings.map((item, index) => (
              <tr key={index}>
                <td>{item.title}</td>
                <td>{item.borrower}</td>
                <td>{item.borrowDate}</td>
                <td>{item.dueDate}</td>
                <td>
                  <button onClick={() => handleReturn(index)}>Return Book</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
