const express = require('express');
const helmet = require('helmet');

const db = require('./data/db-config.js');

const server = express();

server.use(helmet());
server.use(express.json());

server.get('/api/projects', (req, res) => {
  // get all species from the database
  db('project')
  .then(project => {
    res.status(200).json(project);
  })
  .catch(error => {
    res.status(500).json(error);
  });
});

server.get('/api/tasks', (req, res) => {
  db('tasks as t')
    .join('project as p', 'p.id', 't.project_id')
    .select('t.id', 't.name', 't.description', 'p.name', 'p.description')
  .then(tasks => {
    res.status(200).json(tasks);
  })
  .catch(error => {
    res.status(500).json(error);
  });
});

server.get('/api/resources', (req, res) => {
  db('resources as r')
    .join('project_resources as pr', 'pr.project_id', 'r.id')
    .select('r.name', 'r.description', 'pr.project_id')
  .then(resources => {
    res.status(200).json(resources);
  })
  .catch(error => {
    res.status(500).json(error);
  });
});


server.post('/api/projects', (req, res) => {
  db('project').insert(req.body)
  .then(ids => {
    const id = ids[0];

    db('project')
      .where({ id })
      .first()
    .then(project => {
      res.status(201).json(project);
    });
  })
  .catch(error => {
    res.status(500).json(error);
  });
});

server.post('/api/tasks', (req, res) => {
  db('tasks').insert(req.body)
  .then(ids => {
    const id = ids[0];

    db('tasks')
      .where({ id })
      .first()
    .then(task => {
      res.status(201).json(task);
    });
  })
  .catch(error => {
    res.status(500).json(error);
  });
});

server.post('/api/resources', (req, res) => {
  db('resources').insert(req.body)
  .then(ids => {
    const id = ids[0];

    db('resources')
      .where({ id })
      .first()
    .then(resource => {
      res.status(201).json(resource);
    });
  })
  .catch(error => {
    res.status(500).json(error);
  });
});

// // remove species
// server.delete('/api/species/:id', (req, res) => {
//   db('species')
//     .where({ id: req.params.id })
//     .del()
//   .then(count => {
//     if (count > 0) {
//       res.status(204).end();
//     } else {
//       res.status(404).json({ message: 'Record not found' });
//     }
//   })
//   .catch(error => {
//     res.status(500).json(error);
//   });
// });

module.exports = server;
