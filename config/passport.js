// config/passport.js
// Include packages and define server related variables
const passport = require('passport')
const LocalStrategy = require('passport-local')
const bcrypt = require('bcryptjs')

const db = require('../models')
const User = db.User

module.exports = app => {
  // Initialize Passport module
  app.use(passport.initialize())
  app.use(passport.session())

  // LocalStrategy setting
  passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true, },
    async (req, email, password, done) => {
      try {
        // Check email
        const user = await User.findOne({ where: { email } })
        if (!user) {
          req.flash('warning_msg', 'Email is not registered!')
          return done(null, false)
        }
        // Check password
        const isMatch = bcrypt.compareSync(password, user.password)
        if (!isMatch) {
          req.flash('warning_msg', 'Email or Password incorrect.')
          return done(null, false)
        }
        // Login success
        return done(null, user)
      } catch (err) { console.log(err) }
    }))

  // Serialize & deserialize
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser(async (id, done) => {
    try {
      const userFind = await User.findByPk(id)
      const user = userFind.toJSON()
      return done(null, user)
    } catch (err) { console.log(err) }
  })
}
