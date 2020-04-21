const express = require('express');

const Projects = require('../projects/projects-model.js');

const router = express.Router();

router.get('/', (req, res) => {
  Projects.findTasks()
  .then(tasks => {
    res.json(tasks);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get tasks', err });
  });
});

router.post('/', (req, res) => {
  const taskData = req.body;

  Projects.addTask(taskData)
  .then(task => {
    res.status(201).json(task);
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to create new task', err });
  });
}); 



module.exports = router;