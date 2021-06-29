const express = require('express');

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
  }));

require('dotenv').config()

const mongoose = require('mongoose')

const exphbs = require('express-handlebars')
const path = require('path')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')


const userRoutes = require('./routes/user')
const indxRoutes = require('./routes/index')
//Templataing engine
app.engine('handlebars', exphbs({defaultLayout: 'layout'}))
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, '/public')));

//express session
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
}))

//connect flash
app.use(flash())

//global variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('sucess_msg');
    res.locals.error_msg = req.flash('error_msg');
    next()
})


//routes
app.use(indxRoutes)
app.use(userRoutes)

//database
mongoose.connect(process.env.DB_CONNECTION, (err) => {
    if(err){
        console.log(err)
    }
    
    console.log('database connected')


})

require('./config/passport');


const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>{
    console.log('process running on ' + PORT)
})