import React, { useState, useEffect } from "react";

export default function BookForm({ onAddBook, onUpdateBook, editingBook }) {
  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    published_year: "",
   
  });

  useEffect(() => {
    if (editingBook) {
      setForm(editingBook);
    } else {
      setForm({
        title: "",
        author: "",
        genre: "",
        published_year: "",
        
      });
    }
  }, [editingBook]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingBook) {
      onUpdateBook({ ...form, id: editingBook.id });
    } else {
      onAddBook(form);
    }

    // Reset form after submission
    setForm({ title: "", author: "", genre: "", published_year: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="book-form">
      <input
        type="text"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Author"
        value={form.author}
        onChange={(e) => setForm({ ...form, author: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Genre"
        value={form.genre}
        onChange={(e) => setForm({ ...form, genre: e.target.value })}
        required
      />
      <input
        type="number"
        placeholder="Published Year"
        value={form.published_year}
        onChange={(e) => setForm({ ...form, published_year: e.target.value })}
        required
      />
      <button type="submit">
        {editingBook ? "Update Book" : "Add Book"}
      </button>
    </form>
  );
}
