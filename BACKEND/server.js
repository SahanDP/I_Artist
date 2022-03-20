//importing dependencies
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();


const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

/*
const database = {
    database: process.env.MONGODB_URL,
    secret: 'secret'
}

mongoose.connect(process.env.MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

mongoose.connection.on('connected',() => {
    console.log('connected to database'+ database);
})

mongoose.connection.on('erorr', (err) => {
    console.log('erorr');
})
*/

//connect mongodb
mongoose.connect(URL, {
    //useCreateIndex:true,
    useNewUrlParser:true,
    //useUnifiedTopologyL:true,
    //useFindAndModify:false,
    //serverApi: ServerApiVersion.v1
});

const connection = mongoose.connection;
connection.once("open", () =>{
    console.log("Mongodb connection succeeded");
});

const userRouter = require("./routes/users.js");
app.use("/user",userRouter)

app.listen(PORT, () =>{
    console.log("Server is up and running on port number ${PORT}")
});



/*
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://tharindu:<password>@cluster0.bzz94.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
*/