const express = require('express')
const router = express.Router()

const db = require('../../models')
const Todo = db.Todo

// Add new todo
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', async (req, res) => {
  try {
    const UserId = req.user.id
    const { name } = req.body

    await Todo.create({ name, UserId })
    return res.redirect('/')
  } catch (err) { console.log(err) }
})

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
