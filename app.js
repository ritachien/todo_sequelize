// app.js
// Include packages and define server related variables
const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')

const usePassport = require('./config/passport')
const routes = require('./routes')
const app = express()
const PORT = 3000

// Template engine
app.engine('hbs', exphbs.engine({ extname: 'hbs' }))
app.set('view engine', 'hbs')

// Middlewares
app.use(session({
  secret: 'TodoListSequelize',
  resave: false,
  saveUninitialized: true
}))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

// Routes
app.use(routes)

// Server
app.listen(PORT, (req, res) => {
  console.log(`App is running on http://localhost:${PORT}`)
})
