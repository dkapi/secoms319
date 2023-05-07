import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const UpdateMovie = () => {
  const [movie, setMovie] = useState(null);
  const [newPrice, setNewPrice] = useState("");
  const movieIdRef = useRef("");

  const fetchMovie = async (id) => {
    console.log(`fetching movie with id ${id}`);
    try {
      const response = await axios.get(`http://localhost:8081/movie/${id}`);
      if (response.status === 200) {
        setMovie(response.data);
      }
    } catch (error) {
      console.error("Error fetching movie:", error);
    }
  };

  const handleIdSubmit = (event) => {
    event.preventDefault();
    const movieId = movieIdRef.current.value.trim();
    if (movieId) {
      fetchMovie(movieId);
    }
  };

  const handlePriceChange = (event) => {
    setNewPrice(event.target.value);
  };

  const handleUpdateSubmit = async (event) => {
    event.preventDefault();
    const movieId = movieIdRef.current.value.trim();
    if (newPrice !== movie.price) {
      try {
        const response = await axios.put(
          `http://localhost:8081/update/${movieId}`,
          { price: newPrice }
        );
        if (response.status === 200) {
          alert("movie updated successfully");
          fetchMovie(movieId);
        }
      } catch (error) {
        console.error("Error updating movie:", error);
      }
    } else {
      alert("New price is the same as the current price. No changes made.");
    }
  };

  useEffect(() => {
    if (movie) {
      setNewPrice(movie.price);
    }
  }, [movie]);

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
                placeholder="Movie ID" // Added placeholder
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
            <h2>Update Price</h2>
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
              <Button variant="primary" type="submit">
                Update Price
              </Button>
            </Form>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default UpdateMovie;
