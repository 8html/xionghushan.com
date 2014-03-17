$(function() {
  function makeBottomFooter() {
    var totalTopHeight = 0;
    $('.height-top').each(function(){
      totalTopHeight += $(this).outerHeight();
    });
    var totalBottomHeight = 0;
    $('.height-bottom').each(function(){
      totalBottomHeight += $(this).outerHeight();
    });
    $('#height-padding').height($(window).height() - totalTopHeight -
      totalBottomHeight);
  }
  makeBottomFooter();
  $('.home-slider').sliderkit({
    auto: true,
    circular: true,
    shownavitems: 8,
    panelclick: true,
    panelfx: "sliding",
    panelfxspeed: 1000
  });
  $('#finder').isotope({
    itemSelector: '.item'
  });
  var update_filter = function() {
    var filter;
    filter = '';
    $('#finder-filter .panel').each(function(a, b) {
      var active;
      active = $(b).find('a.active:first');
      filter += active.data('filter');
      $(b).find('span.value').text(active.text());
    });
    $('#finder').isotope({
      filter: filter
    });
  };
  $('#finder-filter a').click(function(e) {
    e.preventDefault();
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
    update_filter();
  });
  $('#bottom-news').sliderkit({
    auto: true,
    circular: true,
    shownavitems: 1,
    panelfx: "sliding",
    panelfxspeed: 400,
    mousewheel: false,
    verticalnav: true,
    verticalslide: true
  });
  makeBottomFooter();
  $('.social-media').magnificPopup({
    type: "image",
    zoom: {
      enabled: true,
      duration: 300,
      opener: function(element) {
        return element;
      }
    }
  });
  if (Modernizr.cssanimations) {
    var elems = $('.spl-nav').find('h3, a');
    elems.addClass('pageLeftBack').css({
      opacity: 0
    }).each(function (a) {
      a = 100 * a + 'ms';
      $(this).css({
        '-webkit-animation-delay': a,
        '-moz-animation-delay': a,
        '-o-animation-delay': a,
        'animation-delay': a
      });
    }), $(function () {
      elems.addClass('play');
    })
  }
  var left = $('.productshow .half-left');
  var right = $('.productshow .half-right');
  left.css({ left: '-30%', opacity: 0 });
  right.css({ right: '-30%', opacity: 0 });
  left.animate({ left: 0, opacity: 1 }, 500);
  right.delay(300).animate({ right: 0, opacity: 1 }, 500);
});
