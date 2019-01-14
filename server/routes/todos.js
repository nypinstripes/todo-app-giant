const express = require('express');
const router = express.Router();
const todos = require('../data');

router.get('/todos', (req, res, next) => {
  res.json(JSON.stringify(todos));
});

router.get('/todos/:id', (req, res, next) => {
  const id = req.params.id;
  const index = todos.findIndex(todo => todo.id === id);

  res.json(JSON.stringify(todos[index]));
});

router.post('/todos', (req, res, next) => {
  const text = req.body.data.text;

  if (!text) {
    res.status(400).json({ message: 'text is required' });

    return;
  }

  const id = todos.length + 1;
  const newTodo = { id, text, status: 'active' };

  todos.push(newTodo);

  res.status(201).json(todos);
});

router.delete('/todos/:id', (req, res, next) => {
  res.status(500).send({ message: 'not implemented' });
});

router.put('/todos/:id', (req, res, next) => {
  res.status(500).send({ message: 'not implemented' });
});

module.exports = router;
