// src/Pages/GuestRegistrationPage.jsx
import React from "react";
import GuestRegistration from "../Components/forms/Guestform";
import "../css/guest.css";

export default function GuestRegistrationPage() {
  return (
    <div className="guest-page">
      <div className="logo-left">
        <img src="/logo.png" alt="LibroVault Logo" />
      </div>
      <div className="form-right">
        <GuestRegistration />
        <div className="links">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
        </div>
      </div>
    </div>
  );
}
