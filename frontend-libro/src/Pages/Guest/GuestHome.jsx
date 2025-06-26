import React from "react";
import { BookOpen, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../../css/guest-content.css";

export default function GuestHome() {
  const navigate = useNavigate();

  return (
    <div className="guest-home-container">
      <h2 className="welcome-text">Welcome, Guest!</h2>
      <p className="guest-description">
        You have limited access to the library system. You can browse available books or view your activity logs.
      </p>

      <div className="guest-actions">
        <button className="guest-button" onClick={() => navigate("/guest-books")}>
          <BookOpen /> Browse Books
        </button>

        <button className="guest-button" onClick={() => navigate("/guest-log")}>
          <LogOut /> View My Logs
        </button>
      </div>
    </div>
  );
}
