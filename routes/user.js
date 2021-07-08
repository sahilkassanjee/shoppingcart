const express = require('express')
const app = express()
const router = express.Router();
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const passport = require('../config/passport')

//Login Page
router.get('/Login', (req, res) => {
    res.render('login')
})
//register Page

router.get('/register', (req, res) => {
    res.render('register')
})

//register handle

router.post('/sent', (req, res) => {
    const {name, email, password, password2 } = req.body
    let passwordMatch = 'Error! Passwords must match and be at least 6 characters long'

    if(password !== password2 || password.length < 6){
        res.render('register2', {
            name,
            email,
            password,
            passwordMatch
        })
    }
    else{
        //check if the email is registered
        User.findOne({ email: email })
            .then(user => {
                if(user){
                    let alreadyExists = "user already exists"
                    res.render('register2', {
                        name,
                        email,
                        password,
                        alreadyExists
                    })
                }
                else{
                    //creates a new user
                  const newUser = new User({name, email, password})

                    //hash password - bcrypt
                    bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        //set pw to hashed
                        newUser.password = hash;

                        //save user

                        newUser.save()
                            .then( user => {
                                req.flash('success_msg', 'You are now registered')
                                res.redirect('/login')
                            })
                            .catch(err => console.log(err))

                    }))               
                 }
            })
    }
})

router.get('/logout', (req, res) => {
    req.logout()
})




module.exports = router