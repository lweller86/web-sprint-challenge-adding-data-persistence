/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await knex.schema
        .createTable('project', table => {
            table.increments('project_id')
            table.string('project_name', 200).notNullable().unique()
            table.string('project_description', 200)
            table.integer('project_completed').defaultTo(0)
        })
        .createTable('resources', table => {
            table.increments('resources_id')
            table.string('resources_name', 200).notNullable().unique()
            table.string('resources_description', 200)
        })
        .createTable('task', table => {
            table.increments('task_id')
            table.string('task_description', 200).notNullable()
            table.string('task_notes', 200)
            table.integer('task_completed').defaultTo(0)
            table.integer('project_id')
                .unsigned()
                .notNullable()
                .references('project_id')
                .inTable('project')
                .onDelete('RESTRICT')
                .onUpdate('RESTRICT')

        })
        .createTable('project_resources', table => {
            table.increments('project_resources_id')
            table.integer('project_id')
                .unsigned()
                .notNullable()
                .references('project_id')
                .inTable('project')
                .onDelete('RESTRICT')
                .onUpdate('RESTRICT')
            table.integer('resource_id')
                .unsigned()
                .notNullable()
                .references('resource_id')
                .inTable('resource')
                .onDelete('RESTRICT')
                .onUpdate('RESTRICT')


        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    await knex.schema
        .dropTableIfExists('project_resources')
        .dropTableIfExists('task')
        .dropTableIfExists('resources')
        .dropTableIfExists('project')
};
