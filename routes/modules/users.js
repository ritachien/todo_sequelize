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
  req.logout(err => {
    if (err) return next(err)
    req.flash('success_msg', 'Logout succeed.')
    res.redirect('/users/login')
  })
})

// Register
router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body
    const errors = []

    // Check form filling errors
    // Case: Any block remains blank
    if (!email || !password || !confirmPassword) {
      errors.push({ message: '所有欄位都是必填。' })
    }
    // Case: Password is different from confirmPassword
    if (password !== confirmPassword) {
      errors.push({ message: '密碼與確認密碼不相符！' })
    }
    // If fit any cases above
    if (errors.length) {
      return res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    }

    // Check if email has already registered
    const user = await User.findOne({ where: { email } })
    // Case: If email is registered
    if (user) {
      errors.push({ message: '這個 Email 已經註冊過了。' })
      return res.render('register', {
        errors,
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
