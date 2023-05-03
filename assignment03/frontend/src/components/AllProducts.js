import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [showProducts, setShowProducts] = useState(false);

  useEffect(() => {
    if (showProducts) {
      fetchProducts();
    }
  }, [showProducts]);

  const fetchProducts = async () => {
    const response = await axios.get('http://localhost:8081/listAll');
    setProducts(response.data);
  };

  const toggleShowProducts = () => {
    setShowProducts(!showProducts);
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const cardStyle = {
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
    transition: '0.3s',
  };

  const cardImgStyle = {
    maxHeight: '250px',
    objectFit: 'cover',
  };

  return (
    <div style={containerStyle}>
      <h1 className="text-center my-4">All Products</h1>
      <div className="row justify-content-center mb-4">
        <div className="col-auto">
          <button className="btn btn-primary" onClick={toggleShowProducts}>
            {showProducts ? 'Hide Products' : 'Show Products'}
          </button>
        </div>
      </div>
      {showProducts && (
        <div className="row">
          {products.map((product) => (
            <div className="col-md-4" key={product._id}>
              <div className="card mb-4" style={cardStyle}>
                <img
                  src={product.image}
                  alt={product.title}
                  className="card-img-top"
                  style={cardImgStyle}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">{product.description}</p>
                  <p className="card-text">
                    Category: {product.category}
                  </p>
                  <p className="card-text">
                    Price: ${parseFloat(product.price).toFixed(2)}
                  </p>
                  <p className="card-text">
                    Rating: {parseFloat(product.rating.rate).toFixed(1)} ({product.rating.count} reviews)
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProducts;
