import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

// Define AllMovies component
const AllMovies = () => {
  const [movies, setMovies] = useState([]);
  const [showMovies, setShowMovies] = useState(false);
  const [showReviews, setShowReviews] = useState({});

  useEffect(() => {
    if (showMovies) {
      fetchMovies();
    }
  }, [showMovies]);

  // Fetch movies from server when showMovies state is changed
  const fetchMovies = async () => {
    const response = await axios.get("http://localhost:8081/listAll");
    setMovies(response.data);
  };

  // Toggle showMovies state
  const toggleShowMovies = () => {
    setShowMovies(!showMovies);
  };

  const containerStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
  };

  const cardStyle = {
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
    transition: "0.3s",
  };

  const cardImgStyle = {
    height: "450px",
    width: "100%",
    objectFit: "contain",
  };

  // Render component
  return (
    <div style={containerStyle}>
      <h1 className="text-center my-4">All Movies</h1>
      <div className="row justify-content-center mb-4">
        <div className="col-auto">
          <button className="btn btn-primary" onClick={toggleShowMovies}>
            {showMovies ? "Hide Movies" : "Show Movies"}
          </button>
        </div>
      </div>
      {showMovies && (
        <div className="row">
          {movies.map((movie) => {
            const imageUrl = `http://localhost:8081/images/${movie.image}`;
            return (
              <div className="col-md-4" key={movie._id}>
                <div className="card mb-4" style={cardStyle}>
                  <img
                    src={imageUrl}
                    alt={movie.title}
                    className="card-img-top card-img-container"
                    style={cardImgStyle}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{movie.title}</h5>
                    <p className="card-text">{movie.description}</p>
                    <p className="card-text">Category: {movie.category}</p>
                    <p className="card-text">
                      Price: ${parseFloat(movie.price).toFixed(2)}
                    </p>
                    <button
                      className="btn btn-sm btn-secondary mt-2"
                      onClick={() =>
                        setShowReviews((prev) => ({
                          ...prev,
                          [movie._id]: !prev[movie._id],
                        }))
                      }
                    >
                      {showReviews[movie._id] ? "Hide Reviews" : "Show Reviews"}
                    </button>
                    {showReviews[movie._id] && (
                      <div className="mt-3">
                        {movie.reviews.map((review, index) => (
                          <div key={index}>
                            <strong>{review.user}</strong>: {review.comment}{" "}
                            <span className="text-muted">
                              ({review.rating}/5)
                            </span>
                            <hr />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AllMovies;
