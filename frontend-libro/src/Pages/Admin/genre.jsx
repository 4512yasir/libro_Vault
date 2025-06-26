import React, { useEffect, useState } from 'react';
import '../../css/admin.css';

export default function Genre() {
  const [genres, setGenres] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newGenre, setNewGenre] = useState('');

  // Fetch genres
  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const res = await fetch('http://127.0.0.1:5000/genres');
      const data = await res.json();
      setGenres(data);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  // Add genre
  const handleAddGenre = async (e) => {
    e.preventDefault();
    if (newGenre.trim() === '') return;

    try {
      const res = await fetch('http://127.0.0.1:5000/genres', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newGenre })
      });

      if (res.ok) {
        const addedGenre = await res.json();
        setGenres([...genres, addedGenre]); // Update list
        setNewGenre(''); // Reset input
      } else {
        console.error('Failed to add genre');
      }
    } catch (error) {
      console.error('Error adding genre:', error);
    }
  };

  // Filter genres
  const filteredGenres = genres.filter((genre) =>
    genre.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="genre-page">
      <h2>Genre Management</h2>

      {/* Add Genre Form */}
      <form onSubmit={handleAddGenre} className="add-genre-form">
        <input
          type="text"
          placeholder="Add new genre..."
          value={newGenre}
          onChange={(e) => setNewGenre(e.target.value)}
          required
        />
        <button type="submit">Add Genre</button>
      </form>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search genres..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="genre-search"
      />

      {/* Display Genres */}
      <div className="genre-grid">
        {filteredGenres.length === 0 ? (
          <p>No genres found.</p>
        ) : (
          filteredGenres.map((genre) => (
            <div key={genre.id} className="genre-card">
              <span>{genre.name}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
