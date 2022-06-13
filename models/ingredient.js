/*========================================
    Import Dependencies
========================================*/
const mongoose = require("mongoose");

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

// make ingredient model
const Ingredient = model("Ingredient", ingredientsSchema);

module.exports = Ingredient