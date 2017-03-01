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
        // Selecting the first 3 records in Main View:
        maxRecords: 3,
        view: "Main View"
    }).eachPage(function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.

        records.forEach(function(record) {
            var title = $('<h3></h3>').html(record.get('Title'));

            var text = $('<article></article>').html(record.get('Text'));

            var div = $('<div class="entry"></div>') 
            div.append(title); 
            div.append(text); 
           
            $('#blogArea').append(div);
        });

        

        records.forEach(function(record) {
        console.log('Retrieved', record.get('Titulo'));
    });

    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    fetchNextPage();

    }, function done(err) {
        if (err) { console.error(err); return; }
    });
    //var url = "http://sadzee.cloud/blog"
    //$.getJSON(url, function(res){
    //   $.each(res, function(index){
    //       var entry = res[index];
    //       var title = $('<h3></h3>').html(entry.title); 
    //       var text = $('<article></article>').html(entry.text);
           
    //       var div = $('<div class="entry"></div>') 
    //       div.append(title); 
    //       div.append(text); 
           
    //        $('#blogArea').append(div);
           
    //   }) 
    //});
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

        var titlehtml = $('<h3></h3>').html(title);

        var texthtml = $('<article></article>').html(text);

        div.append(titlehtml); 
        div.append(texthtml); 
           
        $('#blogArea').append(div);
    });
    

     
    //window.alert(text);
    
    //var ob = {title: title, text:text}
    //var data = JSON.stringify(ob);
    
    //var url = "http://sadzee.cloud/upload";

           //$.ajax({
           //    type: "POST",
           //    data: data,
           //    url: url,
           //    contentType: "application/json",
           //    dataType: 'json'
           //}).done(function (res) {
           //    var titlehtml = $('<h3></h3>').html(title); 
           //    var texthtml = $('<article></article>').html(text);
           
           //    var div = $('<div class="entry"></div>') 
           //    div.append(titlehtml); 
           //    div.append(texthtml); 
           
           //    $('#blogArea').prepend(div);
           //}).fail(function (err) {
               
           //})
           
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
               var titlehtml = $('<h3></h3>').html(title); 
               var texthtml = $('<article></article>').html(text);
           
               var div = $('<div class="entry"></div>') 
               div.append(titlehtml); 
               div.append(texthtml); 
           
               $('#blogArea').prepend(div);
           }).fail(function (err) {
               
           })
           
     $('#addEntryModal').modal('hide');
}