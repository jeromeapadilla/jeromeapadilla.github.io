// Movie.js
import React from 'react';

const Movie = ({ movie }) => {
  return (
    <div className="movie-card">
      <h3>{movie.title}</h3>
      <p>Director: {movie.director}</p>
      <p>Year: {movie.year}</p>
    </div>
  );
}

export default Movie;
