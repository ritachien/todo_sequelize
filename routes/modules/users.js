const express = require('express')
const router = express.Router()

const db = require('../../models')
const Todo = db.Todo
const User = db.User

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

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body
    await User.create({ name, email, password })
    res.redirect('/')
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
