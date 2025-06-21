import React from "react";
import "../../css/books.css";

export default function BookTable({ books }) {
  return (
    <table className="book-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Cover</th>
          <th>Title</th>
          <th>Author</th>
          <th>Genre</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, index) => (
          <tr key={book.id}>
            <td>{index + 1}</td>
            <td><img src={book.cover} alt={book.title} className="table-book-cover" /></td>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.genre}</td>
            <td>{book.available ? "Available" : "Borrowed"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
