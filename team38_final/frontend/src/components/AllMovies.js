import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllMovies = () => {
  const [movies, setMovies] = useState([]);
  const [showMovies, setShowMovies] = useState(false);

  useEffect(() => {
    if (showMovies) {
      fetchMovies();
    }
  }, [showMovies]);

  const fetchMovies = async () => {
    const response = await axios.get('http://localhost:8081/listAll');
    setMovies(response.data);
  };

  const toggleShowMovies = () => {
    setShowMovies(!showMovies);
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const cardStyle = {
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
    transition: '0.3s',
  };

  const cardImgStyle = {
    maxHeight: '250px',
    objectFit: 'cover',
  };

  return (
    <div style={containerStyle}>
      <h1 className="text-center my-4">All Movies</h1>
      <div className="row justify-content-center mb-4">
        <div className="col-auto">
          <button className="btn btn-primary" onClick={toggleShowMovies}>
            {showMovies ? 'Hide Movies' : 'Show Movies'}
          </button>
        </div>
      </div>
      {showMovies && (
        <div className="row">
          {movies.map((movie) => (
            <div className="col-md-4" key={movie._id}>
              <div className="card mb-4" style={cardStyle}>
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="card-img-top"
                  style={cardImgStyle}
                />
                <div className="card-body">
                  <h5 className="card-title">{movie.title}</h5>
                  <p className="card-text">{movie.description}</p>
                  <p className="card-text">
                    Category: {movie.category}
                  </p>
                  <p className="card-text">
                    Price: ${parseFloat(movie.price).toFixed(2)}
                  </p>
                  <p className="card-text">
                    Rating: {parseFloat(movie.rating.rate).toFixed(1)} ({movie.rating.count} reviews)
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllMovies;
