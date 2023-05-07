import React, { useState } from 'react';
import axios from 'axios';

const AddMovie = () => {
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [ratingRate, setRatingRate] = useState('');
  const [ratingCount, setRatingCount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMovie = {
      id: id,
      title: title,
      price: price,
      description: description,
      category: category,
      image: image,
      rating: {
        rate: parseFloat(ratingRate),
        count: parseInt(ratingCount)
      },
    };

    try {
      const response = await axios.post('http://localhost:8081/addMovie', newMovie);
      if (response.status === 201) {
        alert('Movie added successfully');
      } else {
        alert('Error adding movie');
      }
    } catch (error) {
      console.error('Error adding movie:', error);
    }
  };

  return (
    <div className="container">
      <h1>Add a Movie</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="ID" value={id} onChange={(e) => setId(e.target.value)} />
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
        <input type="text" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} />
        <input type="text" placeholder="Rating" value={ratingRate} onChange={(e) => setRatingRate(e.target.value)} />
        <input type="text" placeholder="Rating Count" value={ratingCount} onChange={(e) => setRatingCount(e.target.value)} />
        <button type="submit" className="btn btn-primary">Add Movie</button>
      </form>
    </div>
  );
};

export default AddMovie;
