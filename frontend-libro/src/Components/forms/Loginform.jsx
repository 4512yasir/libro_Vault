import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/login.css";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const data = await response.json();
        const user = data.user;

        localStorage.setItem("user", JSON.stringify(user)); 

        if (user.role === "admin") {
          navigate("/admin-dashboard");
        } else if (user.role === "member") {
          navigate("/member-dashboard");
        }
      } else if (response.status === 401) {
        setError("Invalid username or password.");
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to connect to the server.");
    }
  };

  return (
    <div className="loginform">
      <form onSubmit={handleLogin}>
        <h2>Login</h2>

        {error && <p className="error">{error}</p>}

        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="forgot">
          <a href="#">Forgot password?</a>
        </div>

        <div className="submit">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}
