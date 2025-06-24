import React, { useEffect, useState } from "react";
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
      { name: "Dashboard", path: "/admin-dashboard" },
      { name: "Manage Members", path: "/admin-members" },
      { name: "Manage Books", path: "/admin-books" },
      { name: "GuestLog" , path : "/admin-guestlog"},
      { name: "Borrowing History" , path : "/admin-borrowinghistory"},
      { name: "Borrowing Management", path: "/admin-borrowing" },
      { name: "Inventory", path: "/admin-inventory" },
      { name: "Genre-Management", path:"/admin-genre"}
    );
  } else if (role === "member") {
    sideLinks.push(
      { name: "Dashboard", path: "/member-dashboard" },
      { name: "Books", path: "/member-books" },
      { name: "Borrowed Books", path: "/member-borrowed" },
      { name: "History", path: "/member-history" }
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
