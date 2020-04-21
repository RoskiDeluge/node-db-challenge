const db = require('../data/db-config.js');


//READ
function find() {
  return db('project');
}

function findById(id) {
  return db('project')
      .where({ id })
      .first();
}

function findTasks() {
  return db('tasks as t')
    .join('project as p', 'p.id', 't.project_id')
    .select('t.id', 't.description', 't.notes', 't.completed', 'p.name as project_name', 'p.description as project_description')
}

function findResources() {
  return db('resources')
}

// function findTasksById(id) {
//   return db('tasks as t')
//       .join('project as p', 'p.id', 't.project_id')
//       .select('sc.scheme_name','s.step_number', 's.instructions')
//       .where({ project_id: id });
// }

//CREATE
function add(project) {
  return db('project').insert(project);
}

function addTask(task) {
  return db('tasks').insert(task);
}

function addResource(resource) {
  return db('resources').insert(resource);
}

module.exports = {
  find,
  findById,
  findTasks,
  findResources,
  add,
  addTask,
  addResource,
};