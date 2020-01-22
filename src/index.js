const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use( bodyParser.json() );
app.use( cors() );

//Routing todo move me to a routing file.
const trackingController = require( './controllers/trackingController.js');
app.use( '/tracking', trackingController );

const userController = require( './controllers/userController.js' );
app.use( '/user', userController );


//todo put this behind some start up thingy
const mongo = require('./database/mongo.js' );
const dbSeeder = require('./database/dbSeeder.js');
mongo.startDatabase().then( async () => {
    await dbSeeder.seedDB();

    app.listen(3001, async () => {
        console.log( 'listening on port 3001' );
    });
} );