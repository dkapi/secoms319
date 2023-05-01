//import { MongoClient } from 'mongodb';
var express = require("express");
var cors = require("cors");
var fs = require("fs");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
const app = express();
const port = 8081;
const host = 'localhost';

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log("App listening at http://%s:%s", host, port);
});



// mongo stuff idk man
const { MongoClient } = require("mongodb");
const uri = "mongodb://127.0.0.1:27017";
const dbName ="reactdata";
const client = new MongoClient(uri);
const db = client.db(dbName);
const products = db.collection("fakestore_catalog");


async function main(){

    try{
        await client.connect();
        await listDatabases(client);
    }   catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};
// returns array of all products in the collection

app.get('/listAll', async (request, response) =>{
    await client.connect();
    const query = {};
    const results = await db.collection("fakestore_catalog")
    .find(query)
    .limit(100)
    .toArray();
    response.send(results).status(200);
});

app.post('/addProduct', async (request, response) => {
    await client.connect();
    products.insertOne(request.body[0], (err, result) => {})
    response.sendStatus(200);
});

app.delete("/deleteProduct/:id", async (req, res) => {
    await client.connect();
    let id = req.params.id;
    let collection = db.collection("fakestore_catalog");

    collection.deleteOne({id: id});
    res.sendStatus(200);
});

app.put('/update/:id/:price', async (request, response) => {
    await client.connect();
    let price = parseInt(request.params.price);
    let id = parseInt(request.params.id);
    let collection = db.collection("fakestore_catalog");
    let test = await collection.findOneAndUpdate({id: id},{$set: {price: price}}).then(res => res);
    console.log(test);
response.sendStatus(200);
});

main().catch(console.error);