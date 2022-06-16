/*========================================
    Import Dependencies
========================================*/
const mongoose = require("mongoose");
require('dotenv').config()


/*========================================
    Database Connection
========================================*/
const DATABASE_URL = process.env.MONGODB_URI;
const CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Establish Connection
mongoose.connect(DATABASE_URL, CONFIG);

// Events for when connection opens/disconnects/errors
mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${mongoose.connection.host}:${mongoose.connection.port}`);
});

mongoose.connection.on("error", (err) => {
  console.log("Could not connect to MongoDB!", err);
});

  /*========================================
   Export connection
  ========================================*/
  module.exports = mongoose