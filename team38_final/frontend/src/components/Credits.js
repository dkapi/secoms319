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
          <h3 className="mb-4">Professor: Abraham Aldaco</h3>
          <h3 className="mb-4">Date: May 4, 2023</h3>
          <p className="lead mb-4">
            A Movie Catalog webpage where you can look at selected movies, add your favorite movies, delete them, and even update them. TODO: Add a add reviews view
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
