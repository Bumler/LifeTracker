function strippedDate( dateTime ){
    if ( !dateTime )
        return "";

    var parsed = new Date( dateTime );
    return new Date( Date.UTC( parsed.getFullYear(), parsed.getMonth(), parsed.getDate() ) ).toISOString();
}

module.exports = {
    strippedDate
}