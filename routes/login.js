const express = require('express')
const app = express()
const router = express.Router();
const bcrypt = require('bcryptjs')
const User = require('../models/User');
const passport = require('passport');


router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
})


module.exports = router