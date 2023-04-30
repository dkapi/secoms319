import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

const DeleteProduct = () => {
  const [productId, setProductId] = useState('');
  const [product, setProduct] = useState(null);

  const fetchProduct = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const handleIdSubmit = (event) => {
    event.preventDefault();
    fetchProduct(productId);
  };

  const handleDeleteSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.delete(`http://localhost:5000/api/products/${productId}`);
      if (response.status === 200) {
        alert('Product deleted successfully');
        setProduct(null);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Delete Product</h1>
          <Form onSubmit={handleIdSubmit}>
            <Form.Group>
              <Form.Label>Product ID</Form.Label>
              <Form.Control
                type="text"
                value={productId}
                onChange={(event) => setProductId(event.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Fetch Product
            </Button>
          </Form>
        </Col>
      </Row>
      {product && (
        <Row>
          <Col>
            <Card className="my-3">
              <Card.Img variant="top" src={product.image} />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text>Category: {product.category}</Card.Text>
                <Card.Text>Price: ${product.price}</Card.Text>
                <Card.Text>Rating: {product.rating.rate} ({product.rating.count})</Card.Text>
              </Card.Body>
            </Card>
            <Form onSubmit={handleDeleteSubmit}>
              <Button variant="danger" type="submit">
                Delete Product
              </Button>
            </Form>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default DeleteProduct;
