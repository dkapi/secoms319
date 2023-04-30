import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Credits = () => {
  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col lg={8} className="text-center">
          <h1 className="mb-4">Team Information</h1>
          <h2 className="mb-4">Course Number: Com S 319 Section 2</h2>
          <h2 className="mb-4">Course Name: Construction of User Interfaces</h2>
          <h2 className="mb-4">Professor: Abraham Aldaco</h2>
          <h2 className="mb-4">Date: April 30, 2023</h2>
          <p className="lead mb-4">
            This project is a MERN application developed by our team to showcase our skills in MongoDB, Express, React,
            and Node.js. The application allows users to manage a product catalog, including adding, viewing, updating,
            and deleting products. We have used the "https://fakestoreapi.com/products" API for product data.
          </p>
          <h2 className="mb-4">Team Members:</h2>
          <ul className="list-unstyled mb-4">
            <li className="mb-3">
              <strong>Name:</strong> Anbu Krishnan
              <br />
              <strong>Email:</strong> anbu@iastate.edu
            </li>
            <li className="mb-3">
              <strong>Name:</strong> Dino Kapic
              <br />
              <strong>Email:</strong> dkapic@iastate.edu
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default Credits;
