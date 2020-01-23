const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use( bodyParser.json() );
app.use( cors() );

//Routing todo move me to a routing file.
const trackedFieldsController = require( './controllers/trackedFieldsController.js');
app.use( '/fields', trackedFieldsController );

const userController = require( './controllers/usersController.js' );
app.use( '/user', userController );

const entriesController = require( './controllers/entriesController' );
app.use( '/entries', entriesController );

//todo put this behind some start up thingy
const mongo = require('./database/mongo.js' );
const dbSeeder = require('./database/dbSeeder.js');
mongo.startDatabase().then( async () => {
    await dbSeeder.seedDB();

    app.listen(3001, async () => {
        console.log( 'listening on port 3001' );
    });
} );