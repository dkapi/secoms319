import { MongoClient } from 'mongodb';
const {MongoCLient} = require('mongodb');
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
var fs = require('fs');
var bodyparser = require('body-parser');
const app = express();
const port = 8000;
const host = 'localhost';

app.use(cors());
app.use(bodyparser.json());



// mongo stuff idk man

const url = "mongodb://127.0.0.1:27017";
const dbName ="reactdata";
const client = new MongoClient(url);
const db = client.db(dbName);


