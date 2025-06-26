import React, { useState, useEffect } from "react";
import "../../css/guest-content.css";

export default function GuestLog() {
  const [logs, setLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/guests")
      .then((r) => r.json())
      .then((data) => {
        setLogs(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching guest logs:", error);
        setLoading(false);
      });
  }, []);

  const filteredLogs = logs.filter((g) =>
    g.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (g.institution && g.institution.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="guest-log-page">
      <h2>Guest Visit Logs</h2>

      <input
        type="text"
        placeholder="Search by name or institution..."
        className="guest-log-search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading ? (
        <p className="loading">Loading guest logs...</p>
      ) : filteredLogs.length === 0 ? (
        <p className="empty-message">No guest logs found.</p>
      ) : (
        <div className="guest-log-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Institution</th>
                <th>Purpose</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((g, index) => (
                <tr key={index}>
                  <td>{g.full_name}</td>
                  <td>{g.institution || "N/A"}</td>
                  <td>{g.purpose || "N/A"}</td>
                  <td>{g.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
