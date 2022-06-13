/*========================================
    Import Dependencies
========================================*/

require("dotenv").config(); // Load ENV Variables
const express = require("express"); // import express
const morgan = require("morgan"); //import morgan
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const path = require("path");
const { url } = require("inspector");

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
    description: String
});

//make cocktail schema
const cocktailsSchema = new Schema({
  name: String,
  ingredients: Array,
  measurements: Array,
  served: String,
  preparation: String
});

// make ingredient model
const Ingredient = model("Ingredient", ingredientsSchema);

//make cocktail model
const Cocktail = model("Cocktail", cocktailsSchema);

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
// app.get("/drinks/seed", (req, res) => {
//     // array of starter ingredients
//     const startIngredients = [
//       { name: "Vodka", img: "https://www.thecocktaildb.com/images/ingredients/vodka-Medium.png"},
//       { name: "Bourbon", img: "https://www.thecocktaildb.com/images/ingredients/bourbon-Medium.png"},
//       { name: "Mint", img: "https://www.thecocktaildb.com/images/ingredients/mint-Medium.png"},
//       { name: "Lemon", img: "https://www.thecocktaildb.com/images/ingredients/lemon-Medium.png"},
//     ];
//     // Delete all ingredients
//     Ingredient.deleteMany({}).then((data) => {
//       // Seed Starter ingredients
//       Ingredient.create(startIngredients).then((data) => {
//         // send created fruits as response to confirm creation
//         res.json(data);
//       });
//     });
//   });
  app.get("/drinks/seed", (req, res) => {
  const startCocktails = [
    {
      name: "Espresso Martini",
      ingredients: ["Vodka", "Kahlua", "Espresso", "Simple Syrup"],
      measurements: ["2oz", "1oz", "1oz", ".5oz"],
      served: "Shaken; up",
      preparation:
        "Chill the glass with ice and water then pour all ingredients in shaker over ice. Shake contents for minimum 20 seconds to get the frothy crema. Tap and swirl shaker to get all the foam. Pour out ice and water from prepped glass and strain ingredients over chilled glass, garnish with 3 coffee beans.",
        image: "",
    },
    {
      name: "Whiskey Sour",
      ingredients: [
        "Bourbon",
        "Fresh Lemon Juice",
        "Simple Syrup",
        "Egg White",
        "Angostura Bitters",
      ],
      measurements: ["2oz", "3/4oz", "1/2oz", "1oz", "3 drops"],
      served: "Shaken; on the rocks",
      preparation:
        "Place the bourbon, lemon juice, simple syrup, and egg white in a cocktail shaker without ice. Shake vigorously for 10 seconds, to incorporate the egg white. Add ice and shake for 10 more seconds. Strain ingredients over glass. Stroke bitters a few times over foam.",
    },
    {
      name: "Penicillin",
      ingredients: [
        "Blended Scotch",
        "Islay Scotch",
        "Honey-Ginger Syrup",
        "Fresh Lemon Juice",
      ],
      measurements: ["2oz", "1/4oz", "3/4oz", "3/4oz"],
      served: "Shaken, on the rocks",
      preparation:
        "Add Blended Scotch, lemon juice, and honey-ginger syrup into shaker, add ice and shake ingredients. Strain over ice into rocks glass. Float the Islay scotch on top using bar spoon. Garnish with candied ginger or lemon peel."
    },
    {
      name: "Negroni",
      ingredients: ["London Dry Gin", "Campari", "Sweet Vermouth"],
      measurements: ["1oz", "1oz", "1oz"],
      served: "Sirred, on the rocks",
      preparation:
        "Add the ingredients to a glass and fill with plenty of ice . Stir with bar spoon to dilute and bring the temperature down. Strain into rocks glass with one large cube. Garnish with orange peel"
    },
    {
      name: "Aperol Spritz",
      ingredients: ["Aperol", "Prosecco", "Soda Water"],
      measurements: ["2oz", "3oz", "1oz"],
      served: "On the rocks; poured over ice",
      preparation:
        "Fill wine glass (stem or stemless) with ice and pour the Aperol, then the Prosecco and then splash with club soda. Add orange slice.",
    },
  ];
    // Delete all ingredients
    Cocktail.deleteMany({}).then((data) => {
      // Seed Starter ingredients
      Cocktail.create(startCocktails).then((data) => {
        // send created fruits as response to confirm creation
        res.json(data);
      });
    })});



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

  app.get("/cocktails", (req, res) => {
    // find all the ingredients
    Cocktail.find({})
      // render a template after they are found
      .then((cocktails) => {
        res.render("cocktails/index.liquid", { cocktails });
      })
      // send error as json if they aren't
      .catch((error) => {
        res.json({ error });
      });
  });

// new route ('/route/new') - method=GET
// new route
app.get("/cocktails/new", (req, res) => {
  res.render("cocktails/new.liquid");
});

// delete route ('/route/:id') - method=DELETE



// update route ('/route/:id') - method=PUT



// create route ('/route') - method=POST
// create route
app.post("/cocktails", (req, res) => {
  // create the new fruit
  Cocktail.create(req.body)
    .then((cocktails) => {
      // redirect user to index page if successfully created item
      res.redirect("/cocktails");
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});



// edit route ('/route/:id/edit') - method=GET
// edit route
app.get("/cocktails/:id/edit", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // get the fruit from the database
  Cocktail.findById(id)
    .then((cocktail) => {
      // render edit page and send fruit data
      res.render("cocktails/edit.liquid", {cocktail});
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});



// show route ('/route/:id') - method=GET
// show route
app.get("/cocktails/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;

  // find the particular fruit from the database
  Cocktail.findById(id)
    .then((cocktail) => {
      // render the template with the data from the database
      res.render("cocktails/show.liquid", { cocktail });
    })
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});


/*========================================
 Server Listener
========================================*/
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));


