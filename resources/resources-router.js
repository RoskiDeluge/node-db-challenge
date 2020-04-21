const express = require('express');

const Projects = require('../projects/projects-model.js');

const router = express.Router();

router.get('/', (req, res) => {
  Projects.findResources()
  .then(resources => {
    res.json(resources);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get resources', err });
  });
});

router.post('/', (req, res) => {
  const resourceData = req.body;

  Projects.addResource(resourceData)
  .then(resource => {
    res.status(201).json(resource);
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to create new resource', err });
  });
}); 


module.exports = router;