import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setGuestData((prev) => ({ ...prev, date: today }));
  }, []);

  const handleChange = (e) => {
    setGuestData({ ...guestData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    const { fullName, purpose } = guestData;
    if (!fullName || !purpose) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    try {
      const existingGuests = JSON.parse(localStorage.getItem("guestUsers")) || [];
      existingGuests.push(guestData);
      localStorage.setItem("guestUsers", JSON.stringify(existingGuests));

      // ✅ Save guest as the current logged-in user
      localStorage.setItem(
        "user",
        JSON.stringify({ role: "guest", name: guestData.fullName })
      );

      setSuccessMessage("Guest registered successfully!");
      setGuestData({
        fullName: "",
        institution: "",
        purpose: "",
        date: new Date().toISOString().split("T")[0],
      });

      // ✅ Redirect to guest home
      setTimeout(() => {
        navigate("/guest-home");
      }, 1000);
    } catch (error) {
      console.error("Storage error:", error);
      setErrorMessage("Failed to save. Please try again.");
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
          <input
            type="text"
            name="fullName"
            value={guestData.fullName}
            onChange={handleChange}
            required
          />
        </div>


        <div className="input-group">
          <label>Institution</label>
          <input
            type="text"
            name="institution"
            value={guestData.institution}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>Purpose of Visit *</label>
          <textarea
            name="purpose"
            value={guestData.purpose}
            onChange={handleChange}
            required
          />
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
