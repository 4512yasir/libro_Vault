import React, { useState, useEffect } from "react";
import "../../css/admin.css";

export default function AdminBorrowingManagement() {
  const [borrowings, setBorrowings] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/borrowings/')
      .then(response => response.json())
      .then(data => setBorrowings(data))
      .catch(error => console.error("Error fetching borrowings:", error));
  }, []);

  const handleReturn = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/borrowings/return/${id}`, {
        method: 'PUT',
      });

      if (response.ok) {
        alert("Book returned successfully");
        setBorrowings(borrowings.filter(borrow => borrow.id !== id));
      } else {
        alert("Error returning book.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
              <th>Member ID</th>
              <th>Book ID</th>
              <th>Borrow Date</th>
              <th>Due Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {borrowings.filter(b => !b.returned).map((item) => (
              <tr key={item.id}>
                <td>{item.member_id}</td>
                <td>{item.book_id}</td>
                <td>{item.borrow_date}</td>
                <td>{item.due_date}</td>
                <td>
                  <button onClick={() => handleReturn(item.id)}>Return Book</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
