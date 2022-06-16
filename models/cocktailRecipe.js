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
    strDrink: String,
    username: String,
    strInstructions: String,
    strDrinkThumb: String,
    strIngredient1: String,
    strIngredient2: String,
    strIngredient3: String,
    strIngredient4: String,
    strIngredient5: String,
    strIngredient6: String,
    strIngredient7: String,
    strIngredient8: String,
    strIngredient9: String,
    strIngredient10: String,
    strMeasure1: String,
    strMeasure2: String,
    strMeasure3: String,
    strMeasure4: String,
    strMeasure5: String,
    strMeasure6: String,
    strMeasure7: String,
    strMeasure8: String,
    strMeasure9: String,
    strMeasure10: String,

  });

//make cocktail model
const CocktailRecipe = model("CocktailRecipe", cocktailRecipeSchema);

let cocktailRecipeArr = []

/////////////////////////////////
// export our user model
/////////////////////////////////
module.exports = CocktailRecipe