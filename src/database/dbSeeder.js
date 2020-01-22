const db = require( './mongo.js' );
const {ObjectId} = require( 'mongodb' );

const collectionNames = {
    "users" : "users",
    "trackedFields" : "trackedFields"
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
const weightEntryIds = [ new ObjectId( "5e24df65b15ee3740bc2e98c" ), new ObjectId( "5e24df8c61d03a9d2b7a97d8" ), new ObjectId( "5e24df93d703da003b93bd41" ) ];
const sleepId =  new ObjectId( "5e24ddb97c1ea179dbf379da" );
const sleepEntryIds = [ new ObjectId( "5e24dff0a8040302d24f464c" ), new ObjectId( "5e24dfebd2970d195b6e3d55" ), new ObjectId( "5e24dfe74fc31a6975686d54" ) ];
const trackedFields = [ 
    {
        "_id" : weightId,
        "userId" : henId,
        "name" : "Weight",
        "entries" : [
            { "_id" : weightEntryIds[0], "date" : dates[0], "value" : 221.5 },
            { "_id" : weightEntryIds[1], "date" : dates[1], "value" : 220.5 },
            { "_id" : weightEntryIds[2], "date" : dates[2], "value" : 220.8 }
        ]
    },
    {
        "_id" : sleepId,
        "userId" : henId,
        "name" : "Sleep",
        "entries" : [
            { "_id" : sleepEntryIds[0], "date" : dates[0], "value" : 8 },
            { "_id" : sleepEntryIds[1], "date" : dates[1], "value" : 7.5 },
            { "_id" : sleepEntryIds[2], "date" : dates[2], "value" : 6.5 }
        ]
    },
]

async function getCollection( collectionName ){
    return ( await db.getDatabase() ).collection( collectionName );
}

async function seedDB (){
    var seedUserPromise = seedUsers();
    var seedTrackedFieldsPromise = seedTrackedFields();
    await Promise.all( [ seedUserPromise, seedTrackedFieldsPromise ] );
}

async function seedUsers(){
    var userCollection = await getCollection( collectionNames.users );
    await seedCollection( userCollection, users )
}

async function seedTrackedFields(){
    var trackedFieldsCollection = await getCollection( collectionNames.trackedFields );
    await seedCollection( trackedFieldsCollection, trackedFields );
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