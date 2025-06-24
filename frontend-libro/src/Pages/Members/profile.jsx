import React, { useEffect, useState } from "react";
import "../../css/member.css";

export default function MemberProfile() {
  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [tempUser, setTempUser] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || {};
    setUser(storedUser);
    setTempUser(storedUser);
  }, []);

  const handleInputChange = (e) => {
    setTempUser({ ...tempUser, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(tempUser));
    setUser(tempUser);
    setEditMode(false);
    setSuccessMsg("Profile updated successfully!");
    setTimeout(() => setSuccessMsg(""), 2000);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Simulate upload - create local URL
    const imageUrl = URL.createObjectURL(file);
    const updatedUser = { ...tempUser, profilePic: imageUrl };
    setTempUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  return (
    <div className="member-profile">
      <h2>My Profile</h2>
      {successMsg && <p className="success">{successMsg}</p>}

      <div className="profile-container">
        <div className="profile-image">
          <img src={user.profilePic || "/default-avatar.png"} alt="Profile" />
          <input type="file" onChange={handleImageUpload} />
        </div>

        <div className="profile-info">
          <p><strong>Full Name:</strong> {user.fullName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Joined:</strong> {user.joined || "2024-01-01"}</p>

          {editMode ? (
            <>
              <div className="input-group">
                <label>Phone:</label>
                <input type="tel" name="phone" value={tempUser.phone || ""} onChange={handleInputChange} />
              </div>

              <div className="input-group">
                <label>Institution:</label>
                <input type="text" name="institution" value={tempUser.institution || ""} onChange={handleInputChange} />
              </div>

              <button onClick={handleSave}>Save</button>
            </>
          ) : (
            <>
              <p><strong>Phone:</strong> {user.phone || "Not set"}</p>
              <p><strong>Institution:</strong> {user.institution || "Not set"}</p>
              <button onClick={() => setEditMode(true)}>Edit</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
