import React, { useState, useEffect } from "react";
import "../../css/admin.css";

export default function AdminGenreManagement() {
  const [genres, setGenres] = useState([]);
  const [newGenre, setNewGenre] = useState("");

  useEffect(() => {
    const storedGenres = JSON.parse(localStorage.getItem("genres")) || [];
    setGenres(storedGenres);
  }, []);

  const handleAddGenre = (e) => {
    e.preventDefault();
    if (newGenre.trim() === "") return;

    const updatedGenres = [...genres, newGenre];
    setGenres(updatedGenres);
    localStorage.setItem("genres", JSON.stringify(updatedGenres));
    setNewGenre("");
  };

  const handleDeleteGenre = (index) => {
    const updatedGenres = [...genres];
    updatedGenres.splice(index, 1);
    setGenres(updatedGenres);
    localStorage.setItem("genres", JSON.stringify(updatedGenres));
  };

  return (
    <div className="genre-management">
      <h2>Genre Management</h2>

      <form onSubmit={handleAddGenre} className="genre-form">
        <input
          type="text"
          placeholder="Enter new genre"
          value={newGenre}
          onChange={(e) => setNewGenre(e.target.value)}
        />
        <button type="submit">Add Genre</button>
      </form>

      <div className="genre-list">
        {genres.length === 0 ? (
          <p>No genres available.</p>
        ) : (
          <ul>
            {genres.map((genre, index) => (
              <li key={index}>
                {genre}
                <button onClick={() => handleDeleteGenre(index)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
