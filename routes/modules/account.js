const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()

const db = require('../../models')
const User = db.User

router.get('/', (req, res) => {
  const user = req.user
  res.render('account', { user })
})

router.post('/', async (req, res) => {
  const id = req.user.id
  const { name, password, confirmPassword } = req.body

  try {
    // If no update to password
    if (!password && !confirmPassword) {
      await User.update({ name }, { where: { id } })
      req.flash('success_msg', 'Update succeed!')
      res.redirect('/account')
    }
    // If update password or confirmPassword
    if (password || confirmPassword) {
      // If password NOT EQUALS confirmPassword
      if (password !== confirmPassword) {
        req.flash('warning_msg', '密碼與確認密碼不相符！')
        return res.redirect('/account')
      }
      // If password EQUALS confirmPassword
      await User.update({
        name,
        password: bcrypt.hashSync(password, 10)
      }, { where: { id } })
      req.flash('success_msg', 'Update succeed!')
      res.redirect('/account')
    }
  } catch (err) { console.log(err) }
})

module.exports = router
