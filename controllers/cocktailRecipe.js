////////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////////
const express = require("express");
const CocktailRecipe = require("../models/cocktailRecipe");
const fetch = require('node-fetch')
////////////////////////////////////////////
// Create router
////////////////////////////////////////////
const router = express.Router();

////////////////////////////////////////////
// Router Middleware
////////////////////////////////////////////
// create some middleware to protect these routes
// Authorization middleware
router.use((req, res, next) => {
  // checking the loggedin boolean of our session
  if (req.session.loggedIn) {
    // if they're logged in, go to the next thing(thats the controller)
    next();
  } else {
    // if they're not logged in, send them to the login page
    res.redirect("/users/login");
  }
});

router.post("/:id", (req, res) => {
  req.body.username = req.session.username;
  // create the new cocktail
  CocktailRecipe.create(req.body)
    .then((cocktailrecipe) => {
      console.log(cocktailrecipe);
      // redirect user to index page if successfully created item
      res.redirect("/cocktails");
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

/*========================================
 Post Route API
========================================*/
router.post("/", (req, res) => {
  const requestURL = `www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007`;

  fetch(requestURL)
    .then((apiResponse) => {
      return apiResponse.json();
    })
    .then((jsonData) => {
      console.log(`here is the data`, jsonData);
      const cocktailData = jsonData;
      res.render("cocktails/fetchedCocktail", { cocktailData, username });
    })
    .catch((error) => {
      console.log(error);
    });
});

// delete route ('/route/:id') - method=DELETE
router.delete("/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // delete the cocktail
  CocktailRecipe.findByIdAndRemove(id)
    .then((cocktailrecipe) => {
      // redirect to main page after deleting
      res.redirect("/cocktails");
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});


module.exports = router;
