
const bodyParser = require('body-parser')
const { Console } = require('console')
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const exphbs = require('express-handlebars')
const path = require('path')
const indxRoutes = require('./routes/index')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')

//Templataing engine
app.engine('handlebars', exphbs({defaultLayout: 'layout'}))
app.set('view engine', 'handlebars');
app.use(flash())
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, '/public')));
app.use(session({secret: 'mysupersecret', resave: false, saveUninitialized: false  }))
app.use(indxRoutes)

mongoose.connect(process.env.DB_CONNECTION, () => {
    console.log('database connected')
})

require('./config/passport');


const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>{
    console.log('process running on ' + PORT)
})