/*========================================
    Import Dependencies
========================================*/

require("dotenv").config(); // Load ENV Variables
const express = require("express"); // import express
const morgan = require("morgan"); //import morgan
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const path = require("path")

/*========================================
    Database Connection
========================================*/
const DATABASE_URL = process.env.DATABASE_URL;
const CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Establish Connection
mongoose.connect(DATABASE_URL, CONFIG);

// Events for when connection opens/disconnects/errors
mongoose.connection
  .on("open", () => console.log("Connected to Mongoose"))
  .on("close", () => console.log("Disconnected from Mongoose"))
  .on("error", (error) => console.log(error));

  /*========================================
        Models
  ========================================*/
const { Schema, model } = mongoose;

// make ingredients schema based on API Info
const ingredientsSchema = new Schema({
    name: String,
    image: String,
});

// make ingredient model
const Ingredient = model("Ingredient", ingredientsSchema);

/*========================================
    Create Express App Object Bind Liquid Templating Engine
========================================*/
const app = require("liquid-express-views")(express(), {root: [path.resolve(__dirname, 'views/')]})

/*========================================
    Middleware
========================================*/
app.use(morgan("tiny")); //logging
app.use(methodOverride("_method")); // override for put and delete requests from forms
app.use(express.urlencoded({ extended: true })); // parse urlencoded request bodies
app.use(express.static("public")); // serve files from public statically

/*========================================
    Routes
========================================*/
//SEED Data
app.get("/drinks/seed", (req, res) => {
    // array of starter ingredients
    const startIngredients = [
      { name: "Vodka", img: "https://www.thecocktaildb.com/images/ingredients/vodka-Medium.png", selected: false},
      { name: "Bourbon", img: "https://www.thecocktaildb.com/images/ingredients/bourbon-Medium.png", selected: false},
      { name: "Mint", img: "https://www.thecocktaildb.com/images/ingredients/mint-Medium.png", selected: false},
      { name: "Lemon", img: "https://www.thecocktaildb.com/images/ingredients/lemon-Medium.png", selected: false},
    ];
    // Delete all ingredients
    Ingredient.deleteMany({}).then((data) => {
      // Seed Starter ingredients
      Ingredient.create(startIngredients).then((data) => {
        // send created fruits as response to confirm creation
        res.json(data);
      });
    });
  });
  

  app.get("/", (req, res) => {
      res.send("server is running...better catch it.");
    });
  
// I-N-D-U-C-E-S
// index route ('/route') - method=GET
app.get("/ingredients", (req, res) => {
    // find all the ingredients
    Ingredient.find({})
      // render a template after they are found
      .then((ingredients) => {
        res.render("ingredients/index.liquid", { ingredients });
      })
      // send error as json if they aren't
      .catch((error) => {
        res.json({ error });
      });
  });
// new route ('/route/new') - method=GET



// delete route ('/route/:id') - method=DELETE



// update route ('/route/:id') - method=PUT



// create route ('/route') - method=POST



// edit route ('/route/:id/edit') - method=GET



// show route ('/route/:id') - method=GET


/*========================================
 Server Listener
========================================*/
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));


