import React from "react";
import "../../css/admin.css";

export default function MemberCard({ member, onDelete }) {
  return (
    <div className="member-card">
      <h3>{member.fullName}</h3>
      <p><strong>Username:</strong> {member.username}</p>
      <p><strong>Email:</strong> {member.email}</p>
      <button className="delete-btn" onClick={() => onDelete(member.id)}>Delete</button>
    </div>
  );
}
