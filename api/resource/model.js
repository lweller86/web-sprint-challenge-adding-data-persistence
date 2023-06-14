const db = require('../../data/dbConfig')

// build your `Resource` model here

async function getAll() {
  const resourceRow = await db('resources')
  return resourceRow
}

async function getResourceById(resource_id) {
  const resourceRow = await db('resources as r')
    .where('resource_id', resource_id)
  return resourceRow
}

async function postResource(resource_name, resource_description) {
  const resourceRow = await db('resources')
    .insert({
      resource_name: resource_name,
      resource_description: resource_description
    })
  const insertedId = resourceRow[0];

  const insertedResource = await db('resources')
    .where('resource_id', insertedId)
    .first();

  return insertedResource;

}

module.exports = {
  getAll,
  getResourceById,
  postResource
}