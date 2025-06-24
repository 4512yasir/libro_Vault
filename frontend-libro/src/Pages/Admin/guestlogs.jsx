import React, { useState, useEffect } from "react";
import "../../css/admin.css";

export default function AdminGuestLogs() {
  const [guestLogs, setGuestLogs] = useState([]);

  useEffect(() => {
    const storedLogs = JSON.parse(localStorage.getItem("guestUsers")) || [];
    setGuestLogs(storedLogs);
  }, []);

  return (
    <div className="guest-logs-page">
      <h2>Guest Logs</h2>

      {guestLogs.length === 0 ? (
        <p>No guest logs found.</p>
      ) : (
        <div className="guest-log-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Institution</th>
                <th>Purpose</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {guestLogs.map((guest, index) => (
                <tr key={index}>
                  <td>{guest.fullName}</td>
                  <td>{guest.phone}</td>
                  <td>{guest.institution}</td>
                  <td>{guest.purpose}</td>
                  <td>{guest.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
