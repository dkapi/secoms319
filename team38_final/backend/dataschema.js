const mongoose = require("mongoose");

// Define a review schema for the reviews embedded within the movie schema
const reviewSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  user: { type: String, required: true },
  comment: { type: String, required: true },
  rating: { type: Number, required: true }
});

// Define a movie schema using Mongoose.Schema
const movieSchema = new mongoose.Schema(
  {
    _id: { type: Number }, // Define an ID for the movie
    title: { type: String, required: true }, // Define the title of the movie
    price: { type: Number, required: true }, // Define the price of the movie
    description: { type: String, required: true }, // Define the description of the movie
    category: { type: String, required: true }, // Define the category of the movie
    image: { type: String, required: true }, // Define the image URL of the movie
    reviews: [reviewSchema] // Embed the review schema in the movie schema to enable reviews for a movie
  },
  { collection: "movie_catalog" } // Set the collection name to "movie_catalog"
);

// Create a Movie model using the movie schema
const Movie = mongoose.model("Movie", movieSchema);

// Export the Movie model
module.exports = Movie;
