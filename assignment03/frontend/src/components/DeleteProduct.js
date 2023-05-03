import React, { useState } from 'react';
import axios from 'axios';

const DeleteProduct = () => {
  const [id, setId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`Sending delete request for product with ID: ${id}`);
    try {
      const response = await axios.delete(`http://localhost:8081/deleteProduct/${id}`);
      console.log(`Response from server: ${response.data}`);
      alert(`Product with ID ${id} deleted successfully`);
      setId('');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert(`Error deleting product with ID ${id}`);
    }
  };

  return (
    <div className="container">
      <h1>Delete Product</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Product ID" value={id} onChange={(e) => setId(e.target.value)} />
        <button className="btn btn-primary" type="submit">Delete Product</button>
      </form>
    </div>
  );
};

export default DeleteProduct;
