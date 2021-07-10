const express = require('express')
const app = express()
const router = express.Router();
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const passport = require('../config/passport')

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', (req, res) => {
    const {name, email, password, password2} = req.body

    
    let passwordError = 'password must be at least 6 characters long'
    let passwordMatch = 'Passwords must match'
    let userExists = 'That account already exists!'
    if(password.length < 6){
        res.render('register', {
            name, email, password, password2, passwordError
        })
    }

    if(password !== password2){
        res.render('register', {
            name, email, password, password2, passwordMatch
        })
    }else{
        User.findOne({email: email}).then(user =>{
            if(user){
                res.render('register', {userExists})
            }else{
                const newUser = new User({
                    name,
                    email,
                    password
                })

                bcrypt.genSalt(10, (err, salt) => 
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash
                        newUser.save()
                        .then(
                            res.render('register-success')
                        )
                        .catch(err => console.log(err))
                    }))
            }
        })
    }
    
})



module.exports = router