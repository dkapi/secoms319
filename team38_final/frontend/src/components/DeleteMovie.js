import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

const DeleteMovie = () => {
  // Define state variables for movies and selected movie
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Fetch all movies on component
  useEffect(() => {
    fetchMovies();
  }, []);

  // Fetch all movies from the server
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

  // Card image style
  const cardImgStyle = {
    maxHeight: "600px",
    maxWidth: "100%",
    objectFit: "contain",
  };

  // Handle form submission for deleting a movie
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMovie) {
      alert("Please select a movie.");
      return;
    }
    // Confirm with the user that they want to delete the selected movie
    if (window.confirm("Are you sure you want to delete this movie?")) {
      try {
        const response = await axios.delete(
          `http://localhost:8081/deleteMovie/${selectedMovie.id}`
        );
        // If the response status is OK, display a success message, reset the selected movie, and refetch the movies from the server
        if (response.status === 200) {
          alert("Movie deleted successfully");
          setSelectedMovie(null);
          fetchMovies();
        }
      } catch (error) {
        console.error("Error deleting movie:", error);
        alert("Error deleting movie");
      }
    }
  };
  // Handle change in movie selection
  const handleMovieChange = (e) => {
    const movieId = e.target.value;
    // Find the movie object that matches the selected movie ID and set it as the selected movie
    const movie = movies.find((m) => m.id === parseInt(movieId));
    setSelectedMovie(movie);
  };

  // The render method
  return (
    <Container>
      <Row>
        <Col>
          <h1>Delete a Movie</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control
                as="select"
                value={selectedMovie?.id || ""}
                onChange={handleMovieChange}
                required
              >
                <option value="">Select a movie</option>
                {movies.map((movie) => (
                  <option key={movie.id} value={movie.id}>
                    {movie.title}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button variant="danger" type="submit">
              Delete Movie
            </Button>
          </Form>
          {selectedMovie && (
            <Card className="mt-4">
              <Card.Img
                variant="top"
                src={`http://localhost:8081/images/${selectedMovie.image}`}
                alt={selectedMovie.title}
                style={cardImgStyle}
              />
              <Card.Body>
                <Card.Title>{selectedMovie.title}</Card.Title>
                <Card.Text>{selectedMovie.description}</Card.Text>
                <Card.Text>Price: ${selectedMovie.price}</Card.Text>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default DeleteMovie;
