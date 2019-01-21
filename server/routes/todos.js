const bodyParser = require('body-parser');
const express = require('express');
const helpers = require('../utils/helperUtils');
const getItemArrayIndex = helpers.getItemArrayIndex;
const router = express.Router();
const todos = require('../data');

router.use(bodyParser.json());

router.delete('/:id', (req, res, next) => {
  const index = getItemArrayIndex({
    id: req.params.id,
    items: todos
  });

  if (index === -1) res.status(400).send({ message: 'item not found' });

  todos.splice(index, 1);
  res.status(202).json(todos);
});

router.get('/', (req, res, next) => res.status(200).send(todos));

router.post('/', (req, res, next) => {
  const data = req.body;
  const text = data.text;

  if (!text) res.status(400).send({ message: 'text is required' });

  const id = todos.length + 1;
  const newTodo = { id, text, status: 'active' };

  todos.push(newTodo);
  res.status(201).json(todos);
});

router.put('/', (req, res, next) => {
  const data = req.body;
  const type = data.type;

  todos.forEach(todo => {
    if ((type === 'completed' && todo.status !== 'archived')
      || (type === 'archived' && todo.status === 'completed')) {

      return todo.status = type;
    }
  });

  res.status(200).json(todos);
});

router.put('/:id', (req, res, next) => {
  const data = req.body;
  const index = getItemArrayIndex({
    id: req.params.id,
    items: todos
  });

  if (index === -1) res.status(400).send({ message: 'item not found' });

  todos[index] = data.item;

  res.status(200).json(todos);
});

module.exports = router;
