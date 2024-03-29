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

/**
 * Middleware que checa se o projeto existe
 */
function checkProjectExists(req, res, next) {
  const { id } = req.params;
  const project = projects.find( p => p.id == id );
  if(!project) {
    return res.status(400)
    .json({ error: 'Project does not exists.'});    
  }
  return next();
}

/**
 * Retorna todos os projetos
 */
server.get('/projects', (req, res) => res.json(projects) );

/**
 * Resquest body: id, title
 * Adiciona um projeto
 */
server.post('/projects', (req, res) => {
  const {id, title} = req.body;
  const project = {
    id, 
    title,
    tasks: []
  }
  projects.push(project);
  return res.json(projects);
});

/**
 * Route params: id
 * Request body: title
 * Altera o título do projeto com o id presente nos parâmetros da rota.
 */
server.put('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find( p => p.id == id );
  project.title = title;

  return res.json(project);
});

/**
 * Route params: id
 * Remove um projeto
 */
server.delete('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const projectIndex = projects.findIndex( p => p.id == id );
  projects.splice(projectIndex, 1);

  return res.send();
});

/**
 * Route params: id
 * Request body: title
 * Adiciona uma task ao projeto
 */
server.post('/projects/:id/tasks', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const project = projects.find( p => p.id == id );
  project.tasks.push(title);

  return res.json(project);
});

server.listen(3000);
