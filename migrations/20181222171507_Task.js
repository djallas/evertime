exports.up = function (knex, Promise) {
  return knex.schema.createTable('tasks', (table) => {
    table.increments('id');
    table.string('task', 120).notNullable();
    table.string('time', 300);
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('tasks');
};
