import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/login.css"; 

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const dummyUsers = [
    {
      username: "admin123",
      password: "adminpass",
      fullName: "Admin User",
      email: "admin@example.com",
      role: "admin",
      joined: "2024-01-01"
    },
    {
      username: "member123",
      password: "memberpass",
      fullName: "Member One",
      email: "member@example.com",
      role: "member",
      joined: "2024-03-10"
    }
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const user = dummyUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      
      if (user.role === "admin") {
        navigate("/admin-dashboard");
      } else if (user.role === "member") {
        navigate("/member-dashboard");
      }
    } else {
      setError("Invalid username or password.");
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
