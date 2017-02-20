$(document).ready(function(){
    sadzee();
    hideAll();
});

function sadzee(){
    $('#pack1btn').click(function(){
        $('#pack1modal').modal('show');
    });

    $('#scape-sec1').mouseenter(function(){
        hideAll(); 
        $('#sectext-sec1').show();
    })

    $('#scape-sec2').mouseenter(function(){
        hideAll(); 
        $('#sectext-sec2').show();
        
    })
} 

function hideAll(){
    $( "div[id|='sectext']" ).hide();
}