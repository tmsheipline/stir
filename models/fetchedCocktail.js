/////////////////////////////////
// import dependencies
/////////////////////////////////
const mongoose = require('mongoose')

/////////////////////////////////
// define our user model
/////////////////////////////////
// pull the schema and model constructors from mongoose
// we're going to use something called destructuring to accomplish this
const { Schema, model } = mongoose

//make cocktail schema
const fetchedCocktailSchema = new Schema({
    name: String,
    ingredients: Array,
  });

//make cocktail model
const FetchedCocktail = model("FetchedCocktail", fetchedCocktailSchema);

/////////////////////////////////
// export our user model
/////////////////////////////////
module.exports = FetchedCocktail