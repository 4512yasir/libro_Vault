import React, { useState, useEffect } from "react";
import "../../css/admin.css";

export default function AdminGuestLogs() {
  const [guestLogs, setGuestLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const storedLogs = JSON.parse(localStorage.getItem("guestUsers")) || [];
    // Sort by latest date
    const sortedLogs = storedLogs.sort((a, b) => new Date(b.date) - new Date(a.date));
    setGuestLogs(sortedLogs);
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const filteredLogs = guestLogs.filter((guest) =>
    guest.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guest.institution.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const downloadCSV = () => {
    const headers = ["Name", "Phone", "Institution", "Purpose", "Date"];
    const rows = guestLogs.map((guest) => [
      guest.fullName,
      guest.phone,
      guest.institution,
      guest.purpose,
      guest.date,
    ]);

    let csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n" 
      + rows.map((row) => row.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "guest_logs.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="guest-logs-page">
      <h2>Guest Logs</h2>

      <div className="guest-actions">
        <input
          type="text"
          placeholder="Search by name or institution..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="guest-search"
        />
        <button onClick={downloadCSV} className="download-btn">
          Download CSV
        </button>
      </div>

      {filteredLogs.length === 0 ? (
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
              {filteredLogs.map((guest, index) => (
                <tr key={index}>
                  <td>{guest.fullName}</td>
                  <td>{guest.phone}</td>
                  <td>{guest.institution}</td>
                  <td>{guest.purpose}</td>
                  <td>{formatDate(guest.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
