////////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////////
const express = require('express')
const CocktailRecipe = require('../models/cocktailRecipe')
const fetchedCocktail = require('../models/fetchedCocktail')

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

/*========================================
 ROUTES
========================================*/
/*========================================
 this route to get actual cocktail recipe info
========================================*/
router.get('/:drinkId', (req,res) => {
    const id = req.params.drinkId
    let username = req.session.username
    // console.log(`DRINK ID`,id)
    // res.send(id)
    const requestURL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`

    fetch(requestURL)
    .then((apiResponse) => {
        console.log(apiResponse)
        return apiResponse.json()
    })
    .then((jsonData) => {
        console.log(`here is the data`, jsonData)
        const recipeData = jsonData
        const recipe = recipeData.drinks[0]
        res.render('cocktails/cocktailRecipe',({recipe, username}))
    })
    .catch((error) => {
        console.log(error)
    })
})

// index route ('/route') - method=GET
router.get("/", (req, res) => {
    let username = req.session.username
      // find all the cocktails
      fetchedCocktail.find({username: req.session.username})
        // render a template after they are found
        .then((fetchedCocktail) => {
          res.render("/cocktails/fetchedCocktail.liquid", {fetchedCocktails, username});
        })
        // send error as json if they aren't
        .catch((error) => {
          res.json({ error });
        });  
      });   

/*========================================
 Edit
========================================*/
  // edit route ('/route/:id/edit') - method=GET
  router.get("/:id/edit", (req, res) => {
    // get the id from params
    const id = req.params.id;
    // get the recipe from the database
    CocktailRecipe.findById(id)
      .then((recipe) => {
        // render edit page and send recipe data
        res.render("cocktails/index", {recipe});
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
router.post('/', (req,res) => {
    let username = req.session.username

    const requestURL = `https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=vodka,gin`

    fetch(requestURL)
    .then((apiResponse) => {
        return apiResponse.json()
    })
    .then((jsonData) => {
        console.log(`here is the data`, jsonData)
        const cocktailData = jsonData
        res.render('cocktails/fetchedCocktail', {cocktailData, username})
    })
    .catch((error) => {
        console.log(error)
    })
})

router.post('/API', (req,res) => {
    let username = req.session.username
    console.log(req.body.IngArray)
    const requestURL = `https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=${req.body.IngArray}`

    fetch(requestURL)
    .then((apiResponse) => {
        return apiResponse.json()
    })
    .then((jsonData) => {
        console.log(`here is the data`, jsonData)
        const cocktailData = jsonData
        const drinks = cocktailData.drinks
        res.render('cocktails/fetchedCocktail', {drinks, username})
    })
    .catch((error) => {
        console.log(error)
    })
})

router.post('/:id', (req,res) => {
    req.body.username = req.session.username; 
    // create the new cocktail
    
    CocktailRecipe.create(req.body)
    .then((cocktailrecipe) => {
      // redirect user to index page if successfully created item
      res.redirect("/cocktails");
    })  
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });  
  }); 

module.exports = router