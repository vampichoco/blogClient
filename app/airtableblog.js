$(document).ready(function(){
    airtableBlog();
});

function airtableBlog(){
    //const base = require('airtable').base('appYpuvzIMsdPb8gH'); 
    var Airtable = require('airtable');

    var base = new Airtable({apiKey: 'keyYg3bQhyi6DluED'}).base('applCTY3TNBzBqIEX');

    base('Diario').select({
        // Selecting the first 3 records in Main View:
        maxRecords: 10,
        view: "Main View"
    }).eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.

        records.forEach(function(record) {
        console.log('Retrieved', record.get('Title'));
        });

    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    fetchNextPage();

    }, function done(err) {
        if (err) { console.error(err); return; }
    });

}