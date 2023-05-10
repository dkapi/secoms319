import React, { useState } from "react"; 
import axios from "axios"; 

const AddMovie = () => {
  // Defining state variables and their setter functions using the useState hook
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  // Event handler for when the user submits the form
  const handleSubmit = async (e) => {
    e.preventDefault(); // Preventing the default form submission behavior

    // Creating a new movie object using the state variables
    const newMovie = {
      id: id,
      title: title,
      price: price,
      description: description,
      category: category,
      image: image,
    };

    try {
      // Sending a POST request to the server to add the new movie
      const response = await axios.post(
        "http://localhost:8081/addMovie",
        newMovie
      );
      // Displaying a success message if the request is successful
      if (response.status === 201) {
        alert("Movie added successfully");
      } else {
        // Displaying an error message if the request fails
        alert("Error adding movie");
      }
    } catch (error) {
      // Logging the error to the console if there is an error
      console.error("Error adding movie:", error);
    }
  };

  // The render method
  return (
    <div className="container">
      <h1>Add a Movie</h1>
      {/* The form for adding a new movie */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          Add Movie
        </button>
      </form>
    </div>
  );
};

export default AddMovie;
