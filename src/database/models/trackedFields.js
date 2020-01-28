// {
//     _id : zzz,
//     userId : zzz,
//     name : nnn,
//     valueType : vvv,
//     ...other meta like related fields, available values etc. (there may be an argument for a sep avail values table)
// }

const { ObjectId } = require('mongodb');
const _ = require('lodash');
const db = require('../mongo.js');

const collectionName = 'trackedFields';

async function getCollection() {
  return (await db.getDatabase()).collection(collectionName);
}

async function saveNew(field) {
    const collection = (await getCollection());
    field.entries = [];
    const { insertedId } = await collection.insertOne(field);
    return insertedId;
  }
  
  async function saveExisting(field) {
    const collection = await getCollection();
    field._id = new ObjectId(field._id);
  
    await collection.updateOne(
      { _id: field._id },
      { $set: { ...field } },
    );
  
    return field._id;
  }

async function saveField(field) {
  return !field._id
    ? saveNew(field)
    : saveExisting(field);
}

// todo if userId and fieldId are null error
async function getFields(params) {
  const collection = await getCollection();
  const { fieldId } = params;
  const fieldIds = _.isArray(params.fieldIds)
    ? _.map(params.fieldIds, (id) => new ObjectId(id))
    : null;

  // todo always bail if userId is null
  const findQuery = {};

  if (fieldId) {
    findQuery._id = new ObjectId(fieldId);
  } else if (fieldIds) {
    findQuery._id = { $in: fieldIds };
  }

  return collection.find(findQuery).toArray();
}

module.exports = {
  saveField,
  getFields,
};
