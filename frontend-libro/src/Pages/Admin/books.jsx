import React, { useState, useEffect } from "react";
import BookCard from "../../Components/Admin/bcard";
import BookForm from "../../Components/Admin/bform";
import '../../css/admin.css'

export default function AdminBooks() {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("libraryBooks")) || [];
    setBooks(storedBooks);
  }, []);

  const saveBooksToStorage = (books) => {
    setBooks(books);
    localStorage.setItem("libraryBooks", JSON.stringify(books));
  };

  const handleAddBook = (newBook) => {
    const updatedBooks = [...books, { ...newBook, id: Date.now() }];
    saveBooksToStorage(updatedBooks);
  };

  const handleDeleteBook = (id) => {
    const updatedBooks = books.filter((book) => book.id !== id);
    saveBooksToStorage(updatedBooks);
  };

  const handleUpdateBook = (updatedBook) => {
    const updatedBooks = books.map((book) =>
      book.id === updatedBook.id ? updatedBook : book
    );
    saveBooksToStorage(updatedBooks);
    setEditingBook(null);
  };

  return (
    <div className="admin-books-page">
      <h2>Manage Books</h2>
      <BookForm onAddBook={handleAddBook} onUpdateBook={handleUpdateBook} editingBook={editingBook} />

      <div className="books-grid">
        {books.length === 0 ? (
          <p>No books available.</p>
        ) : (
          books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onDelete={handleDeleteBook}
              onEdit={() => setEditingBook(book)}
            />
          ))
        )}
      </div>
    </div>
  );
}
