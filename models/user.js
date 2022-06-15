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

// Make a user schema
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    userImage: {type: String, default:'https://tse4.mm.bing.net/th?id=OIP.b61rHwfyvldBI6kQRI78jgHaHa&pid=Api&P=0&w=162&h=162'},
    password: {
        type: String,
        required: true
    }
})

// Make a user model
const User = model("User", userSchema)

/////////////////////////////////
// export our user model
/////////////////////////////////
module.exports = User