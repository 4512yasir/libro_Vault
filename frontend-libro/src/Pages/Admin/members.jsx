import React, { useState, useEffect } from "react";
import "../../css/admin.css";

export default function AdminMembers() {
  const [members, setMembers] = useState([]);
  const [form, setForm] = useState({ username: "", email: "", role: "member", password: "" });
  const [editing, setEditing] = useState(null);

  const fetchMembers = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/members");
      const data = await res.json();
      setMembers(data);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    const url = editing ? `http://127.0.0.1:5000/members/${editing.id}` : "http://127.0.0.1:5000/members";
    const method = editing ? "PUT" : "POST";
  
    const payload = editing && !form.password
      ? { username: form.username, email: form.email, role: form.role }
      : form;
  
    try {
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      setForm({ username: "", email: "", role: "member", password: "" });
      setEditing(null);
      fetchMembers();
    } catch (error) {
      console.error("Error submitting member:", error);
    }
  };
  

  const edit = (m) => {
    setEditing(m);
    setForm({ username: m.username, email: m.email, role: m.role, password: "" });
  };

  const del = async (id) => {
    if (window.confirm("Delete this member?")) {
      try {
        await fetch(`http://127.0.0.1:5000/members/${id}`, { method: "DELETE" });
        fetchMembers();
      } catch (error) {
        console.error("Error deleting member:", error);
      }
    }
  };

  return (
    <div className="admin-page">
      <h2>Members Management</h2>
      <form onSubmit={submit}>
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <select
          name="role"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="member">Member</option>
          <option value="admin">Admin</option>
        </select>
        <input
          name="password"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required={!editing}
        />
        <button type="submit">{editing ? "Update" : "Add"} Member</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {members.map((m) => (
            <tr key={m.id}>
              <td>{m.id}</td>
              <td>{m.username}</td>
              <td>{m.email}</td>
              <td>{m.role}</td>
              <td>
                <button onClick={() => edit(m)}>Edit</button>
                <button onClick={() => del(m.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
