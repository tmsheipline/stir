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
const cocktailsSchema = new Schema({
    name: String,
    ingredients: Array,
    measurements: Array,
    served: String,
    preparation: String,
    image: String,
    username: String,
  });

//make cocktail model
const Cocktail = model("Cocktail", cocktailsSchema);

/////////////////////////////////
// export our user model
/////////////////////////////////
module.exports = Cocktail