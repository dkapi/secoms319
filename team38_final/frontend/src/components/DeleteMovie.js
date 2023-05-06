import React, { useState } from 'react';
import axios from 'axios';

const DeleteMovie = () => {
  const [id, setId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`Sending delete request for movie with ID: ${id}`);
    try {
      const response = await axios.delete(`http://localhost:8081/deleteMovie/${id}`);
      console.log(`Response from server: ${response.data}`);
      alert(`Movie with ID ${id} deleted successfully`);
      setId('');
    } catch (error) {
      console.error('Error deleting movie:', error);
      alert(`Error deleting movie with ID ${id}`);
    }
  };

  return (
    <div className="container">
      <h1>Delete Product</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Movie ID" value={id} onChange={(e) => setId(e.target.value)} />
        <button className="btn btn-primary" type="submit">Delete Movie</button>
      </form>
    </div>
  );
};

export default DeleteMovie;
