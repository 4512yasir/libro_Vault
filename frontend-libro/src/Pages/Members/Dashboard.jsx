import React, { useEffect, useState } from "react";
import Dashboard from "../../Components/Dashboard/Stat";
import { useNavigate } from "react-router-dom";
import "../../css/Dashboard.css";

export default function MemberDashboard() {
  const [stats, setStats] = useState([]);
  const [username, setUsername] = useState("");
  const [greeting, setGreeting] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUsername(user?.username || user?.name || "Member");

    const borrowed = JSON.parse(localStorage.getItem("borrowedBooks")) || [];
    const history = JSON.parse(localStorage.getItem("borrowHistory")) || [];

    setStats([
      { label: "Currently Borrowed", value: borrowed.length },
      { label: "Books Read", value: history.length },
      { label: "Fines Incurred", value: "Ksh 0" }
    ]);

    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  return (
    <div className="member-dashboard">
      <div className="welcome-card">
        <h2>{greeting}, {username}!</h2>
        <p>Welcome back to Libro Vault. Let's keep reading!</p>
      </div>

      <Dashboard title="Your Library Stats" stats={stats} />

      <div className="quick-actions">
        <button onClick={() => navigate("/member-books")}>📚 Browse Books</button>
        <button onClick={() => navigate("/member-borrowed")}>📖 View Borrowing History</button>
      </div>
    </div>
  );
}
