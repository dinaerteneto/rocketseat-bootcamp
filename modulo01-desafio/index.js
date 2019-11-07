const express = require('express');

const server = express();
server.use(express.json());

let cont = 1;
server.use((req, res, next) => {
  console.time('REQUEST');
  console.log(`Método: ${req.method}; URL: ${req.url}; Contador: ${cont++}`);
  next();
  console.timeEnd('REQUEST');
});

const projects = [];

server.get('/projects', (req, res) => res.json(projects) );
server.post('/projects', (req, res) => {
  projects.push({...req.body});
  return res.json(projects);
});

server.listen(3000);