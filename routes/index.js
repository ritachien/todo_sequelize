const express = require('express')
const router = express.Router()

const { checkAuth } = require('../middlewares/auth')
const home = require('./modules/home')
const users = require('./modules/users')
const todos = require('./modules/todos')
const account = require('./modules/account')

router.use('/users', users)
router.use('/todos', checkAuth, todos)
router.use('/account', checkAuth, account)
router.use('/', checkAuth, home)

module.exports = router
