var express = require("express");
var cors = require("cors");
var fs = require("fs");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

// Create Express app
const app = express();
const port = 8081;
const host = "localhost";

// Enable CORS middleware
app.use(cors());

// Enable JSON parsing middleware
app.use(express.json());

// Enable urlencoded parsing middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Start the Express app listening on the specified port and host
app.listen(port, () => {
  console.log("App listening at http://%s:%s", host, port);
});

// Establish a connection to the MongoDB database
const { MongoClient } = require("mongodb");
const uri = "mongodb://127.0.0.1:27017";
const dbName = "reactdata";
const client = new MongoClient(uri);
const db = client.db(dbName);
const collection = db.collection("movie_catalog");

// Define an async main function to list all databases on the MongoDB server
async function main() {
  try {
    await client.connect();
    await listDatabases(client);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

// Define an async function to list all databases on the MongoDB server
async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();
  console.log("Databases:");
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
}

// Define a route to serve images from a folder
app.get("/images/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  res.sendFile(__dirname + "/images/" + imageName);
});

// Define a route to list all movies in the database
app.get("/listAll", async (request, response) => {
  await client.connect();
  const query = {};
  const results = await collection.find(query).limit(100).toArray();
  response.send(results).status(200);
});

// Define a route to get a single movie by ID
app.get("/movie/:id", async (request, response) => {
  const { id } = request.params;

  try {
    await client.connect();
    const movie = await collection.findOne({ id: parseInt(id) });

    if (movie) {
      response.status(200).send(movie);
    } else {
      response.status(404).send({ error: "Movie not found" });
    }
  } catch (error) {
    console.error("Error fetching movie:", error);
    response.status(500).send({ error: "Error fetching Movie" });
  }
});

// Define a route to add a new movie to the database
app.post("/addMovie", async (req, res) => {
  try {
    const { id, title, description, category, image, price } = req.body;

    const newMovie = {
      id: parseInt(id),
      title,
      description,
      category,
      image,
      price: parseFloat(price),
    };

    await client.connect();
    const result = await collection.insertOne(newMovie);

    console.log(`Movie added with ID: ${result.insertedId}`);
    res.sendStatus(201);
  } catch (error) {
    console.error("Error adding movie:", error);
    res.sendStatus(500);
  }
});




// Define a route to delete a movie by ID
app.delete("/deleteMovie/:id", async (req, res) => {
  await client.connect();
  let id = parseInt(req.params.id); // Convert the ID from a string to a number
  console.log(`Received delete request for movie with ID: ${id}`);
  let collection = db.collection("movie_catalog");

  const result = await collection.deleteOne({ id: id });
  console.log("Delete result:", result); // Keep this line to log the result

  if (result.deletedCount === 1) {
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

// Define a route to delete a movie by title
app.delete("/deleteMovie/:title", async (req, res) => {
  try {
    const { title } = req.params;

    await client.connect();
    const deleteResult = await collection.deleteOne({ title: title });

    if (deleteResult.deletedCount > 0) {
      res.status(200).send({ message: "Movie deleted successfully" });
    } else {
      res.status(404).send({ error: "Movie not found" });
    }
  } catch (error) {
    console.error("Error deleting movie:", error);
    res.sendStatus(500);
  }
});

// Define a route to update a movie by ID
app.put("/update/:id", async (request, response) => {
  const { id } = request.params;
  const { price, description } = request.body;

  console.log("Received data:", { id, price, description }); // Debugging

  if (!price && !description) {
    return response
      .status(400)
      .send({ error: "Price and description are missing in request body" });
  }

  const updateFields = {};
  if (price) {
    updateFields.price = parseFloat(price);
  }
  if (description) {
    updateFields.description = description;
  }

  console.log("Updating fields:", updateFields); // Debugging

  try {
    await client.connect();
    const updatedMovie = await collection.findOneAndUpdate(
      { id: parseInt(id) },
      { $set: updateFields },
      { returnOriginal: false }
    );

    if (updatedMovie.value) {
      response.status(200).send(updatedMovie.value);
    } else {
      response.status(404).send({ error: "Movie not found" });
    }
  } catch (error) {
    console.error("Error updating Movie:", error);
    response.status(500).send({ error: "Error updating Movie" });
  }
});

// Define a route to add a review to a movie by ID
app.post("/addReview/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { user, comment, rating } = req.body;

    await client.connect();
    const updatedMovie = await collection.findOneAndUpdate(
      { id: parseInt(id) },
      {
        $push: {
          reviews: {
            _id: new Date().getTime(),
            user,
            comment,
            rating,
          },
        },
      },
      { returnOriginal: false }
    );

    if (updatedMovie.value) {
      res.status(200).send(updatedMovie.value);
    } else {
      res.status(404).send({ error: "Movie not found" });
    }
  } catch (error) {
    console.error("Error updating Movie:", error);
    res.sendStatus(500);
  }
});

// Call the main function to list all databases on the MongoDB server
main().catch(console.error);
``;
