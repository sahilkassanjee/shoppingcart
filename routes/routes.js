const express = require('express')
const app = express()
const router = express.Router();
const bcrypt = require('bcryptjs')
const User = require('../models/User');
const passport = require('passport');

router.get('/', (req, res) => {
    res.redirect('home')
})

router.get('/home', (req, res) => {
    res.render('home')
})



module.exports = router