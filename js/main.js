$(function() {
  FastClick.attach(document.body);


  var menu = $('.menu');
  var menuDropdown = $('.menu-dropdown')
  if (menu.length === 1 && menuDropdown.length === 1) {
    menu.find('.menu-item').hover(function() {
      menu.find('a.active').removeClass('active').addClass('activeitem');
      var index = $(this).index('.menu-item') + 1;
      menuDropdown.find('.mdown').addClass('hidden');
      var child = menuDropdown.find('.mdown-'+index);
      child.removeClass('hidden');
      $(this).parent().parent()[(child.length>0?'add':'remove')+'Class']('hassubmenu');
      var width = 0, left = 0, max = child.width();
      child.find('a').each(function(a, b) {
        width += $(b).width();
      });
      var menuitemleft = Math.floor($(this).position().left + ($(this).width() - width) / 2);
      if (menuitemleft < 0) {
        menuitemleft = 0;
      } else if (menuitemleft + width > max) {
        menuitemleft = max - width;
      }
      child.find('a:first').css({'margin-left': menuitemleft});
    }, function() {
      menu.find('a.activeitem').removeClass('activeitem').addClass('active');
      menuDropdown.find('.mdown').addClass('hidden');
      $(this).parent().parent().removeClass('hassubmenu');
    });
    menuDropdown.find('.mdown').hover(function() {
      var index = +(/mdown-(\d+)/.exec($(this).attr('class'))[1]);
      menu.find('a.active').removeClass('active').addClass('activeitem');
      menu.find('a').eq(index - 1).addClass('hover');
      $(this).removeClass('hidden');
      $(this).parent().prev().addClass('hassubmenu');
    }, function() {
      menu.find('a.activeitem').removeClass('activeitem').addClass('active');
      menu.find('a').removeClass('hover');
      menuDropdown.find('.mdown').addClass('hidden');
      $(this).parent().prev().removeClass('hassubmenu');
    });
  }


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
  var right = $('.productshow .aimg');
  left.css({ left: '-30%', opacity: 0 });
  right.css({ right: '-30%', opacity: 0 });
  left.animate({ left: 0, opacity: 1 }, 500);
  right.delay(300).animate({ right: 0, opacity: 1 }, 500);

  function loop(cur) {
    var pa = $('.pas .pa').eq(cur);
    if (pa.length === 0) {
      if ($('.pas .pa').length > 0) {
        loop(0);
      }
      return;
    }
    $('.pas .pa').addClass('hidden');
    pa.removeClass('hidden');
    var left = pa.find('.pa-left');
    var right = pa.find('.pa-right img');
    rightheight = pa.find('.pa-right .pa-content').height();

    left.css({ left: '-30%', opacity: 0 });
    left.animate({ left: 0, opacity: 1 }, 500);
    var topdiff = 0;
    var wwidth = $(window).width();
    right.each(function(a, b) {
      var left = $(b).position().left, top = $(b).position().top;
      left = $(b).parent().width() / 2 - $(b).width() / 2;
      var off = 10;
      top = ($(b).parent().height() - right.length * off)  / right.length + ($(b).height() + off) * a;
      if (a === 0 && wwidth <= 480) {
        topdiff = top;
      }
      top -= topdiff;
      var datatop = $(b).data('top');
      if (datatop) top = datatop[wwidth] || top;
      var obj = datatop || {};
      obj[wwidth] = top;
      $(b).data('top', obj);
      $(b).css({ left: left + 100, top: top, position: 'absolute', opacity: 0 });
      $(b).delay((a+1)*200).animate({ left: left, opacity: 1 }, 300);
    });

    pa.find('.pa-right .pa-content').height(rightheight);

    setTimeout(function() {
      loop(cur+1);
    }, 5000);
  }

  loop(0);

});
