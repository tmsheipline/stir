/*========================================
    Import Dependencies
========================================*/
require("dotenv").config(); // Load ENV Variables
const express = require("express"); // import express
const morgan = require("morgan"); //import morgan
const methodOverride = require("method-override");
const path = require("path");
const MongoStore = require("connect-mongo");
const session = require("express-session");
const IngredientRouter = require("./controllers/ingredient");
const UserRouter = require("./controllers/user");
const CocktailRouter = require("./controllers/cocktail");
const FetchedCocktailRouter = require("./controllers/fetchedCocktail");
const CocktailRecipeRouter = require("./controllers/cocktailRecipe");

// Activate below for seed data
// const Ingredient = require('./models/ingredient')

/*========================================
    Create Express App Object Bind Liquid Templating Engine
========================================*/
const app = require("liquid-express-views")(express(), {
  root: [path.resolve(__dirname, "views/")],
});
let rowdy = require("rowdy-logger");
let rowdyResults = rowdy.begin(app);
/*========================================
    Middleware
========================================*/
app.use(morgan("tiny")); //logging
app.use(methodOverride("_method")); // override for put and delete requests from forms
app.use(express.urlencoded({ extended: true })); // parse urlencoded request bodies
app.use(express.static("public")); // serve files from public statically

app.use(
  session({
    secret: process.env.SECRET,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    saveUninitialized: true,
    resave: false,
  })
);

/*========================================
Routes
========================================*/
app.use("/ingredients", IngredientRouter);
app.use("/users", UserRouter);
app.use("/cocktails", CocktailRouter);
app.use("/fetchedCocktails", FetchedCocktailRouter);
app.use("/cocktailRecipes", CocktailRecipeRouter);

app.get("/", (req, res) => {
  res.render("index");
});

/*========================================
 Server Listener
========================================*/
const PORT = process.env.PORT;
app.listen(
  PORT,
  () => console.log(`Listening on port ${PORT}`),
  function () {
    rowdyResults.print();
  }
);

