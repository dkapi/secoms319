import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const UpdateProduct = () => {
  const [productId, setProductId] = useState('');
  const [product, setProduct] = useState(null);
  const [newPrice, setNewPrice] = useState('');

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

  const handlePriceChange = (event) => {
    setNewPrice(event.target.value);
  };

  const handleUpdateSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/products/${productId}`, { price: newPrice });
      if (response.status === 200) {
        alert('Product updated successfully');
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  useEffect(() => {
    if (product) {
      setNewPrice(product.price);
    }
  }, [product]);

  return (
    <Container>
      <Row>
        <Col>
          <h1>Update Product</h1>
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
            <h2>Update Price</h2>
            <Form onSubmit={handleUpdateSubmit}>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" value={product.title} readOnly />
              </Form.Group>
              <Form.Group>
                <Form.Label>Current Price</Form.Label>
                <Form.Control type="number" value={product.price} readOnly />
              </Form.Group>
              <Form.Group>
                <Form.Label>New Price</Form.Label>
                <Form.Control type="number" value={newPrice} onChange={handlePriceChange} required />
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

export default UpdateProduct;
