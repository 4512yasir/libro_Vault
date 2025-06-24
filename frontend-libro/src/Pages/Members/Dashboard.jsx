import React, { useEffect, useState } from "react";
import Dashboard from "../../Components/Dashboard/Stat";

export default function MemberDashboard() {
  const [stats, setStats] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Get user from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    setUsername(user?.username || user?.name || "Member");

    const borrowed = JSON.parse(localStorage.getItem("borrowedBooks")) || [];
    const history = JSON.parse(localStorage.getItem("borrowHistory")) || [];

    setStats([
      { label: "Currently Borrowed", value: borrowed.length },
      { label: "Books Read", value: history.length },
      { label: "Fines Incurred", value: "Ksh 0" } 
    ]);
  }, []);

  return <Dashboard title={`Welcome ${username}`} stats={stats} />;
}
