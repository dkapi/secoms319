import React, { useState } from "react"; // Importing React and the useState hook from 'react'
import axios from "axios"; // Importing axios library for making API requests

const DeleteMovie = () => {
  // Defining a state variable and its setter function using the useState hook
  const [id, setId] = useState("");

  // Event handler for when the user submits the form to delete a movie
  const handleSubmit = async (e) => {
    e.preventDefault(); // Preventing the default form submission behavior
    console.log(`Sending delete request for movie with ID: ${id}`);
    try {
      // Sending a DELETE request to the server to delete the movie with the given ID
      const response = await axios.delete(
        `http://localhost:8081/deleteMovie/${id}`
      );
      console.log(`Response from server: ${response.data}`);
      // Displaying a success message and resetting the input field if the request is successful
      alert(`Movie with ID ${id} deleted successfully`);
      setId("");
    } catch (error) {
      // Logging the error to the console and displaying an error message if the request fails
      console.error("Error deleting movie:", error);
      alert(`Error deleting movie with ID ${id}`);
    }
  };

  // The render method
  return (
    <div className="container">
      <h1>Delete a Movie</h1>
      {/* The form for deleting a movie */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Movie ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">
          Delete Movie
        </button>
      </form>
    </div>
  );
};

export default DeleteMovie;
