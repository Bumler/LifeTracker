const db = require( './mongo.js' );
const {ObjectId} = require( 'mongodb' );

const collectionNames = {
    "users" : "users",
    "trackedFields" : "trackedFields",
    "entries" : "entries"
};

const henId = new ObjectId( "5e24dc97c693deb08f5f6567" );
const users = [
    {
        "_id" : henId,
        "firstName" : "Henry",
        "lastName" : "Bulmer"
    }
];

const dates = [ "2020-01-17T00:00:00.000Z", "2020-01-18T00:00:00.000Z", "2020-01-19T00:00:00.000Z" ];
const weightId = new ObjectId( "5e24dd5c9dc9de8ab9189a25" );
const sleepId =  new ObjectId( "5e24ddb97c1ea179dbf379da" );
const trackedFields = [ 
    {
        "_id" : weightId,
        "userId" : henId,
        "name" : "Weight"
    },
    {
        "_id" : sleepId,
        "userId" : henId,
        "name" : "Sleep"
    },
]

const entryIds = [ new ObjectId( "5e24df65b15ee3740bc2e98c" ), new ObjectId( "5e24df8c61d03a9d2b7a97d8" ), new ObjectId( "5e24df93d703da003b93bd41" ) ];
const entries = [
    {
        "_id" : entryIds[0],
        "date" : dates[0],
        "userId" : henId,
        "note" : "Sick day :)",
        "values" : [
            {
                "fieldId" : weightId,
                "fieldName" : "Weight",
                "value" : 221.5
            },
            {
                "fieldId" : sleepId,
                "fieldName" : "Sleep",
                "value" : 8
            }
        ]
    },
    {
        "_id" : entryIds[1],
        "date" : dates[1],
        "userId" : henId,
        "note" : "Feeling good!",
        "values" : [
            {
                "fieldId" : weightId,
                "fieldName" : "Weight",
                "value" : 220.5
            },
            {
                "fieldId" : sleepId,
                "fieldName" : "Sleep",
                "value" : 7.5
            }
        ]
    },
    {
        "_id" : entryIds[2],
        "date" : dates[2],
        "userId" : henId,
        "note" : "My soul is a dark abyss with no hope of escape",
        "values" : [
            {
                "fieldId" : weightId,
                "fieldName" : "Weight",
                "value" : 220.8
            },
            {
                "fieldId" : sleepId,
                "fieldName" : "Sleep",
                "value" : 7
            }
        ]
    }
]

async function getCollection( collectionName ){
    return ( await db.getDatabase() ).collection( collectionName );
}

async function seedDB (){
    await Promise.all( [ seedUsers(), seedTrackedFields(), seedEntries() ] );
}

async function seedUsers(){
    var userCollection = await getCollection( collectionNames.users );
    await seedCollection( userCollection, users )
}

async function seedTrackedFields(){
    var trackedFieldsCollection = await getCollection( collectionNames.trackedFields );
    await seedCollection( trackedFieldsCollection, trackedFields );
}

async function seedEntries(){
    var entriesCollection = await getCollection( collectionNames.entries );
    await seedCollection( entriesCollection, entries );
}

async function seedCollection( collection, seed ){
    var ops = [];

    seed.forEach( function( item ){
        ops.push( collection.insertOne( item ) );
    });

    await Promise.all( ops );
}

module.exports = {
    seedDB
}