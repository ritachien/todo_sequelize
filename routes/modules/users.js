const express = require('express')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const router = express.Router()

const db = require('../../models')
const User = db.User

// Login
router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

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

    // Check if user exists
    const user = await User.findOne({ where: { email } })
    if (user) {
      console.log('User already exists.')
      return res.render('register', {
        name,
        email,
        password,
        confirmPassword
      })
    }
    // Check if password equals to confirmPassword
    if (password !== confirmPassword) {
      console.log('Password and confirmPassword should be the same.')
      return res.render('register', {
        name,
        email,
        password,
        confirmPassword
      })
    }
    // Register a new user
    await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, 10)
    })
    res.redirect('/users/login')
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
