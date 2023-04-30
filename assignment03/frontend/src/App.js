import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

import AddProduct from './components/AddProduct';
import AllProducts from './components/AllProducts';
import UpdateProduct from './components/UpdateProduct';
import DeleteProduct from './components/DeleteProduct';
import Credits from './components/Credits';

function App() {
  return (
    <>
      <Navbar bg="light" expand="lg" className="py-4 px-5">
        <Navbar.Brand as={Link} to="/" className="font-weight-bold">
          MERN Product Catalog
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/add" className="mr-3">
              Add Product
            </Nav.Link>
            <Nav.Link as={Link} to="/products" className="mr-3">
              View Products
            </Nav.Link>
            <Nav.Link as={Link} to="/update" className="mr-3">
              Update Product
            </Nav.Link>
            <Nav.Link as={Link} to="/delete" className="mr-3">
              Delete Product
            </Nav.Link>
            <Nav.Link as={Link} to="/credits" className="mr-3">
              Credits
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Routes>
        <Route path="/add" element={<AddProduct />} />
        <Route path="/products/:id?" element={<AllProducts />} />
        <Route path="/update" element={<UpdateProduct />} />
        <Route path="/delete" element={<DeleteProduct />} />
        <Route path="/credits" element={<Credits />} />
      </Routes>
    </>
  );
}

export default App;
