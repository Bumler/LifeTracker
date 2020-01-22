const db = require('../mongo.js');
const {ObjectId} = require('mongodb');
var _ = require('lodash');
var {strippedDate} = require('../../util/strippedDate');

const collectionName = 'trackedFields';

async function getCollection(){
    return ( await db.getDatabase() ).collection( collectionName );
}

async function saveField( field ) {
    return !field._id 
        ? saveNew( field )
        : saveExisting( field );
}

async function saveNew( field ){
    const collection = ( await getCollection() );
    field.entries = [];
    const {insertedId} = await collection.insertOne( field );
    return insertedId;
}

async function saveExisting( field ){
    var collection = await getCollection();
    field._id = new ObjectId( field._id );

    await collection.updateOne(
        { _id : field._id }, 
        { $set : { ...field } } );

    return field._id;
}

async function saveEntries( body ){
    const collection = await getCollection();
    var { entries, date } = body;
    
    const entryDate = strippedDate( date ).toISOString();

    //if fields is not an array error
    fieldsToUpdate = await getFields( { fieldIds : _.map( entries, ( f ) => f.fieldId ) } );

    var writePromises = []; 
    ( fieldsToUpdate || [] ).forEach( field => {
        const entryToSave = entries.find( ( entry ) => entry.fieldId === ( field._id.toString() ) );
        var entryToEdit = field.entries.find( ( entry ) => entry.date === ( entryDate ) );

        if ( entryToEdit )
            entryToEdit.value = entryToSave.value;
        else
            field.entries.push( 
                { "_id" : new ObjectId(), 
                "date" : entryDate, 
                "value" : entryToSave.value } );
        
        writePromises.push( collection.replaceOne( { _id : field._id }, field ) );
    });

    await Promise.all( writePromises );
    return fieldsToUpdate;
}

//todo if userId and fieldId are null error
async function getFields( params ){
    const collection = await getCollection();
    const {fieldId } = params;
    const fieldIds = _.isArray( params.fieldIds )
        ? _.map( params.fieldIds, ( id ) => new ObjectId( id ) )
        : null;

    //todo always bail if userId is null
    var findQuery = {};

    if ( fieldId ){
        findQuery._id = new ObjectId( fieldId );
    }
    else if ( fieldIds ){
        findQuery._id = { $in : fieldIds };
    }

    return await collection.find( findQuery ).toArray();
}

module.exports = {
    saveField,
    getFields,
    saveEntries
}