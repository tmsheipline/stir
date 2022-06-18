////////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////////
const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
// const popupS = require('popups')

////////////////////////////////////////////
// Create router
////////////////////////////////////////////
const router = express.Router()

////////////////////////////////////////////
// Routes
////////////////////////////////////////////

// example
router.get('/', (req, res) => {
    res.send('User Controller log')
})
// two sign up routes
// get to render the signup form
router.get('/signup', (req, res) => {
    res.render('users/signup')
})
// post to send the signup info
router.post('/signup', async (req, res) => {
    // console.log('this is initial req.body in signup', req.body)
    // first encrypt our password
    req.body.password = await bcrypt.hash(
        req.body.password, 
        await bcrypt.genSalt(15)
    )
    // console.log('req.body after hash', req.body)
    // create a new user
    User.create(req.body)
        // if created successfully redirect to login
        .then(user => {
            res.redirect('/users/login')
        })
        // if an error occurs, send err
        .catch(error => {
            console.log(error)
            // popupS.alert({content:error})
            res.redirect('/users/login')
            // res.json(error)
        })
})
 



// two login routes
// get to render the login form
router.get('/login', (req, res) => {
    res.render('users/login')
})
// post to send the login info(and create a session)
router.post('/login', async (req, res) => {
    // console.log('request object', req)
    // get the data from the request body
    const { username, password, userImage } = req.body
    // then we search for the user
    User.findOne({ username })
        .then(async (user) => {
            // check if the user exists
            if (user) {
                // compare the password
                // bcrypt.compare evaluates to a truthy or a falsy value
                const result = await bcrypt.compare(password, user.password)

                if (result) {
                    // then we'll need to use the session object
                    // store some properties in the session
                    req.session.username = username
                    req.session.userImage = userImage
                    req.session.loggedIn = true
                    // redirect to /ingredients if login is successful
                    res.redirect('/ingredients')
                } else {
                    // send an error if the password doesnt match
                    // popupS.alert({content:'password incorrect'})
                    res.json({ error: 'password incorrect'})

                }
            } else {
                // send an error if the user doesnt exist
                // popupS.alert({content:'user does not exist'})
                res.json({ error: 'user does not exist' })
            }
        })
        // catch any other errors that occur
        .catch(error => {
            console.log(error)
        //    popupS.alert({content:error})
        })
})

// logout route -> destroy the session
router.get('/logout', (req, res) => {
    // destroy the session and redirect to the main page
    req.session.destroy(err => {
        res.redirect('/')
    })
})

////////////////////////////////////////////
// Export the Router
////////////////////////////////////////////
module.exports = router