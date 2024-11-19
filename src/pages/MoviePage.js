import React from 'react';
import { useParams, Link } from 'react-router-dom'; // Import Link for routing
import { movies } from '../assets/handler/data.js';
import '../assets/css/detail.css';

function MoviePage() {
    const { movieId } = useParams(); // Get movieId from the URL
    const movie = movies.find((movie) => movie.id === parseInt(movieId)); // Find movie by ID

    if (!movie) {
        return <div>Movie not found!</div>;
    }

    // Convert trailerLink to embed URL format
    const embedUrl = `https://www.youtube.com/embed/${movie.trailerLink}`;

    return (
        <div>
            {/* Breadcrumbs */}
                <ul class='breadcrumbs'>
                    <li class="breadcrumb-link"><Link className="nav-link" to="/">Home</Link> &gt; </li>
                    <li class="breadcrumb-link"><Link className="nav-link" to="/movies">Movies</Link> &gt; </li>
                    <li class="breadcrumb-link"><span className="text-light">{movie.title}</span></li>
                </ul>

            {/* Movie Details */}
            <div className="card-wrapper">
                <div className="custom-card d-flex justify-between">
                    <div className="product-imgs">
                        <div className="img-display">
                            <img src={movie.image} alt={movie.title} className="img-showcase" />
                        </div>
                    </div>

                    <div className="product-content">
                        <h1 className="product-title">{movie.title}</h1>
                        <p className="product-detail">{movie.description}</p>
                        <div className="product-rating">
                            <span>Rating: {movie.rating}</span>
                        </div>
                        <div className="product-price">
                            <span>Price: ${movie.price}</span>
                        </div>
                        <div className="product-detail">
                            <h2>Details</h2>
                            <ul>
                                <li><span>Genre:</span> {movie.genre}</li>
                                <li><span>Director:</span> {movie.director}</li>
                                <li><span>Actors:</span> {movie.actors}</li>
                            </ul>
                        </div>

                        <div className="purchase-info">
                            <button className="btn">Buy Now</button>
                            <button className="btn">Add to Wishlist</button>
                        </div>
                        <div>
                            <iframe
                                src={embedUrl} // Use the embed URL with the correct video ID
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MoviePage;
