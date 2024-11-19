// Home.js
import React from 'react';
import { movies } from '../assets/handler/data'; // Import the movies data
import '../assets/css/home.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const redirectToMovie = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div className="container mt-5">
      <h1>Welcome to the Movie Listing Page</h1>
      <p>This is the Home Page of your movie listing website. Check out our latest movies!</p>
      
      <div className="movie-list">
        {movies.map(movie => (
          <div key={movie.id} className="movie-card" onClick={() => redirectToMovie(movie.id)}>
            <img src={movie.image} alt={movie.title} className="movie-image" />
            <div className="movie-info">
              <h2 className="movie-title">{movie.title}</h2>
              <p className="movie-description">{movie.description}</p>
              <p className="movie-rating">Rating: {movie.rating} ⭐</p>
              <p className="movie-price">Price: ${movie.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;