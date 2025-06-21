import React, { useState, useEffect } from "react";
import "../../css/Layout.css";

export default function Sidebar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const role = user?.role;

  let sideLinks = [];

  if (role === "admin") {
    sideLinks = [
      { Linkname: "Dashboard", path: "/dashboard" },
      { Linkname: "Books", path: "/books" },
      { Linkname: "Members", path: "/members" },
      { Linkname: "Guest Logs", path: "/guestlogs" },
      { Linkname: "Inventory", path: "/inventory" }
    ];
  } else if (role === "member") {
    sideLinks = [
      { Linkname: "Dashboard", path: "/dashboard" },
      { Linkname: "Books", path: "/books" },
      { Linkname: "Borrowed", path: "/borrowed" }
    ];
  }

  return (
    <div className="sidebar">
      {sideLinks.map((link, index) => (
        <a key={index} href={link.path}>
          {link.Linkname}
        </a>
      ))}
    </div>
  );
}
