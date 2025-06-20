import React, { useState } from "react";
import "../../css/Layout.css";



export default function Navbar() {


  
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/"; 
  };


  let navLinks;

  if (role === "guest") {
    navLinks = (
      <>
        <a href="/">Home</a>
        <a href="/guest-books">Guest Books</a>
        <a href="/guest-logs">Guest Logs</a>
        <button onClick={handleLogout}>Logout</button>
      </>
    );
  } else if (role === "member") {
    navLinks = (
      <>
        <a href="/dashboard">Dashboard</a>
        <a href="/books">Books</a>
        <a href="/borrowed">Borrowed Books</a>
        <a href="/profile">Profile</a>
        <button onClick={handleLogout}>Logout</button>
      </>
    );
  } else if (role === "admin") {
    navLinks = (
      <>
        <a href="/dashboard">Dashboard</a>
        <a href="/books">Books</a>
        <a href="/members">Members</a>
        <a href="/guestlogs">Guest Logs</a>
        <a href="/inventory">Inventory</a>
        <a href="/profile">Profile</a>
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

      <div className="navlinks">
        {navLinks}
      </div>

     
    
    </div>
  );
}
