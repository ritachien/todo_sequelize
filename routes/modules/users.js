const express = require('express')
const router = express.Router()

// Login
router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {
  res.send('/users/login')
})

// Logout
router.get('/logout', (req, res) => {
  res.redirect('/users/login')
})

// Register
router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  res.send('/users/register')
})

module.exports = router
