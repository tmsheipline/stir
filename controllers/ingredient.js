////////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////////
const express = require('express')
const Ingredient = require('../models/ingredient')

////////////////////////////////////////////
// Create router
////////////////////////////////////////////
const router = express.Router()

////////////////////////////////////////////
// Router Middleware
////////////////////////////////////////////
// create some middleware to protect these routes
// Authorization middleware
router.use((req, res, next) => {
	// checking the loggedin boolean of our session
	if (req.session.loggedIn) {
		// if they're logged in, go to the next thing(thats the controller)
		next()
	} else {
		// if they're not logged in, send them to the login page
		res.redirect('/user/login')
	}
})

////////////////////////////////////////////
// Routes
////////////////////////////////////////////
// index route ('/route') - method=GET
router.get("/", (req, res) => {
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



////////////////////////////////////////////
// Export the Router
////////////////////////////////////////////
module.exports = router