import React, { useState, useEffect } from "react";
import MemberCard from "../../Components/Admin/membercard";

export default function Members() {
  const [members, setMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const storedMembers = JSON.parse(localStorage.getItem("registeredMembers")) || [];
    setMembers(storedMembers);
  }, []);

  const handleDelete = (id) => {
    const updatedMembers = members.filter((member) => member.id !== id);
    setMembers(updatedMembers);
    localStorage.setItem("registeredMembers", JSON.stringify(updatedMembers));
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Search Logic
  const filteredMembers = members.filter((member) =>
    member.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="members-page">
      <h2>Registered Members</h2>

      <input
        type="text"
        placeholder="Search by name or username..."
        value={searchQuery}
        onChange={handleSearch}
        className="search-input"
      />

      {filteredMembers.length === 0 ? (
        <p>No members found.</p>
      ) : (
        <div className="members-grid">
          {filteredMembers.map((member) => (
            <MemberCard key={member.id} member={member} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
