const app = require( 'express' ).Router();
const trackedFields = require('../database/models/trackedFields.js');

app.get( '/', async( req, res ) => {
    res.send( await( trackedFields.getFields( req.query ) ) );
} );

app.post( '/saveField', async( req, res ) => {
    res.send( await( trackedFields.saveField( req.body ) ) );
} );

module.exports = app;