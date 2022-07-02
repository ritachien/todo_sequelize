const express = require('express')
const router = express.Router()

const db = require('../../models')
const Todo = db.Todo

router.get('/', async (req, res) => {
  try {
    const UserId = req.user.id
    const todos = await Todo.findAll({
      raw: true,
      nest: true,
      where: { UserId }
    })
    return res.render('index', { todos })
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
