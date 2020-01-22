function strippedDate( dateTime ){
    var parsed = new Date( dateTime );
    return new Date( Date.UTC( parsed.getFullYear(), parsed.getMonth(), parsed.getDate() ) );
}

module.exports = {
    strippedDate
}