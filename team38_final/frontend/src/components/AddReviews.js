import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import ReactStars from "react-rating-stars-component";

const AddReview = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState("");
  const [username, setUsername] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(1);
  const [message, setMessage] = useState("");

  //Fetch all movies on component
  useEffect(() => {
    fetchMovies();
  }, []);

  //Fetches all movies from the server
  const fetchMovies = async () => {
    try {
      const response = await axios.get("http://localhost:8081/listAll");
      if (response.status === 200) {
        setMovies(response.data);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  //Handles form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedMovieId || !username || !comment) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      // Send a POST request to add a new review for the selected movie
      const response = await axios.post(
        `http://localhost:8081/addReview/${selectedMovieId}`,
        { user: username, comment, rating }
      );

      // Display a success message and reset the form fields if the request is successful
      if (response.status === 200) {
        setMessage("Review submitted successfully!");
        setUsername("");
        setComment("");
        setRating(1);
        setSelectedMovieId("");
      }
    } catch (error) {
      console.error("Error adding review:", error);
      setMessage("Error submitting review");
    }
  };

  // The render method
  return (
    <div className="container">
      <h1 className="text-center my-4">Add Review</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <select
            className="form-control"
            id="movieTitle"
            value={selectedMovieId}
            onChange={(e) => setSelectedMovieId(e.target.value)}
            required
          >
            <option value="">Select a movie</option>
            {movies.map((movie) => (
              <option key={movie.id} value={movie.id}>
                {movie.title}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="user"
            placeholder="Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <textarea
            className="form-control"
            id="comment"
            rows="3"
            placeholder="Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rating:</label>
          <ReactStars
            count={5}
            onChange={setRating}
            size={24}
            activeColor="#ffd700"
            value={rating}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      {message && (
        <div className="mt-3">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default AddReview;
