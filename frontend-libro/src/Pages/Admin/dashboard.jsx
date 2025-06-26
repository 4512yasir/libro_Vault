import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { Book, Users, LogOut, ClipboardList, PackagePlus, PlusCircle } from "lucide-react";
import "../../css/admin.css";

export default function AdminDashboard() {
  const [stats, setStats] = useState([]);
  const [recentGuests, setRecentGuests] = useState([]);
  const [recentBorrows, setRecentBorrows] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const books = JSON.parse(localStorage.getItem("books")) || [];
    const members = JSON.parse(localStorage.getItem("members")) || [];
    const borrows = JSON.parse(localStorage.getItem("borrowedBooks")) || [];
    const guests = JSON.parse(localStorage.getItem("guestUsers")) || [];
    const inventory = JSON.parse(localStorage.getItem("inventory")) || [];

    setStats([
      { label: "Total Books", value: books.length, icon: <Book /> },
      { label: "Total Members", value: members.length, icon: <Users /> },
      { label: "Active Borrows", value: borrows.length, icon: <ClipboardList /> },
      { label: "Guest Logs", value: guests.length, icon: <LogOut /> },
      { label: "Inventory Items", value: inventory.length, icon: <PackagePlus /> }
    ]);

    setRecentGuests(guests.slice(-5).reverse());
    setRecentBorrows(borrows.slice(-5).reverse());
  }, []);

  return (
    <div className="dashboard-page">
      <h2>Admin Dashboard</h2>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div className="stat-card" key={index}>
            <div className="icon">{stat.icon}</div>
            <div className="info">
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="quick-actions">
          <button onClick={() => navigate("/admin-books")}>
               <PlusCircle /> Add Book
          </button>
         <button onClick={() => navigate("/admin-members")}>
            <PlusCircle /> Add Member
         </button>
      </div>

      

      <div className="recent-logs">
        <div className="recent-section">
          <h3>Recent Guest Logs</h3>
          {recentGuests.length === 0 ? <p>No recent guest logs.</p> : (
            <ul>
              {recentGuests.map((guest, index) => (
                <li key={index}>{guest.fullName} - {guest.date}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="recent-section">
          <h3>Recent Borrows</h3>
          {recentBorrows.length === 0 ? <p>No recent borrows.</p> : (
            <ul>
              {recentBorrows.map((borrow, index) => (
                <li key={index}>{borrow.bookTitle} by {borrow.borrowerName}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
