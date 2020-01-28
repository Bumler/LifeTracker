const _ = require( 'lodash' );

function strippedDate( dateTime ){
    if ( !dateTime )
        return "";

    if ( isISOString( dateTime ) )
        return dateTime;

    var parsed = new Date( dateTime );
    return new Date( Date.UTC( parsed.getFullYear(), parsed.getMonth(), parsed.getDate() ) ).toISOString();
}

function isISOString( dateTime ){
    const isoStringRegex = "^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]+Z$";
    
    return _.isString( dateTime ) 
        && dateTime.match( isoStringRegex )
}

module.exports = {
    strippedDate
}