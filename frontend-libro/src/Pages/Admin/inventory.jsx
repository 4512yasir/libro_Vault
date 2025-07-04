import React, { useEffect, useState } from "react";
import "../../css/admin.css";

export default function Inventory() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "", category: "", quantity: 1 });

 
  const fetchAll = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/inventory/");
      const data = await res.json();
      setItems(data);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const addItem = async () => {
    try {
      await fetch("http://127.0.0.1:5000/inventory/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setForm({ name: "", category: "", quantity: 1 });
      fetchAll();
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const updateQty = async (id, qty) => {
    try {
      await fetch(`http://127.0.0.1:5000/inventory/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: qty }),
      });
      fetchAll();
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await fetch(`http://127.0.0.1:5000/inventory/${id}`, {
        method: "DELETE"
      });
      fetchAll();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="admin-page">
      <h2>Inventory Management</h2>

      <div className="inventory-form">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        <input
          name="quantity"
          type="number"
          min={0}
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: +e.target.value })}
        />
        <button onClick={addItem}>Add / Update</button>
      </div>

      <h3>Total Items: {items.length}</h3>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Qty</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((it) => (
            <tr key={it.id}>
              <td>{it.id}</td>
              <td>{it.name}</td>
              <td>{it.category}</td>
              <td>{it.quantity}</td>
              <td>
                <button onClick={() => updateQty(it.id, it.quantity + 1)}>+1</button>
                <button onClick={() => updateQty(it.id, it.quantity - 1)}>−1</button>
                <button onClick={() => deleteItem(it.id)} style={{ backgroundColor: 'red', color: 'white' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
