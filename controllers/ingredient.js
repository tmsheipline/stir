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
		res.redirect('/users/login')
	}
})

////////////////////////////////////////////
// Routes
////////////////////////////////////////////
// index route ('/route') - method=GET
/*========================================
 Post Route API
========================================*/
router.post('/', (req,res) => {
  const ingArray = req.body.ingArray

  const requestURL = `https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=${ingArray}`

  fetch(requestURL)
  .then((apiResponse) => {
      return apiResponse.json()
  })
  .then((jsonData) => {
      console.log(`here is the data`, jsonData)
      const cocktailData = jsonData
      res.render('suggested', {cocktailData})
  })
  .catch((error) => {
      console.log(error)
  })
})
router.get("/", (req, res) => {
  let username = req.session.username
  let userImage = req.session.userImage
    // find all the ingredients
    Ingredient.find({})
      // render a template after they are found
      .then((ingredients) => {
        res.render("ingredients/index.liquid", { ingredients, username, userImage });
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