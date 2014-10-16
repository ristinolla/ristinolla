$(function() {
$('html').removeClass('no-js');

    //code here


  $("body").on('click', '.toggle-navigation', function(e) {
      e.preventDefault();
      $(this).parent().toggleClass('nav-closed');

  });


  //$('.banner').css('min-height', window.innerHeight - 100);
  $('.big-nav').css('min-height', window.innerHeight - 100);


  $("#navigation").on('click', 'a', function(e) {
    var href = $(this).attr('href');

    if(href.indexOf("#") !== 0){
      return;
    }

    e.preventDefault();
    var top = $(href).offset().top + 10;

    $("#navigation").toggleClass('nav-closed');
    $("html, body").animate({scrollTop:top}, '700', function() {
    });

  });


});
