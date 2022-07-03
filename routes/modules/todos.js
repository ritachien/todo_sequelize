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

// Update todo
router.get('/:id/edit', async (req, res) => {
  const id = req.params.id

  try {
    const todo = await Todo.findByPk(id)
    res.render('edit', { todo: todo.toJSON() })
  } catch (err) { console.log(err) }

})

router.put('/:id', async (req, res) => {
  const UserId = req.user.id
  const id = req.params.id
  const { name, isDone } = req.body

  try {
    await Todo.update(
      { name, isDone: isDone === 'on' },
      { where: { UserId, id } }
    )
    return res.redirect(`/todos/${id}`)
  } catch (err) { console.log(err) }
})

// Delete todo
router.delete('/:id', async (req, res) => {
  const UserId = req.user.id
  const id = req.params.id

  try {
    await Todo.destroy({ where: { UserId, id } })
    res.redirect('/')
  } catch (err) { console.log(err) }
})

module.exports = router
