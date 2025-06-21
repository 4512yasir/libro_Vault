import React from "react";
import "../../css/Layout.css";

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;
  const name = user?.name;

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  let navLinks;

  if (role === "guest") {
    navLinks = (
      <>
        <a href="/guest-home">Home</a>
        <a href="/guest-books">Books</a>
        <a href="/guest-log">Logs</a>
        <button onClick={handleLogout}>Logout</button>
      </>
    );
  } else if (role === "member") {
    navLinks = (
      <>
        <a href="/">Home</a>
        <a href="/books">Books</a>
        <a href="/profile">Profile</a>
        <span className="welcome-text">Welcome, {name}</span>
        <button onClick={handleLogout}>Logout</button>
      </>
    );
  } else if (role === "admin") {
    navLinks = (
      <>
        <a href="/">Home</a>
        <a href="/books">Books</a>
        <a href="/profile">Profile</a>
        <span className="welcome-text">Admin</span>
        <button onClick={handleLogout}>Logout</button>
      </>
    );
  } else {
    navLinks = (
      <>
        <a href="/">Home</a>
        <a href="/login">Login</a>
        <a href="/register">Register</a>
        <a href="/guest">Guest Access</a>
      </>
    );
  }

  return (
    <div className="navigationbody">
      <div className="logo">
        <img className="logoimg" src="/logo.png" alt="logo" />
      </div>

      <div className="navlinks">{navLinks}</div>
    </div>
  );
}
