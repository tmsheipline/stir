////////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////////
const express = require('express')
const Cocktail = require('../models/cocktail')

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


// index route ('/route') - method=GET
router.get("/", (req, res) => {
    // find all the ingredients
    Cocktail.find({})
      // render a template after they are found
      .then((cocktails) => {
        res.render("cocktails/index.liquid", { cocktails });
      })
      // send error as json if they aren't
      .catch((error) => {
        res.json({ error });
      });  
    });    
    
// new route ('/route/new') - method=GET
    router.get("/cocktails/new", (req, res) => {
        res.render("cocktails/new.liquid");
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
    // create the new fruit
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
  
    // find the particular fruit from the database
    Cocktail.findById(id)
      .then((cocktail) => {
        // render the template with the data from the database
        res.render("cocktails/show.liquid", { cocktail });
      })
      .catch((error) => {
        console.log(error);
        res.json({ error });
      });
  });

  module.exports = router