import React, { useState, useEffect } from "react";
import "../../css/admin.css";

export default function AdminInventoryManagement() {
  const [inventory, setInventory] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", type: "" });

  useEffect(() => {
    const storedInventory = JSON.parse(localStorage.getItem("inventory")) || [];
    setInventory(storedInventory);
  }, []);

  const handleChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (newItem.name.trim() === "" || newItem.type.trim() === "") return;

    const updatedInventory = [...inventory, newItem];
    setInventory(updatedInventory);
    localStorage.setItem("inventory", JSON.stringify(updatedInventory));
    setNewItem({ name: "", type: "" });
  };

  const handleDeleteItem = (index) => {
    const updatedInventory = [...inventory];
    updatedInventory.splice(index, 1);
    setInventory(updatedInventory);
    localStorage.setItem("inventory", JSON.stringify(updatedInventory));
  };

  return (
    <div className="inventory-management">
      <h2>Inventory Management</h2>

      <form onSubmit={handleAddItem} className="inventory-form">
        <input
          type="text"
          name="name"
          placeholder="Item Name"
          value={newItem.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="type"
          placeholder="Item Type (Book, Magazine, Device)"
          value={newItem.type}
          onChange={handleChange}
        />
        <button type="submit">Add Item</button>
      </form>

      <div className="inventory-list">
        {inventory.length === 0 ? (
          <p>No inventory items found.</p>
        ) : (
          <ul>
            {inventory.map((item, index) => (
              <li key={index}>
                <span>{item.name} ({item.type})</span>
                <button onClick={() => handleDeleteItem(index)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
