/*========================================
    Import Dependencies
========================================*/
require("dotenv").config(); // Load ENV Variables
const express = require("express"); // import express
const morgan = require("morgan"); //import morgan
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const path = require("path");
const Ingredient = require('./models/ingredient')
const User = require('./models/user')
const Cocktail = require('./models/cocktail')
const bcrypt = require('bcryptjs')

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
      { name: "Vodka", image: "https://www.thecocktaildb.com/images/ingredients/vodka-Medium.png"},
      { name: "Bourbon", image: "https://www.thecocktaildb.com/images/ingredients/bourbon-Medium.png"},
      { name: "Tequila", image: "https://www.thecocktaildb.com/images/ingredients/tequila-Medium.png"},
      { name: "Scotch", image: "https://www.thecocktaildb.com/images/ingredients/scotch-Medium.png"},
      { name: "Whisky", image: "https://www.thecocktaildb.com/images/ingredients/whiskey-Medium.png"},
      { name: "Gin", image: "https://www.thecocktaildb.com/images/ingredients/gin-Medium.png"},
      { name: "Cognac", image: "https://www.thecocktaildb.com/images/ingredients/cognac-Medium.png"},
      { name: "Rum", image: "https://www.thecocktaildb.com/images/ingredients/rum-Medium.png"},
      { name: "Grenadine", image: "https://www.thecocktaildb.com/images/ingredients/irish%20cream-Medium.png"},
      { name: "Irish Creme", image: "https://www.thecocktaildb.com/images/ingredients/irish%20cream-Medium.png"},
      { name: "Kahlua", image: "https://www.thecocktaildb.com/images/ingredients/kahlua-Medium.png"},
      { name: "Amaretto", image: "https://www.thecocktaildb.com/images/ingredients/amaretto-Medium.png"},
      { name: "Southern Comfort", image: "https://www.thecocktaildb.com/images/ingredients/southern%20comfort-Medium.png"},
      { name: "Triple Sec", image: "https://www.thecocktaildb.com/images/ingredients/triple%20sec-Medium.png"},
      { name: "Vermouth", image: "https://www.thecocktaildb.com/images/ingredients/vermouth-Medium.png"},
      { name: "Champagne", image: "https://www.thecocktaildb.com/images/ingredients/champagne-Medium.png"},
      { name: "Orange Bitters", image: "https://www.thecocktaildb.com/images/ingredients/orange%20bitters-Medium.png"},
      { name: "Simple Sugar Syrup", image: "https://www.thecocktaildb.com/images/ingredients/sugar%20syrup-Medium.png"},
      { name: "Bitters", image: "https://www.thecocktaildb.com/images/ingredients/bitters-Medium.png"},
      { name: "Mint", image: "https://www.thecocktaildb.com/images/ingredients/mint-Medium.png"},
      { name: "Basil", image: "https://www.thecocktaildb.com/images/ingredients/basil-Medium.png"},
      { name: "Lemon", image: "https://www.thecocktaildb.com/images/ingredients/lemon-Medium.png"},
      { name: "Lemon Juice", image: "https://www.thecocktaildb.com/images/ingredients/lemon%20juice-Medium.png"},
      { name: "Sprite", image: "https://www.thecocktaildb.com/images/ingredients/sprite-Medium.png"},
      { name: "Dr Pepper", image: "https://www.thecocktaildb.com/images/ingredients/Dr%20pepper-Medium.png"},
      { name: "Lemonade", image: "https://thecocktaildb.com/images/ingredients/lemonade-Medium.png"},
      { name: "Pineapple Juice", image: "https://www.thecocktaildb.com/images/ingredients/pineapple%20juice-Medium.png"},
      { name: "Cranberry Juice", image: "https://www.thecocktaildb.com/images/ingredients/cranberry%20juice-Medium.png"},
      { name: "Orange Juice", image: "https://www.thecocktaildb.com/images/ingredients/orange%20juice-Medium.png"},
      { name: "Sugar", image: "https://www.thecocktaildb.com/images/ingredients/sugar-Medium.png"},
      { name: "Heavy Cream", image: "https://www.thecocktaildb.com/images/ingredients/heavy%20cream-Medium.png"},
      { name: "Tomato Juice", image: "https://www.thecocktaildb.com/images/ingredients/tomato%20juice-Medium.png"},
      { name: "Coffee", image: "https://www.thecocktaildb.com/images/ingredients/coffee-Medium.png"},
      { name: "Grapefruit Juice", image: "https://www.thecocktaildb.com/images/ingredients/grapefruit%20juice-Medium.png"},
      { name: "Fruit", image: " https://www.thecocktaildb.com/images/ingredients/fruit-Medium.png"},
     
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
  app.get("/drinks/seed", (req, res) => {
  const startCocktails = [
    {
      name: "Espresso Martini",
      ingredients: ["Vodka", "Kahlua", "Espresso", "Simple Syrup"],
      measurements: ["2oz", "1oz", "1oz", ".5oz"],
      served: "Shaken; up",
      preparation:
        "Chill the glass with ice and water then pour all ingredients in shaker over ice. Shake contents for minimum 20 seconds to get the frothy crema. Tap and swirl shaker to get all the foam. Pour out ice and water from prepped glass and strain ingredients over chilled glass, garnish with 3 coffee beans.",
        image: "https://www.thecocktaildb.com/images/media/drink/n0sx531504372951.jpg",
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
      image: "https://www.thecocktaildb.com/images/media/drink/vruvtp1472719895.jpg",
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
        "Add Blended Scotch, lemon juice, and honey-ginger syrup into shaker, add ice and shake ingredients. Strain over ice into rocks glass. Float the Islay scotch on top using bar spoon. Garnish with candied ginger or lemon peel.",
      image: "https://www.thecocktaildb.com/images/media/drink/hc9b1a1521853096.jpg"
    },
    {
      name: "Negroni",
      ingredients: ["London Dry Gin", "Campari", "Sweet Vermouth"],
      measurements: ["1oz", "1oz", "1oz"],
      served: "Sirred, on the rocks",
      preparation:
        "Add the ingredients to a glass and fill with plenty of ice . Stir with bar spoon to dilute and bring the temperature down. Strain into rocks glass with one large cube. Garnish with orange peel",
      image: "https://www.thecocktaildb.com/images/media/drink/qgdu971561574065.jpg",
    },
    {
      name: "Aperol Spritz",
      ingredients: ["Aperol", "Prosecco", "Soda Water"],
      measurements: ["2oz", "3oz", "1oz"],
      served: "On the rocks; poured over ice",
      preparation:
        "Fill wine glass (stem or stemless) with ice and pour the Aperol, then the Prosecco and then splash with club soda. Add orange slice.",
      image: "https://www.thecocktaildb.com/images/media/drink/iloasq1587661955.jpg"
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

  app.get('/signup', (req, res) => {
    res.render('users/signup')
})



// new route ('/route/new') - method=GET
// new route
app.get("/cocktails/new", (req, res) => {
  res.render("cocktails/new.liquid");
});

// delete route ('/route/:id') - method=DELETE
app.delete("/cocktails/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // delete the cocktail
  Cocktail.findByIdAndRemove(id)
    .then((cocktail) => {
      // redirect to main page after deleting
      res.redirect("/cocktails");
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});



// update route ('/route/:id') - method=PUT
app.put("/cocktails/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // update the cocktail
  Cocktail.findByIdAndUpdate(id, req.body, { new: true })
    .then((cocktail) => {
      // redirect to main page after updating
      res.redirect("/cocktails");
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});



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

app.post('/users/signup', async (req, res) => {
  // console.log('this is initial req.body in signup', req.body)
  // first encrypt our password
  req.body.password = await bcrypt.hash(
      req.body.password, 
      await bcrypt.genSalt(15)
  )
  // console.log('req.body after hash', req.body)
  // create a new user
  User.create(req.body)
      // if created successfully redirect to login
      .then(user => {
          res.redirect('/user/login')
      })
      // if an error occurs, send err
      .catch(error => {
          console.log(error)
          res.json(error)
      })
})



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


