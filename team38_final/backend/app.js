//import { MongoClient } from 'mongodb';
var express = require("express");
var cors = require("cors");
var fs = require("fs");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
const app = express();
const port = 8081;
const host = "localhost";
app.use('/images', express.static('images'));

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log("App listening at http://%s:%s", host, port);
});


const { MongoClient } = require("mongodb");
const uri = "mongodb://127.0.0.1:27017";
const dbName = "reactdata";
const client = new MongoClient(uri);
const db = client.db(dbName);
conss = db.collection("movie_catalog");

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

async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
}

app.get("/listAll", async (request, response) => {
    await client.connect();
    const query = {};
    const results = await db
      .collection("movie_catalog")
      .find(query)
      .limit(100)
      .toArray();
    response.send(results).status(200);
  });
  

  app.get("/movie/:id", async (request, response) => {
    const { id } = request.params;
  
    try {
      await client.connect();
      const collection = db.collection("movie_catalog");
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

  app.post("/addMovie", async (req, res) => {
    try {
      const { id, title, description, category, image, price, rating } = req.body;
      const movie = {
        id: parseInt(id),
        title,
        description,
        category,
        image,
        price: parseFloat(price),
        rating: {
          rate: parseFloat(rating.rate),
          count: parseInt(rating.count),
        },
      };
      const result = await db.collection("movie_catalog").insertOne(movie);
      console.log(`Movie added with ID: ${result.insertedId}`);
      res.sendStatus(201);
    } catch (error) {
      console.error("Error adding movie:", error);
      res.sendStatus(500);
    }
  });

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

  app.put("/update/:id", async (request, response) => {
    const { id } = request.params;
    const { price } = request.body;
  
    if (!price) {
      return response
        .status(400)
        .send({ error: "Price is missing in request body" });
    }
  
    try {
      await client.connect();
      const collection = db.collection("movie_catalog");
      const updatedMovie = await collection.findOneAndUpdate(
        { id: parseInt(id) },
        { $set: { price: parseFloat(price) } },
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
  
  main().catch(console.error);