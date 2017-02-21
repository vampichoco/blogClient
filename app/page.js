$(document).ready(function(){
    sadzee();
    hideAll();
});

function sadzee(){
    $('#pack1btn').click(function(){
        $('#pack1modal').modal('show');
    });

    $('#scape-sec1').mouseenter(function(){
        displaySection('#sectext-sec1');
    })

    $('#scape-sec2').mouseenter(function(){
        displaySection('#sectext-sec2');
    })

    $('#scape-sec3').mouseenter(function(){
        displaySection('#sectext-sec3');
    });
} 

function hideAll(){
    $( "div[id|='sectext']" ).hide();
}

function displaySection(section){
     hideAll(); 
     $(section).fadeIn();
}

