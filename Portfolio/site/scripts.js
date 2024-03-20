// scripts.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const moviesData = [
  { id: 1, title: 'Inception', director: 'Christopher Nolan', year: 2010 },
  { id: 2, title: 'The Shawshank Redemption', director: 'Frank Darabont', year: 1994 },
  { id: 3, title: 'The Godfather', director: 'Francis Ford Coppola', year: 1972 }
];

ReactDOM.render(<App moviesData={moviesData} />, document.getElementById('movie-container'));
