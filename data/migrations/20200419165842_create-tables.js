exports.up = function (knex) {
  return (
      knex.schema
          .createTable('project', tbl => {
              tbl.increments();
              tbl.string('name', 255).notNullable();
              tbl.text('description');
              tbl.boolean('completed').notNullable().default(false);
          })
          .createTable('tasks', tbl => {
              tbl.increments();
              tbl.text('description').notNullable();
              tbl.text('notes');
              tbl.boolean('completed').notNullable().default(false);
              tbl.integer('project_id')
                .unsigned()
                .notNullable()
                .references(project.id)
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
          })
          .createTable('resources', tbl => {
              tbl.increments();
              tbl.string('name', 255).notNullable();
              tbl.text('description');
          })
          .createTable('project_resources', tbl => {
              tbl.integer('project_id')
                  .unsigned()
                  .notNullable()
                  .references('id')
                  .inTable('projects')
                  .onDelete('CASCADE')
                  .onUpdate('CASCADE');

              tbl.integer('resources_id')
                  .unsigned()
                  .notNullable()
                  .onDelete('CASCADE')
                  .onUpdate('CASCADE');
              tbl.foreign('resources_id').references('resources.id');
              tbl.primary(['project_id', 'resources_id']);
          })
  );
};


//----------------------------------------------------------------------------//
// DEFINE ROLLBACK LOGIC
//----------------------------------------------------------------------------//
// When you define the rollback logic, you must roll things back in reverse
// order. This is especially important when there are foreign key constraints.
// If you tried to drop the [species] table before dropping the [animals] table,
// the foreign key constraint behavior could prevent the drop. If the default
// 'RESTRICT' behavior is in place, dropping [species] before [animals] would
// fail. 
exports.down = function (knex) {
  return (
      knex.schema
          .dropTableIfExists('project_resources')
          .dropTableIfExists('resources')
          .dropTableIfExists('tasks')
          .dropTableIfExists('project')
  );
};
