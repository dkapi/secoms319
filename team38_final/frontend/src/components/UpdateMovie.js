import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const UpdateMovie = () => {
  //State variables
  const [movies, setMovies] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState("");
  const [movie, setMovie] = useState(null);
  const [newPrice, setNewPrice] = useState("");
  const [newDescription, setNewDescription] = useState("");

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get("http://localhost:8081/listAll");
      if (response.status === 200) {
        // Store the list of movies in the state variable
        setMovies(response.data);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const fetchMovie = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8081/movie/${id}`);
      if (response.status === 200) {
        // Store the details of the selected movie in the state variable
        setMovie(response.data);
      }
    } catch (error) {
      console.error("Error fetching movie:", error);
    }
  };

  const handleMovieSelect = (event) => {
    // Update the ID of the selected movie
    setSelectedMovieId(event.target.value);
    // Fetch the details of the selected movie
    fetchMovie(event.target.value);
  };

  const handlePriceChange = (event) => {
    // Update the new price of the selected movie
    setNewPrice(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    // Update the new description of the selected movie
    setNewDescription(event.target.value);
  };

  const handleUpdateSubmit = async (event) => {
    event.preventDefault();
    // Check if the new price or description is different from the current one
    if (newPrice !== movie.price || newDescription !== movie.description) {
      try {
        const response = await axios.put(
          `http://localhost:8081/update/${selectedMovieId}`,
          // Update the selected movie with the new price and description
          { price: newPrice, description: newDescription }
        );
        if (response.status === 200) {
          alert("Movie updated successfully");
          // Fetch the updated details of the selected movie
          fetchMovie(selectedMovieId);
        }
      } catch (error) {
        console.error("Error updating movie:", error);
      }
    } else {
      alert("No changes made to the price or description.");
    }
  };

  useEffect(() => {
    if (movie) {
      // Set the new price to the current price of the selected movie
      setNewPrice(movie.price);
      // Set the new description to the current description of the selected movie
      setNewDescription(movie.description);
    }
  }, [movie]);

  return (
    <Container>
      <Row>
        <Col>
          <h1>Update Movie</h1>
          <Form.Group>
            <Form.Control
              as="select"
              value={selectedMovieId}
              onChange={handleMovieSelect}
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
        </Col>
      </Row>
      {movie && (
        <Row>
          <Col>
            <h2>Update Price and Description</h2>
            <Form onSubmit={handleUpdateSubmit}>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" value={movie.title} readOnly />
              </Form.Group>
              <Form.Group>
                <Form.Label>Current Price</Form.Label>
                <Form.Control type="number" value={movie.price} readOnly />
              </Form.Group>
              <Form.Group>
                <Form.Label>New Price</Form.Label>
                <Form.Control
                  type="number"
                  value={newPrice}
                  onChange={handlePriceChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Current Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={movie.description}
                  readOnly
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>New Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={newDescription}
                  onChange={handleDescriptionChange}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Update Movie
              </Button>
            </Form>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default UpdateMovie;
