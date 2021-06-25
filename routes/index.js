var express = require('express')
var router = express.Router()
var Product = require('../models/product')
var csrf = require('csurf')
const passport = require('passport')

var csrfProtection = csrf()

router.use(csrfProtection)

router.get('/', (req, res) => {
    Product.find((err, docs) => {
        let newDocs = JSON.stringify(docs)
        console.log(newDocs)
        let newDocss = JSON.parse(newDocs)
        console.log(newDocss)
        res.render('index', { products: newDocss})
    })
})




module.exports = router;