$(document).ready(function(){
    onLoad();
});

function onLoad(){
    loadBlog();
    $('#showform-create').click(function(){
        $('#addEntryModal').modal('show');
    }) 
    
    $('#sendEntryButton').click(sendEntry);
}

function loadBlog(){
    var url = "http://localhost:5000/blog"
    $.getJSON(url, function(res){
       $.each(res, function(index){
           var entry = res[index];
           var title = $('<h3></h3>').html(entry.title); 
           var text = $('<article></article>').html(entry.text);
           
           var div = $('<div class="entry"></div>') 
           div.append(title); 
           div.append(text); 
           
            $('#blogArea').append(div);
           
       }) 
    });
}

function sendEntry(){
    tinyMCE.triggerSave();
    
    var title = $('#titletb').val(); 
    var text = $('#textta').val(); 
    
    window.alert(text);
    
    var ob = {title: title, text:text}
    var data = JSON.stringify(ob);
    
    var url = "http://localhost:5000/upload";

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
 