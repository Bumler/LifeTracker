const collectionName = 'users';
const db = require( '../mongo.js' );

//we could see about connecting this funcitonality with tracked fields
async function getCollection(){
    return ( await db.getDatabase() ).collection( collectionName );
}

//todo this obviously subject to change once we get some user auth going.
async function getUser( firstName ){
    var collection = await getCollection();
    return await collection.findOne( 
        { 'firstName' : firstName } );
}

module.exports = {
    getUser
}