import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../../css/Layout.css";

export default function Sidebar() {
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const role = user?.role;
  if (!role) return null;

  const sideLinks = [];

  if (role === "admin") {
    sideLinks.push(
      { name: "Dashboard", path: "/dashboard" },
      { name: "Books", path: "/books" },
      { name: "Members", path: "/members" },
      { name: "Guest Logs", path: "/guestlogs" },
      { name: "Inventory", path: "/inventory" },
      { name: "Profile", path: "/profile" }
    );
  } else if (role === "member") {
    sideLinks.push(
      { name: "Dashboard", path: "/dashboard" },
      { name: "Books", path: "/books" },
      { name: "Borrowed", path: "/borrowed" },
      { name: "History", path: "/history" },
      { name: "Profile", path: "/profile" }
    );
  }

  return (
    <div className="sidebar">
      {sideLinks.map((link, index) => (
        <NavLink
          key={index}
          to={link.path}
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          {link.name}
        </NavLink>
      ))}
    </div>
  );
}
