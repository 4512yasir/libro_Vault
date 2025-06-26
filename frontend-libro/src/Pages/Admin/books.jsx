import React, { useState, useEffect } from "react";
import BookCard from "../../Components/Admin/bcard";
import BookForm from "../../Components/Admin/bform";
import '../../css/admin.css'

export default function AdminBooks() {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/books")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error fetching books:", error));
  }, []);
  

  const saveBooksToStorage = (books) => {
    setBooks(books);
    localStorage.setItem("libraryBooks", JSON.stringify(books));
  };

  const handleAddBook = async (newBook) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newBook)
      });
  
      if (response.ok) {
        const createdBook = await response.json();
        setBooks([...books, createdBook]);  // Add to state
      } else {
        console.error("Failed to add book.");
      }
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };
  

  const handleDeleteBook = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/books/${id}`, {
        method: "DELETE"
      });
  
      if (response.ok) {
        const updatedBooks = books.filter((book) => book.id !== id);
        setBooks(updatedBooks);
      } else {
        console.error("Failed to delete book.");
      }
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };
  

  const handleUpdateBook = async (updatedBook) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/books/${updatedBook.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedBook)
      });
  
      if (response.ok) {
        const updatedBooks = books.map((book) =>
          book.id === updatedBook.id ? updatedBook : book
        );
        setBooks(updatedBooks);
        setEditingBook(null);
      } else {
        console.error("Failed to update book.");
      }
    } catch (error) {
      console.error("Error updating book:", error);
    }
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
