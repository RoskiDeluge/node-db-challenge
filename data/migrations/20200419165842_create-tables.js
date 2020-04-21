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
                .references('id')
                .inTable('project')
                .onDelete('RESTRICT')
                .onUpdate('CASCADE');
          })
          .createTable('resources', tbl => {
              tbl.increments();
              tbl.string('name', 255).unique().notNullable();
              tbl.text('description');
          })
          .createTable('project_resources', tbl => {
              tbl.integer('project_id')
                  .unsigned()
                  .notNullable()
                  .references('id')
                  .inTable('project')
                  .onDelete('RESTRICT')
                  .onUpdate('CASCADE');

              tbl.integer('resources_id')
                  .unsigned()
                  .notNullable()
                  .references('id')
                  .inTable('resources')
                  .onDelete('RESTRICT')
                  .onUpdate('CASCADE');
              tbl.primary(['project_id', 'resources_id']);
          })
  );
};

exports.down = function (knex) {
  return (
      knex.schema
          .dropTableIfExists('project_resources')
          .dropTableIfExists('resources')
          .dropTableIfExists('tasks')
          .dropTableIfExists('project')
  );
};
