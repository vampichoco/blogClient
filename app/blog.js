$(document).ready(function(){
    onLoad();
});

function onLoad(){
    loadBlog();
    $('#showform-create').click(function(){
        $('#addEntryModal').modal('show');
    }) 
    
    $('#sendEntryButton').click(sendEntry);
    $('#createContentButton').click(createContent);

}

function loadBlog(){
    var Airtable = require('airtable');
    

    var base = new Airtable({apiKey: 'keyYg3bQhyi6DluED'}).base('applCTY3TNBzBqIEX');

    base('Entries').select({
        maxRecords: 20,
        view: "Main View", 
        sort: [{field: "dateTime", direction: "desc"}]
    }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
            var title = $('<h1></h1>').html(record.get('Title'));

            var text = $('<article></article>').html(record.get('Text'));

            var div = $('<div class="entry"></div>') 
            div.append(title); 
            div.append(text); 
           
            $('#blogArea').append(div);
        });

        
        records.forEach(function(record) {
        console.log('Retrieved', record.get('Titulo'));
    });

    fetchNextPage();

    }, function done(err) {
        if (err) { console.error(err); return; }
    });
    
}

function sendEntry(){
    tinyMCE.triggerSave();
    
    var title = $('#titletb').val(); 
    var text = $('#textta').val(); 

    var Airtable = require('airtable');
    var base = new Airtable({apiKey: 'keyYg3bQhyi6DluED'}).base('applCTY3TNBzBqIEX');

    base('Entries').create({
        "Title": title,
        "Text": text,
        "dateTime": new Date(),
        "tags": ["Personal"]
    }, function(err, record) {
        if (err) {
            console.error(err);
            return;
        }

        var div = $('<div class="entry"></div>') 

        var titlehtml = $('<h1></h1>').html(title);

        var texthtml = $('<article></article>').html(text);

        div.append(titlehtml); 
        div.append(texthtml); 
           
        $('#blogArea').append(div);
    });
    
     $('#addEntryModal').modal('hide');
}


function createContent(){
    tinyMCE.triggerSave();
    
    var title = $('#titletb').val(); 
    var text = $('#textta').val(); 
    
    window.alert(text);
    
    var ob = {name: title, content:text}
    var data = JSON.stringify(ob);
    
    var url = "http://sadzee.cloud/createcontent";

           $.ajax({
               type: "POST",
               data: data,
               url: url,
               contentType: "application/json",
               dataType: 'json'
           }).done(function (res) {
               var titlehtml = $('<h1></h1>').html(title); 
               var texthtml = $('<article></article>').html(text);
           
               var div = $('<div class="entry"></div>') 
               div.append(titlehtml); 
               div.append(texthtml); 
           
               $('#blogArea').prepend(div);
           }).fail(function (err) {
               
           })
           
     $('#addEntryModal').modal('hide');
}