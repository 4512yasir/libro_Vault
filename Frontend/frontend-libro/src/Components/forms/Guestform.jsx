// src/Components/forms/GuestRegistration.jsx
import React, { useState, useEffect } from "react";
import "../../css/guest.css";

export default function GuestRegistration() {
  const [guestData, setGuestData] = useState({
    fullName: "",
    phone: "",
    institution: "",
    purpose: "",
    date: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setGuestData((prev) => ({ ...prev, date: today }));
  }, []);

  const handleChange = (e) => {
    setGuestData({ ...guestData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    if (!guestData.fullName || !guestData.phone || !guestData.purpose) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch("/api/guests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(guestData),
      });

      if (response.ok) {
        setSuccessMessage("Guest registered successfully!");
        setGuestData({
          fullName: "",
          phone: "",
          institution: "",
          purpose: "",
          date: new Date().toISOString().split("T")[0],
        });
      } else {
        setErrorMessage("Failed to register guest. Try again later.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Server error. Please try again later.");
    }
  };

  return (
    <div className="guest-form">
      <h2>Guest Registration</h2>
      {successMessage && <p className="success">{successMessage}</p>}
      {errorMessage && <p className="error">{errorMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Full Name *</label>
          <input type="text" name="fullName" value={guestData.fullName} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label>Phone *</label>
          <input type="tel" name="phone" value={guestData.phone} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label>Institution</label>
          <input type="text" name="institution" value={guestData.institution} onChange={handleChange} />
        </div>

        <div className="input-group">
          <label>Purpose of Visit *</label>
          <textarea name="purpose" value={guestData.purpose} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label>Date</label>
          <input type="date" name="date" value={guestData.date} readOnly />
        </div>

        <button type="submit" className="submit-btn">Register</button>
      </form>
    </div>
  );
}
