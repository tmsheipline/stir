/////////////////////////////////
// import dependencies
/////////////////////////////////
const mongoose = require('./connection')

/////////////////////////////////
// define our user model
/////////////////////////////////
// pull the schema and model constructors from mongoose
// we're going to use something called destructuring to accomplish this
const { Schema, model } = mongoose

//make cocktail schema
const cocktailRecipeSchema = new Schema({
    idDrink: String,
    username: String,
  });

//make cocktail model
const CocktailRecipe = model("CocktailRecipe", cocktailRecipeSchema);

/////////////////////////////////
// export our user model
/////////////////////////////////
module.exports = CocktailRecipe