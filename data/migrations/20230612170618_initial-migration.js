/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await knex.schema
        .createTable('project', table => {
            table.increments('project_id')
            table.string('project_name', 200).notNullable().unique()
        })
        .createTable('resources', table => {
            table.increments('resources_id')
            table.string('resources_name', 200).notNullable().unique()
        })
        .createTable('task', table => {
            table.increments('task_id')
            table.string('task_name', 200).notNullable().unique()
        })
        .createTable('project_resources', table => {
            table.increments('project_resources_id')
            table.string('project_resources_name', 200).notNullable().unique()
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
