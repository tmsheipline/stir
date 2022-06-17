////////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////////
const express = require('express')
const Cocktail = require('../models/cocktail')
const CocktailRecipe = require('../models/cocktailRecipe')
const FetchedCocktail = require('../models/fetchedCocktail')

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
// new route ('/route/new') - method=GET
// router.get("/suggested", (req, res) => {
//   let username = req.session.username
//   let userImage = req.session.userImage
//   res.render(("cocktails/suggested.liquid"), {username, userImage});
// });  


// index route ('/route') - method=GET
router.get("/", (req, res) => {
  let username = req.session.username
  let userImage = req.session.userImage
    // find all the cocktails
    Cocktail.find({username: req.session.username})
      // render a template after they are found
      .then((cocktails) => {
        CocktailRecipe.find({username: req.session.username})
        .then((cocktailRecipe) => {
          res.render("cocktails/index.liquid", { cocktails, username, userImage,cocktailRecipe });
        })
      })
      // send error as json if they aren't
      .catch((error) => {
        res.json({ error });
      });  
    });    


    
// new route ('/route/new') - method=GET
    router.get("/new", (req, res) => {
      let username = req.session.username
      let userImage = req.session.userImage
        res.render(("cocktails/new.liquid"), {username, userImage});
      });  

// delete route ('/route/:id') - method=DELETE
router.delete("/:id", (req, res) => {
    // get the id from params
    const id = req.params.id;
    // delete the cocktail
    Cocktail.findByIdAndRemove(id)
      .then((cocktail) => {
        // redirect to main page after deleting
        res.redirect("/cocktails");
      })  
      // send error as json
      .catch((error) => {
        console.log(error);
        res.json({ error });
      });  
  });  
  
  // update route ('/route/:id') - method=PUT
router.put("/:id", (req, res) => {
    // get the id from params
    const id = req.params.id;
    // update the cocktail
    Cocktail.findByIdAndUpdate(id, req.body, { new: true })
      .then((cocktail) => {
        // redirect to main page after updating
        res.redirect("/cocktails");
      })  
      // send error as json
      .catch((error) => {
        console.log(error);
        res.json({ error });
      });  
  });  
  
// create route ('/route') - method=POST
router.post("/", (req, res) => {
   // add username to req.body to track related user
   req.body.username = req.session.username;
    // create the new cocktail
    Cocktail.create(req.body)
    .then((cocktails) => {
      // redirect user to index page if successfully created item
      res.redirect("/cocktails");
    })  
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });  
  });  
  // FetchedCocktail.create(req.body)
  // .then((fetchedCocktails) => {
  //   // redirect user to index page if successfully created item
  //   res.redirect("/cocktails");
  // })  
  // // send error as json
  // .catch((error) => {
  //   console.log(error);
  //   res.json({ error });
  // });   

  // edit route ('/route/:id/edit') - method=GET
router.get("/:id/edit", (req, res) => {
    // get the id from params
    const id = req.params.id;
    // get the fruit from the database
    Cocktail.findById(id)
      .then((cocktail) => {
        // render edit page and send fruit data
        res.render("cocktails/edit.liquid", {cocktail});
      })
      // send error as json
      .catch((error) => {
        console.log(error);
        res.json({ error });
      });
  });


  // show route ('/route/:id') - method=GET
  router.get("/:id", (req, res) => {
    // get the id from params
    const id = req.params.id;
    let username = req.session.username
    // find the particular fruit from the database
    Cocktail.findById(id)
      .then((cocktail) => {
        // render the template with the data from the database
        res.render("cocktails/show.liquid", { cocktail,username });
      })
      .catch((error) => {
        console.log(error);
        res.json({ error });
      });
  });

  module.exports = router