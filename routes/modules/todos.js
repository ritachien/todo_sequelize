const express = require('express')
const router = express.Router()

const db = require('../../models')
const Todo = db.Todo

// Read: Todo's detail page
router.get('/:id', async (req, res) => {
  const id = req.params.id
  try {
    const todo = await Todo.findByPk(id)
    return res.render('detail', { todo: todo.toJSON() })
  } catch (err) {
    console.log(err)
  }
})


module.exports = router
