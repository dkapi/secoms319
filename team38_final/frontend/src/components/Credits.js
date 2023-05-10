import React from "react";
import { Container, Row, Col } from "react-bootstrap";

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
            A Movie Catalog sing page web application, where you can look at selected movies in the
            catalog and information about them, this app allows you to add your
            own movies, update the movie's attributes, or even delete the movies.
            You can also add multiple reviews to a specific movie as well as a
            rating which has a star system. The purpose of this app is to allow a user to have their own
            customizable movie catalog that has information that describes a
            specific movie, for example the price and description of a movie, as well as ratings and reviews.
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
