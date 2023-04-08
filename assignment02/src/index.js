import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import data from './data.json';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setProducts(data)
  }, []);

  const handleQuantityChange = (id, quantity) => {
    setCart(prevCart => {
      return {
        ...prevCart,
        [id]: Math.max(quantity, 0)
      }
    });
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"
                   value={searchTerm}
                   onChange={event => setSearchTerm(event.target.value)} />
            <button className="btn btn-outline-success" type="submit">Search</button>
            <button className="btn btn-outline-danger" type="button" onClick={() => setSearchTerm("")}>Clear</button>
          </form>
        </div>
      </div>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {filteredProducts.map(product => (
          <div key={product.id} className="col">
            <div className="card h-100">
              <img src={product.image} className="card-img-top" alt={product.name} style={{ height: "250px", width: "300px", objectFit: "cover", display: "block", margin: "0 auto"  }} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <h6 className="card-subtitle mb-2 text-muted">${product.price.toFixed(2)}</h6>
                <div className="input-group mb-3">
                  <button className="btn btn-outline-secondary" type="button"
                          onClick={() => handleQuantityChange(product.id, (cart[product.id] || 0) + 1)}>+</button>
                  <input type="text" className="form-control text-center"
                         value={cart[product.id] || 0}
                         onChange={(event) => handleQuantityChange(product.id, parseInt(event.target.value) || 0)} />
                  <button className="btn btn-outline-secondary" type="button"
                          onClick={() => handleQuantityChange(product.id, (cart[product.id] || 0) - 1)}>-</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

