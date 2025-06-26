import React, { useEffect, useState } from "react";
import BookCard from "../../Components/Books/Card";
import SearchBar from "../../Components/forms/SearchBar";
import "../../css/member.css";

export default function MemberBooks() {
  const [books, setBooks] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [genreFilter, setGenreFilter] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 6;

  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/books")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        localStorage.setItem("books", JSON.stringify(data)); 
      })
      .catch((error) => console.error("Error fetching books:", error));
  
    const borrowed = JSON.parse(localStorage.getItem("borrowedBooks")) || [];
    setBorrowedBooks(borrowed);
  }, []);
  

  const handleBorrow = (book) => {
    if (borrowedBooks.some((b) => b.id === book.id)) return;

    const updated = [...borrowedBooks, book];
    setBorrowedBooks(updated);
    localStorage.setItem("borrowedBooks", JSON.stringify(updated));
    setSuccessMessage(`You have borrowed "${book.title}"`);

    // Hide message after 3 seconds
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
    setCurrentPage(1); // Reset to page 1 when searching
  };

  const handleFilterChange = (e) => {
    setGenreFilter(e.target.value);
    setCurrentPage(1); // Reset to page 1 when filtering
  };

  const genres = ["All", ...new Set(books.map((book) => book.genre).filter(Boolean))];

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm) ||
      book.author.toLowerCase().includes(searchTerm);
    const matchesGenre = genreFilter === "All" || book.genre === genreFilter;

    return matchesSearch && matchesGenre;
  });

  const indexOfLast = currentPage * booksPerPage;
  const indexOfFirst = indexOfLast - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  return (
    <div className="member-books">
      <h2>Available Books</h2>

      {successMessage && <div className="success-message">{successMessage}</div>}

      <div className="book-controls">
        <SearchBar placeholder="Search by title or author..." value={searchTerm} onChange={handleSearch} />

        <select onChange={handleFilterChange} value={genreFilter}>
          {genres.map((g, index) => (
            <option key={index} value={g}>{g}</option>
          ))}
        </select>
      </div>

      <div className="book-grid">
        {currentBooks.length === 0 ? (
          <p className="empty-message">No books found for the selected filter or search.</p>
        ) : (
          currentBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onBorrow={handleBorrow}
              isBorrowed={borrowedBooks.some((b) => b.id === book.id)}
              showBorrowButton={true}
            />
          ))
        )}
      </div>

      {filteredBooks.length > booksPerPage && (
        <div className="pagination">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)}>
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((prev) => prev + 1)}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}
