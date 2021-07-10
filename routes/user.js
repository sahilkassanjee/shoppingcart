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



//register handle

router.get('/logout', (req, res) => {
    req.logout()
})




module.exports = router