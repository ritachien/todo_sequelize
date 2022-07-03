module.exports = {
  checkAuth: (req, res, next) => {
    if (req.isAuthenticated()) { return next() }
    req.flash('warning_msg', 'Login to continue......')
    res.redirect('/users/login')
  }
}
