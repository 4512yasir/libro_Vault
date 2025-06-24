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
      <h2>Borrowing History</h2>
      {history.length === 0 ? (
        <p>You haven't returned any books yet.</p>
      ) : (
        <div className="history-grid">
          {history.map((entry, index) => (
            <div key={index} className="history-card">
              <h3>{entry.title}</h3>
              <p>Author: {entry.author}</p>
              <p>Returned: {entry.returnedDate}</p>
              <p className="fine">Fine: {entry.fine || "Ksh 0"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