// //SEED Data
// app.get("/drinks/seed", (req, res) => {
//   // array of starter ingredients
//   const startIngredients = [
//     {
//       name: "Vodka",
//       image:
//         "https://www.thecocktaildb.com/images/ingredients/vodka-Medium.png",
//     },
//     {
//       name: "Bourbon",
//       image:
//         "https://www.thecocktaildb.com/images/ingredients/bourbon-Medium.png",
//     },
//     {
//       name: "Tequila",
//       image:
//         "https://www.thecocktaildb.com/images/ingredients/tequila-Medium.png",
//     },
//     {
//       name: "Scotch",
//       image:
//         "https://www.thecocktaildb.com/images/ingredients/scotch-Medium.png",
//     },
//     {
//       name: "Whisky",
//       image:
//         "https://www.thecocktaildb.com/images/ingredients/whiskey-Medium.png",
//     },
//     {
//       name: "Gin",
//       image: "https://www.thecocktaildb.com/images/ingredients/gin-Medium.png",
//     },
//     {
//       name: "Cognac",
//       image:
//         "https://www.thecocktaildb.com/images/ingredients/cognac-Medium.png",
//     },
//     {
//       name: "Rum",
//       image: "https://www.thecocktaildb.com/images/ingredients/rum-Medium.png",
//     },
//     {
//       name: "Grenadine",
//       image:
//         "https://www.thecocktaildb.com/images/ingredients/grenadine-Medium.png",
//     },
//     {
//       name: "Irish Creme",
//       image:
//         "https://www.thecocktaildb.com/images/ingredients/irish%20cream-Medium.png",
//     },
//     {
//       name: "Kahlua",
//       image:
//         "https://www.thecocktaildb.com/images/ingredients/kahlua-Medium.png",
//     },
//     {
//       name: "Amaretto",
//       image:
//         "https://www.thecocktaildb.com/images/ingredients/amaretto-Medium.png",
//     },
//     {
//       name: "Southern Comfort",
//       image:
//         "https://www.thecocktaildb.com/images/ingredients/southern%20comfort-Medium.png",
//     },
//     {
//       name: "Triple Sec",
//       image:
//         "https://www.thecocktaildb.com/images/ingredients/triple%20sec-Medium.png",
//     },
//     {
//       name: "Vermouth",
//       image:
//         "https://www.thecocktaildb.com/images/ingredients/vermouth-Medium.png",
//     },
//     {
//       name: "Champagne",
//       image:
//         "https://www.thecocktaildb.com/images/ingredients/champagne-Medium.png",
//     },
//     {
//       name: "Orange Bitters",
//       image:
//         "https://www.thecocktaildb.com/images/ingredients/orange%20bitters-Medium.png",
//     },
//     {
//       name: "Simple Sugar Syrup",
//       image:
//         "https://www.thecocktaildb.com/images/ingredients/sugar%20syrup-Medium.png",
//     },
//     {
//       name: "Bitters",
//       image:
//         "https://www.thecocktaildb.com/images/ingredients/bitters-Medium.png",
//     },
//     {
//       name: "Mint",
//       image: "https://www.thecocktaildb.com/images/ingredients/mint-Medium.png",
//     },
//     {
//       name: "Basil",
//       image:
//         "https://www.thecocktaildb.com/images/ingredients/basil-Medium.png",
//     },
//     {
//       name: "Lemon",
//       image:
//         "https://www.thecocktaildb.com/images/ingredients/lemon-Medium.png",
//     },
//     {
//       name: "Lemon Juice",
//       image:
//         "https://www.thecocktaildb.com/images/ingredients/lemon%20juice-Medium.png",
//     },
//     {
//       name: "Sprite",
//       image:
//         "https://www.thecocktaildb.com/images/ingredients/sprite-Medium.png",
//     },
//     {
//       name: "Dr Pepper",
//       image:
//         "https://www.thecocktaildb.com/images/ingredients/Dr%20pepper-Medium.png",
//     },
//     {
//       name: "Lemonade",
//       image: "https://thecocktaildb.com/images/ingredients/lemonade-Medium.png",
//     },
//     {
//       name: "Pineapple Juice",
//       image:
//         "https://www.thecocktaildb.com/images/ingredients/pineapple%20juice-Medium.png",
//     },
//     {
//       name: "Cranberry Juice",
//       image:
//         "https://www.thecocktaildb.com/images/ingredients/cranberry%20juice-Medium.png",
//     },
//     {
//       name: "Orange Juice",
//       image:
//         "https://www.thecocktaildb.com/images/ingredients/orange%20juice-Medium.png",
//     },
//     {
//       name: "Sugar",
//       image:
//         "https://www.thecocktaildb.com/images/ingredients/sugar-Medium.png",
//     },
//     {
//       name: "Heavy Cream",
//       image:
//         "https://www.thecocktaildb.com/images/ingredients/heavy%20cream-Medium.png",
//     },
//     {
//       name: "Tomato Juice",
//       image:
//         "https://www.thecocktaildb.com/images/ingredients/tomato%20juice-Medium.png",
//     },
//     {
//       name: "Coffee",
//       image:
//         "https://www.thecocktaildb.com/images/ingredients/coffee-Medium.png",
//     },
//     {
//       name: "Grapefruit Juice",
//       image:
//         "https://www.thecocktaildb.com/images/ingredients/grapefruit%20juice-Medium.png",
//     },
//     {
//       name: "Fruit",
//       image:
//         " https://www.thecocktaildb.com/images/ingredients/fruit-Medium.png",
//     },
//   ];
//   // Delete all ingredients
//   Ingredient.deleteMany({}).then((data) => {
//     // Seed Starter ingredients
//     Ingredient.create(startIngredients).then((data) => {
//       // send created fruits as response to confirm creation
//       res.json(data);
//     });
//   });
// });
// app.get("/drinks/seed", (req, res) => {
//   const startCocktails = [
//     {
//       name: "Espresso Martini",
//       ingredients: ["Vodka", "Kahlua", "Espresso", "Simple Syrup"],
//       measurements: ["2oz", "1oz", "1oz", ".5oz"],
//       served: "Shaken; up",
//       preparation:
//         "Chill the glass with ice and water then pour all ingredients in shaker over ice. Shake contents for minimum 20 seconds to get the frothy crema. Tap and swirl shaker to get all the foam. Pour out ice and water from prepped glass and strain ingredients over chilled glass, garnish with 3 coffee beans.",
//       image:
//         "https://www.thecocktaildb.com/images/media/drink/n0sx531504372951.jpg",
//     },
//     {
//       name: "Whiskey Sour",
//       ingredients: [
//         "Bourbon",
//         "Fresh Lemon Juice",
//         "Simple Syrup",
//         "Egg White",
//         "Angostura Bitters",
//       ],
//       image:
//         "https://www.thecocktaildb.com/images/media/drink/vruvtp1472719895.jpg",
//       measurements: ["2oz", "3/4oz", "1/2oz", "1oz", "3 drops"],
//       served: "Shaken; on the rocks",
//       preparation:
//         "Place the bourbon, lemon juice, simple syrup, and egg white in a cocktail shaker without ice. Shake vigorously for 10 seconds, to incorporate the egg white. Add ice and shake for 10 more seconds. Strain ingredients over glass. Stroke bitters a few times over foam.",
//     },
//     {
//       name: "Penicillin",
//       ingredients: [
//         "Blended Scotch",
//         "Islay Scotch",
//         "Honey-Ginger Syrup",
//         "Fresh Lemon Juice",
//       ],
//       measurements: ["2oz", "1/4oz", "3/4oz", "3/4oz"],
//       served: "Shaken, on the rocks",
//       preparation:
//         "Add Blended Scotch, lemon juice, and honey-ginger syrup into shaker, add ice and shake ingredients. Strain over ice into rocks glass. Float the Islay scotch on top using bar spoon. Garnish with candied ginger or lemon peel.",
//       image:
//         "https://www.thecocktaildb.com/images/media/drink/hc9b1a1521853096.jpg",
//     },
//     {
//       name: "Negroni",
//       ingredients: ["London Dry Gin", "Campari", "Sweet Vermouth"],
//       measurements: ["1oz", "1oz", "1oz"],
//       served: "Sirred, on the rocks",
//       preparation:
//         "Add the ingredients to a glass and fill with plenty of ice . Stir with bar spoon to dilute and bring the temperature down. Strain into rocks glass with one large cube. Garnish with orange peel",
//       image:
//         "https://www.thecocktaildb.com/images/media/drink/qgdu971561574065.jpg",
//     },
//     {
//       name: "Aperol Spritz",
//       ingredients: ["Aperol", "Prosecco", "Soda Water"],
//       measurements: ["2oz", "3oz", "1oz"],
//       served: "On the rocks; poured over ice",
//       preparation:
//         "Fill wine glass (stem or stemless) with ice and pour the Aperol, then the Prosecco and then splash with club soda. Add orange slice.",
//       image:
//         "https://www.thecocktaildb.com/images/media/drink/iloasq1587661955.jpg",
//     },
//   ];
//   // Delete all ingredients
//   Cocktail.deleteMany({}).then((data) => {
//     // Seed Starter ingredients
//     Cocktail.create(startCocktails).then((data) => {
//       // send created fruits as response to confirm creation
//       res.json(data);
//     });
//   });
// });
