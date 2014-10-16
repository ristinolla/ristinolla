$(function() {
$('html').removeClass('no-js');

    //code here


  $("body").on('click', '.toggle-navigation', function(e) {
      e.preventDefault();
      $(this).parent().toggleClass('nav-closed');

  });


  //$('.banner').css('min-height', window.innerHeight - 100);
  $('.big-nav').css('min-height', window.innerHeight - 100);



});
