import React, { useEffect, useState } from "react";
import BookCard from "../../Components/Books/Card";
import SearchBar from "../../Components/forms/SearchBar";
import "../../css/member.css"

export default function MemberBooks() {
  const [books, setBooks] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [genreFilter, setGenreFilter] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 6;

  useEffect(() => {
    const allBooks = JSON.parse(localStorage.getItem("books")) || [];
    const borrowed = JSON.parse(localStorage.getItem("borrowedBooks")) || [];

    setBooks(allBooks);
    setBorrowedBooks(borrowed);
  }, []);

  const handleBorrow = (book) => {
    if (borrowedBooks.some(b => b.id === book.id)) return;

    const updated = [...borrowedBooks, book];
    setBorrowedBooks(updated);
    localStorage.setItem("borrowedBooks", JSON.stringify(updated));
    alert(`You have borrowed "${book.title}"`);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
    setCurrentPage(0);
  };

  const handleFilterChange = (e) => {
    setGenreFilter(e.target.value);
    setCurrentPage(1);
  };

 
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm) ||
      book.author.toLowerCase().includes(searchTerm);
    const matchesGenre =
      genreFilter === "All" || book.genre === genreFilter;

    return matchesSearch && matchesGenre;
  });

 
  const indexOfLast = currentPage * booksPerPage;
  const indexOfFirst = indexOfLast - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  return (
    <div className="member-books">
      <h2>Available Books</h2>

     
      <div className="book-controls">
        <SearchBar placeholder="Search by title or author..." value={searchTerm} onChange={handleSearch} />

        <select onChange={handleFilterChange} value={genreFilter}>
          <option>All</option>
          <option>Fiction</option>
          <option>Non-fiction</option>
          <option>Self-help</option>
          <option>Science</option>
          <option>Programming</option>
        </select>
      </div>

      {/* Books Grid */}
      <div className="book-grid">
        {currentBooks.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onBorrow={handleBorrow}
            isBorrowed={borrowedBooks.some(b => b.id === book.id)}
            showBorrowButton={true}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}
