import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    _id: '',
    title: '',
    price: '',
    description: '',
    category: '',
    image: '',
    rating: {
      rate: '',
      count: '',
    },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'rate' || name === 'count') {
      setFormData({
        ...formData,
        rating: {
          ...formData.rating,
          [name]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/products', formData);
      if (response.status === 201) {
        alert('Product added successfully');
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Add Product</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>_id</Form.Label>
              <Form.Control
                type="text"
                name="_id"
                value={formData._id}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Rating - Rate</Form.Label>
              <Form.Control
                type="number"
                name="rate"
                value={formData.rating.rate}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Rating - Count</Form.Label>
              <Form.Control
                type="number"
                name="count"
                value={formData.rating.count}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add Product
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddProduct;
