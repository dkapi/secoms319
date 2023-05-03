import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const UpdateProduct = () => {
  const [product, setProduct] = useState(null);
  const [newPrice, setNewPrice] = useState('');
  const productIdRef = useRef('');

  const fetchProduct = async (id) => {
    console.log(`fetching product with id ${id}`);
    try {
      const response = await axios.get(`http://localhost:8081/products/${id}`);
      if (response.status === 200) {
        setProduct(response.data);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const handleIdSubmit = (event) => {
    event.preventDefault();
    const productId = productIdRef.current.value.trim();
    if (productId) {
      fetchProduct(productId);
    }
  };

  const handlePriceChange = (event) => {
    setNewPrice(event.target.value);
  };

  const handleUpdateSubmit = async (event) => {
    event.preventDefault();
    const productId = productIdRef.current.value.trim();
    if (newPrice !== product.price) {
      try {
        const response = await axios.put(`http://localhost:8081/update/${productId}`, { price: newPrice });
        if (response.status === 200) {
          alert('Product updated successfully');
          fetchProduct(productId);
        }
      } catch (error) {
        console.error('Error updating product:', error);
      }
    } else {
      alert('New price is the same as the current price. No changes made.');
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
                ref={productIdRef}
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

export default UpdateProduct;
