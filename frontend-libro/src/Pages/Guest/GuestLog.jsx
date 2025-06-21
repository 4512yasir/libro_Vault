import React, { useEffect, useState } from "react";
import "../../css/guest-content.css"

export default function GuestLog() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/guest-logs") 
      .then((res) => res.json())
      .then((data) => setLogs(data))
      .catch((err) => console.error("Error fetching logs:", err));
  }, []);

  return (
    <div className="page-container">
      <h2>Your Guest Logs</h2>
      <ul>
        {logs.length === 0 ? (
          <p>No activity logs found.</p>
        ) : (
          logs.map((log) => (
            <li key={log.id}>
              {log.action} at {log.timestamp}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
