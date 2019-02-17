import knex from './knex';

// this is to get task column from the db
function Tasks() {
  return knex('tasks');
}
// this to fetch all Tasks from the db
const getAll = () => Tasks().select()
  .orderBy('id', 'desc');

// create a new task post
const create = task => Tasks().insert(task, ['id','task', 'time']);

module.exports = {
  getAll,
  create
};
