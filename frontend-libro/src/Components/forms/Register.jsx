import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "../../css/form.css"; 

export default function RegisterForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmpassword: "",
    age: "",
    gender: "",
    location: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.password !== formData.confirmpassword) {
      alert("Passwords do not match.");
      return;
    }
  
    // Only send the fields the backend expects
    const userData = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      role: "member" // optional, but it's good to specify
    };
  
    try {
      const response = await fetch("http://127.0.0.1:5000/auth/register", { // Correct URL
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      });
  
      if (response.ok) {
        alert(`Welcome, ${formData.username}! Your account has been created.`);
  
        setFormData({
          username: "",
          email: "",
          phone: "",
          password: "",
          confirmpassword: "",
          age: "",
          gender: "",
          location: "",
        });
  
        // Redirect to dashboard
        navigate("/dashboard");
      } else {
        alert("Signup failed! Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please check your server connection.");
    }
  };
  

  return (
    <div className="register-form">
      <div className="form">
        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="signup-input"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="signup-input"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            className="signup-input"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          {/* Password Input with Toggle */}
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="signup-input"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="toggle-password-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <input
            type="password"
            name="confirmpassword"
            placeholder="Confirm Password"
            className="signup-input"
            value={formData.confirmpassword}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            className="signup-input"
            value={formData.age}
            onChange={handleChange}
            required
          />

          <select
            name="gender"
            className="signup-input"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <input
            type="text"
            name="location"
            placeholder="Location"
            className="signup-input"
            value={formData.location}
            onChange={handleChange}
            required
          />

          <button type="submit" className="register-button">Register</button>
        </form>
      </div>
    </div>
  );
}
