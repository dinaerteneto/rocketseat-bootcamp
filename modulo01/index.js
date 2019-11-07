const express = require('express');

const server = express();
server.use(express.json());


// Query params = ?teste=1
// Router params = /users/1
// Request body = { 'name': 'Dinaerte', email: 'dinaerteneto@gmail.com' }

const users = ['Dinaerte', 'Leonardo', 'Renato'];

server.get('/users', (req, res) => res.json(users));

server.post('/users', (req, res) => {
  const { name } = req.body;
  users.push(name);
  return res.json(users);
});

server.get('/users/:index', (req, res) => {
  const { index } = req.params;
  return res.json(users[index]);
});

server.put('/users/:index', (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  return res.json(users);
});

server.delete('/users/:index', (req, res) => {
  const { index } = req.params;
  users.splice(index, 1);

  return res.send();
})

server.listen(3000);
