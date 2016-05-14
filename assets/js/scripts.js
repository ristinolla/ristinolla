$(function() {
  'use strict';
  $('html').removeClass('no-js');

    //code here


  $("body").on('click', '.toggle-navigation', function(e) {
      e.preventDefault();
      $(this).parent().toggleClass('nav-closed');
  });


  //$('.banner').css('min-height', window.innerHeight - 100);
  $('.big-nav').css('min-height', window.innerHeight - 100);

  var scrollDown = function(e ) {
    var href = $(this).attr('href');

    if(href.indexOf("#") !== 0){
      return;
    }

    e.preventDefault();
    var top = $(href).offset().top + 10;

    $("#navigation").addClass('nav-closed');
    $("html, body").animate({scrollTop:top}, '700', function() {
    });
  };
  $("#navigation").on('click', 'a', scrollDown);

  $("body").on('click', '.smooth-scroll', scrollDown);

  var baseURI = window.location.host;


  $("body").on("click", function(e) {

    // abandon if link already aborted or analytics is not available
    if (e.isDefaultPrevented() || typeof ga !== "function") return;

    // abandon if no active link or link within domain
    var link = $(e.target).closest("a");
    if (link.length !== 1 || baseURI === link[0].host) return;


    e.preventDefault();
    var href = link[0].href;
    ga('send', {
      'hitType': 'event',
      'eventCategory': 'outbound',
      'eventAction': 'link',
      'eventLabel': href,
      'hitCallback': loadPage
    });

    // redirect after one second if recording takes too long
    setTimeout(loadPage, 1000);

    // redirect to outbound page
    function loadPage() {
      document.location = href;
    }

  });
});
