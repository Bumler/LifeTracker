// {
//     id : zzz,
//     userId : zzz,
//     date : xxx,
//     notes : nnn,
//     otherMeta : ...,
//     values [
//         {
//             fieldId : zzz,
//             fieldName : nnn,
//             value : vvv
//         }...
//     ]
// }

const {strippedDate} = require("../../util/strippedDate");
const {ObjectId} = require( "mongodb" );
const db = require( "../mongo" );

const collectionName = "entries";

async function getCollection(){
    return ( await db.getDatabase() ).collection( collectionName );
}

async function getEntry ( params ){
    const collection = await getCollection();
    const {id, date} = params;
    const dateString = strippedDate( date );

    if (! ( id || date ) )
        return null;

    let dayQuery = id 
        ? { "_id" : new ObjectId( id ) }
        : { "date": dateString };

    return await collection.findOne( dayQuery );
}

async function getEntries ( params ){
    const collection = await getCollection();
    return await collection.find({}).toArray();
}

async function saveEntry( body ){
    const entries = await getCollection(); 
    body.date = strippedDate( body.date );

    let existingEntry = await getEntry( { "date" : body.date } );
    if ( existingEntry ){
        body._id = existingEntry;
        await entries.replaceOne( { "_id" : body._id }, body );
    }
    else{
        let insertResult = await entries.insertOne( body );
        body._id = insertResult.insertedId.toString();
    }

    return body;
}

module.exports = {
    getEntry,
    getEntries,
    saveEntry
}