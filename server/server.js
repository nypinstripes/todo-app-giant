const express = require('express');
const app = express();
const indexRoutes = require('./routes/index');
const todosRoutes = require('./routes/todos');
const path = require('path');
const port = 3000;

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'pug');
app.get('/', indexRoutes);
app.use('/todos', todosRoutes);
app.use('/assets', express.static(__dirname + '/assets'));
app.use('/', express.static(__dirname + '/../dist'));
app.use('/*', indexRoutes);

const server = app.listen(port);
