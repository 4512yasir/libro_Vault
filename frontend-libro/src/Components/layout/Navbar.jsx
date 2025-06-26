import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../../css/Layout.css";

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;
  const name = user?.name || "Guest";
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  let navLinks;

  if (role === "guest") {
    navLinks = (
      <>
        <NavLink to="/guest-home" className="nav-link">Home</NavLink>
        <NavLink to="/guest-books" className="nav-link">Books</NavLink>
        <NavLink to="/guest-log" className="nav-link">Logs</NavLink>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </>
    );
  } else if (role === "member") {
    navLinks = (
      <>
        <NavLink to="/member-dashboard" className="nav-link">Home</NavLink>
        <NavLink to="/books" className="nav-link">Books</NavLink>
        <NavLink to="/profile" className="nav-link">Profile</NavLink>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </>
    );
  } else if (role === "admin") {
    navLinks = (
      <>
        <NavLink to="/admin-dashboard" className="nav-link">Home</NavLink>
        <NavLink to="/admin-books" className="nav-link">Books</NavLink>
        <NavLink to="/profile" className="nav-link">Profile</NavLink>
        <span className="welcome-text">Welcome, Admin</span>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </>
    );
  } else {
    navLinks = (
      <>
        <NavLink to="/" className="nav-link">Home</NavLink>
        <NavLink to="/login" className="nav-link">Login</NavLink>
        <NavLink to="/register" className="nav-link">Register</NavLink>
        <NavLink to="/guest" className="nav-link">Guest Access</NavLink>
      </>
    );
  }

  return (
    <div className="navigationbody">
      <div className="logo">
        <img className="logoimg" src="/logo.png" alt="logo" />
      </div>

      <div className="navlinks">
        {navLinks}
      </div>

      {role && (
        <div className="welcome-msg">
          <span>Hello, {name}!</span>
        </div>
      )}
    </div>
  );
}
