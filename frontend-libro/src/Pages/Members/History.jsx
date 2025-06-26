import React, { useEffect, useState } from "react";
import "../../css/member.css";

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("borrowHistory")) || [];
    setHistory(savedHistory);
  }, []);

  return (
    <div className="member-history">
      <h2>📜 Your Borrowing History</h2>

      {history.length === 0 ? (
        <div className="empty-history">
          <p>You haven't returned any books yet.</p>
          <img src="https://cdn-icons-png.flaticon.com/512/4076/4076503.png" alt="No History" />
        </div>
      ) : (
        <div className="history-grid">
          {history.map((entry, index) => (
            <div key={index} className="history-card">
              <h3>{entry.title}</h3>
              <p><strong>Author:</strong> {entry.author}</p>
              <p><strong>Returned:</strong> {entry.returnedDate}</p>
              <span className="fine-badge">{entry.fine || "Ksh 0"}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
