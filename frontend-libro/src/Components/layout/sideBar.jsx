import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../../css/Layout.css";

export default function Sidebar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const role = user?.role;

  const sideLinks = [];

  if (role === "admin") {
    sideLinks.push(
      { name: "Dashboard", path: "/dashboard" },
      { name: "Books", path: "/books" },
      { name: "Members", path: "/members" },
      { name: "Guest Logs", path: "/guestlogs" },
      { name: "Inventory", path: "/inventory" }
    );
  } else if (role === "member") {
    sideLinks.push(
      { name: "Dashboard", path: "/dashboard" },
      { name: "Books", path: "/books" },
      { name: "Borrowed", path: "/borrowed" }
    );
  }

  if (!role) return null; 
  return (
    <div className={`sidebar ${role}`}>
      {sideLinks.map((link, index) => (
        <NavLink
          key={index}
          to={link.path}
          className={({ isActive }) => isActive ? "active" : ""}
        >
          {link.name}
        </NavLink>
      ))}
    </div>
  );
}
