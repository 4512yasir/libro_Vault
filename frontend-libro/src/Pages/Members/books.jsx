// src/Pages/BooksPage.jsx
import React, { useState, useEffect } from "react";
import BookCard from "../Components/books/BookCard";
import BookTable from "../Components/books/BookTable";
import "../css/books.css";

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [viewMode, setViewMode] = useState("cards");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 6;

  useEffect(() => {
    fetch("/api/books")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setFilteredBooks(data);
      })
      .catch((err) => console.error("Failed to fetch books:", err));
  }, []);

  useEffect(() => {
    let updatedBooks = [...books];

    // Filter by search
    if (searchTerm) {
      updatedBooks = updatedBooks.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by genre
    if (selectedGenre) {
      updatedBooks = updatedBooks.filter(book => book.genre === selectedGenre);
    }

    setFilteredBooks(updatedBooks);
    setCurrentPage(1); // Reset to first page on filter
  }, [searchTerm, selectedGenre, books]);

  // Pagination logic
  const indexOfLast = currentPage * booksPerPage;
  const indexOfFirst = indexOfLast - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  return (
    <div className="books-page">
      <div className="books-header">
        <h1>📚 Our Library Books</h1>
        <div className="view-toggle">
          <button onClick={() => setViewMode("cards")}>Card View</button>
          <button onClick={() => setViewMode("table")}>Table View</button>
        </div>
      </div>

      <div className="books-filters">
        <input
          type="text"
          placeholder="Search by title or author"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
          <option value="">All Genres</option>
          {Array.from(new Set(books.map((book) => book.genre))).map((genre) => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
      </div>

      {viewMode === "cards" ? (
        <div className="books-list">
          {currentBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <BookTable books={currentBooks} />
      )}

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, idx) => (
          <button
            key={idx + 1}
            className={currentPage === idx + 1 ? "active" : ""}
            onClick={() => setCurrentPage(idx + 1)}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
