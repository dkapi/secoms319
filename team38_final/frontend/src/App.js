import React from "react";
import { Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

import AddMovie from "./components/AddMovie";
import AllMovies from "./components/AllMovies";
import UpdateMovie from "./components/UpdateMovie";
import DeleteMovie from "./components/DeleteMovie";
import Credits from "./components/Credits";
import "./App.css";

function App() {
  return (
    <>
      <Navbar bg="light" expand="lg" className="py-4 px-5">
        <Navbar.Brand as={Link} to="/" className="font-weight-bold">
          ADK Movies
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/add" className="mr-3">
              Add Movie
            </Nav.Link>
            <Nav.Link as={Link} to="/update" className="mr-3">
              Update Movie
            </Nav.Link>
            <Nav.Link as={Link} to="/delete" className="mr-3">
              Delete Movie
            </Nav.Link>
            <Nav.Link as={Link} to="/credits" className="mr-3">
              Credits
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Routes>
        <Route path="/" element={<AllMovies />} />
        <Route path="/add" element={<AddMovie />} />
        <Route path="/movies/:id?" element={<AllMovies />} />
        <Route path="/update" element={<UpdateMovie />} />
        <Route path="/delete" element={<DeleteMovie />} />
        <Route path="/credits" element={<Credits />} />
      </Routes>
    </>
  );
}

export default App;
