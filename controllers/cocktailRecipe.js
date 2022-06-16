////////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////////
const express = require('express')
const CocktailRecipe = require('../models/cocktailRecipe')

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
 this route to get actual cocktail recipe info
========================================*/
router.get('/:drinkId', (req,res) => {
    const id = req.params.drinkId
    // console.log(`DRINK ID`,id)
    const requestURL = `www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`

    fetch(requestURL)
    .then((apiResponse) => {
        return apiResponse.json()
    })
    .then((jsonData) => {
        console.log(`here is the data`, jsonData)
        const cocktailData = jsonData
        res.render('cocktails/fetchedCocktail', {recipeData, username})
    })
    .catch((error) => {
        console.log(error)
    })
})

/*========================================
 Post Route API
========================================*/
router.post('/', (req,res) => {

    const requestURL = `www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007`

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

router.post('/recipeAPI', (req,res) => {
    // console.log(req.body.IngArray)
    const requestURL = `https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=${IdDrink}`

    fetch(requestURL)
    .then((apiResponse) => {
        return apiResponse.json()
    })
    .then((jsonData) => {
        console.log(`here is the data`, jsonData)
        const cocktailData = jsonData
        const recipeId = cocktailData.idDrink
        res.render('cocktails/fetchedCocktail', {recipeId})
    })
    // CocktailRecipe.create({recipeId})
    .catch((error) => {
        console.log(error)
    })
})

module.exports = router