// App.js
import React from 'react';
import Movie from './Movie';

const App = ({ moviesData }) => {
  return (
    <div className="movie-container">
      <h2>Welcome to the Movie Database!</h2>
      <p>This is the home page of our movie website.</p>
      <h2>Movies</h2>
      {moviesData.map(movie => (
        <Movie key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

export default App;
