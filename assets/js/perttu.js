$(function() {
$('html').removeClass('no-js');
    
    //code here

    console.log( "insert" );

    $('.windowHeight').each(function() { 
      $(this).css('height',window.innerHeight);    
    });
});
