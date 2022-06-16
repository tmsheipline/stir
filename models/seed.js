
   
///////////////////////////////////////
// Import Dependencies
///////////////////////////////////////
const mongoose = require('./connection')
const Ingredient = require('./models/ingredient')

///////////////////////////////////////////
// Seed Code
////////////////////////////////////////////
// save the connection in a variable
const db = mongoose.connection;

db.on('open', () => {
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
// when we seed data, there are a few steps involved
	// delete all the data that already exists(will only happen if data exists)
	Ingredient.remove({})
        .then(deletedIngredients => {
		    console.log('this is what remove returns', deletedIngredients)
		    // then we create with our seed data
            Fruit.create(startIngredients)
                .then((data) => {
                    console.log('Here are the Seed Ingredients', data)
                    db.close()
                })
                .catch(error => {
                    console.log(error)
                    db.close()
                })
	    })
        .catch(error => {
            console.log(error)
            db.close()
        })
	// then we can send if we want to see that data

})




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

// app.get("/drinks/seed", (req, res) => {
// const startCocktails = [
//   {
//     name: "Espresso Martini",
//     ingredients: ["Vodka", "Kahlua", "Espresso", "Simple Syrup"],
//     measurements: ["2oz", "1oz", "1oz", ".5oz"],
//     served: "Shaken; up",
//     preparation:
//       "Chill the glass with ice and water then pour all ingredients in shaker over ice. Shake contents for minimum 20 seconds to get the frothy crema. Tap and swirl shaker to get all the foam. Pour out ice and water from prepped glass and strain ingredients over chilled glass, garnish with 3 coffee beans.",
//       image: "https://www.thecocktaildb.com/images/media/drink/n0sx531504372951.jpg",
//   },
//   {
//     name: "Whiskey Sour",
//     ingredients: [
//       "Bourbon",
//       "Fresh Lemon Juice",
//       "Simple Syrup",
//       "Egg White",
//       "Angostura Bitters",
//        ],
//     image: "https://www.thecocktaildb.com/images/media/drink/vruvtp1472719895.jpg",
//     measurements: ["2oz", "3/4oz", "1/2oz", "1oz", "3 drops"],
//     served: "Shaken; on the rocks",
//     preparation:
//       "Place the bourbon, lemon juice, simple syrup, and egg white in a cocktail shaker without ice. Shake vigorously for 10 seconds, to incorporate the egg white. Add ice and shake for 10 more seconds. Strain ingredients over glass. Stroke bitters a few times over foam.",
//   },
//   {
//     name: "Penicillin",
//     ingredients: [
//       "Blended Scotch",
//       "Islay Scotch",
//       "Honey-Ginger Syrup",
//       "Fresh Lemon Juice",
//     ],
//     measurements: ["2oz", "1/4oz", "3/4oz", "3/4oz"],
//     served: "Shaken, on the rocks",
//     preparation:
//       "Add Blended Scotch, lemon juice, and honey-ginger syrup into shaker, add ice and shake ingredients. Strain over ice into rocks glass. Float the Islay scotch on top using bar spoon. Garnish with candied ginger or lemon peel.",
//     image: "https://www.thecocktaildb.com/images/media/drink/hc9b1a1521853096.jpg"
//   },
//   {
//     name: "Negroni",
//     ingredients: ["London Dry Gin", "Campari", "Sweet Vermouth"],
//     measurements: ["1oz", "1oz", "1oz"],
//     served: "Sirred, on the rocks",
//     preparation:
//       "Add the ingredients to a glass and fill with plenty of ice . Stir with bar spoon to dilute and bring the temperature down. Strain into rocks glass with one large cube. Garnish with orange peel",
//     image: "https://www.thecocktaildb.com/images/media/drink/qgdu971561574065.jpg",
//   },
//   {
//     name: "Aperol Spritz",
//     ingredients: ["Aperol", "Prosecco", "Soda Water"],
//     measurements: ["2oz", "3oz", "1oz"],
//     served: "On the rocks; poured over ice",
//     preparation:
//       "Fill wine glass (stem or stemless) with ice and pour the Aperol, then the Prosecco and then splash with club soda. Add orange slice.",
//     image: "https://www.thecocktaildb.com/images/media/drink/iloasq1587661955.jpg"
//   },
// ];
//   // Delete all ingredients
//   Cocktail.deleteMany({}).then((data) => {
//     // Seed Starter ingredients
//     Cocktail.create(startCocktails).then((data) => {
//       // send created fruits as response to confirm creation
//       res.json(data);
//     });
//   })});