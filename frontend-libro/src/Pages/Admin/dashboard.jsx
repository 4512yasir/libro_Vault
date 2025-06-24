import React, { useEffect, useState } from "react";
import Dashboard from "../../Components/Dashboard/Stat";

export default function AdminDashboard() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const books = JSON.parse(localStorage.getItem("books")) || [];
    const members = JSON.parse(localStorage.getItem("members")) || [];
    const borrows = JSON.parse(localStorage.getItem("borrowedBooks")) || [];
    const guests = JSON.parse(localStorage.getItem("guestUsers")) || [];
    const inventory = JSON.parse(localStorage.getItem("inventory")) || [];

    setStats([
      { label: "Total Books", value: books.length },
      { label: "Total Members", value: members.length },
      { label: "Active Borrows", value: borrows.length },
      { label: "Guest Logs", value: guests.length },
      { label: "Inventory Items", value: inventory.length }
    ]);
  }, []);

  return <Dashboard title="Admin Dashboard" stats={stats} />;
}
