//express
const express = require('express');
const app = express();
//bodyparser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));

const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')
app.use(flash())
require('./config/passport')(passport)

  app.use(session({
      secret: 'secret',
      resave: 'save',
      saveUninitialized: true
  }))

  app.use(passport.initialize())
  app.use(passport.session())
//imports
require('dotenv').config()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const path = require('path')



//route imports
const userRoutes = require('./routes/user')
const indxRoutes = require('./routes/index')
const loginRoutes = require('./routes/login')
const otherRoutes = require('./routes/routes')
const registerRoutes = require('./routes/register');


//routes
app.use(indxRoutes)
app.use(userRoutes)
app.use(loginRoutes)
app.use(otherRoutes)
app.use(registerRoutes)

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


//404
app.use((req, res) => {
    res.send('404: page not found')
})

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