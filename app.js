// app.js
// Include packages and define server related variables
const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const routes = require('./routes')
const app = express()
const PORT = 3000

// Template engine
app.engine('hbs', exphbs.engine({ extname: 'hbs' }))
app.set('view engine', 'hbs')

// Middlewares
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// Routes
app.use(routes)

// Server
app.listen(PORT, (req, res) => {
  console.log(`App is running on http://localhost:${PORT}`)
})
