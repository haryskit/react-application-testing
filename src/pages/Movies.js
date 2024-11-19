// Movies.js
import React from 'react';
import '../assets/css/card.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { movies } from '../assets/handler/data.js'; // Import the movie data

function Movies() {
  const navigate = useNavigate();

  const redirectToMovie = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div className="container mt-2">
      <h1>Movies</h1>
      <div className="row">
        {movies.map((movie) => (
          <div className="col-md-4 col-lg-3 col-sm-12" key={movie.id} onClick={() => redirectToMovie(movie.id)}>
            <div className="card custom-card mb-4">
              <div className="image_container">
                <img src={movie.image} alt={movie.title} className="card-img" />
              </div>
              <div className="title">
                <span>{movie.title}</span>
              </div>
              <div className="action">
                <button
                  className="cart-button"
                  onClick={() => redirectToMovie(movie.id)}
                >
                  <FontAwesomeIcon icon={faEye} className="cart-icon" />
                  <span>Watch</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Movies;
