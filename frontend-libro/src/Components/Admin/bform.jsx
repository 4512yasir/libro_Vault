import React, { useState, useEffect } from "react";

export default function BookForm({ onAddBook, onUpdateBook, editingBook }) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    copies: 1,
  });

  useEffect(() => {
    if (editingBook) {
      setFormData(editingBook);
    } else {
      setFormData({ title: "", author: "", genre: "", copies: 1 });
    }
  }, [editingBook]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingBook) {
      onUpdateBook(formData);
    } else {
      onAddBook(formData);
    }
    setFormData({ title: "", author: "", genre: "", copies: 1 });
  };

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
      <input type="text" name="author" placeholder="Author" value={formData.author} onChange={handleChange} required />
      <input type="text" name="genre" placeholder="Genre" value={formData.genre} onChange={handleChange} required />
      <input type="number" name="copies" placeholder="Copies" value={formData.copies} onChange={handleChange} required min={1} />
      
      <button type="submit">{editingBook ? "Update Book" : "Add Book"}</button>
    </form>
  );
}
