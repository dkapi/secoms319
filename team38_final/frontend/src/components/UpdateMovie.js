import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

// Define the UpdateMovie component
const UpdateMovie = () => {
  // Define state variables
  const [movie, setMovie] = useState(null);
  const [newPrice, setNewPrice] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const movieIdRef = useRef("");

  // Define a function to fetch a movie by its ID
  const fetchMovie = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8081/movie/${id}`);
      if (response.status === 200) {
        setMovie(response.data);
      }
    } catch (error) {
      console.error("Error fetching movie:", error);
    }
  };

  // Define a function to handle the form submission to fetch a movie by its ID
  const handleIdSubmit = (event) => {
    event.preventDefault();
    const movieId = movieIdRef.current.value.trim();
    if (movieId) {
      fetchMovie(movieId);
    }
  };

  // Define functions to handle changes to the price and description fields
  const handlePriceChange = (event) => {
    setNewPrice(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setNewDescription(event.target.value);
  };

  // Define a function to handle the form submission to update the movie's price and description
  const handleUpdateSubmit = async (event) => {
    event.preventDefault();
    const movieId = movieIdRef.current.value.trim();
    if (newPrice !== movie.price || newDescription !== movie.description) {
      try {
        const response = await axios.put(
          `http://localhost:8081/update/${movieId}`,
          { price: newPrice, description: newDescription }
        );
        if (response.status === 200) {
          alert("Movie updated successfully");
          fetchMovie(movieId);
        }
      } catch (error) {
        console.error("Error updating movie:", error);
      }
    } else {
      alert("No changes made to the price or description.");
    }
  };

  // Define an effect hook to set the initial values for the newPrice and newDescription fields when a movie is fetched
  useEffect(() => {
    if (movie) {
      setNewPrice(movie.price);
      setNewDescription(movie.description);
    }
  }, [movie]);

  // Render the UpdateMovie component
  return (
    <Container>
      <Row>
        <Col>
          <h1>Update Movie</h1>
          <Form onSubmit={handleIdSubmit}>
            <Form.Group>
              <Form.Control
                type="text"
                ref={movieIdRef}
                required
                placeholder="Movie ID"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Fetch Movie
            </Button>
          </Form>
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
                Update Price and Description
              </Button>
            </Form>
          </Col>
        </Row>
      )}
    </Container>
  );
};

// Export the UpdateMovie component
export default UpdateMovie;
