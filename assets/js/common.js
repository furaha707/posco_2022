'use strict';

/* 모달팝업 */
var startPop = function() {
  var winW = $(window).width();
  if (winW > 1024) {
    $('.start_pop').draggable({
      handle: '.modal-header',
      containment: 'html'
    });
  }
}

/* loading image */
$(window).on('load', function(){
  $('.loading-image').fadeOut(300);
}); 


/* GNB */
var gnbMenu = {
  init: function(){
    this.menu_open();
    this.menu_hover();
  },
  menu_open: function(){
    $('.header .nav .depth--menu').on('mouseover focus', function(){
      $(this).addClass('active');
      $('.nav__bg').fadeIn(300);
    });
    $('.header, .nav__bg').on('mouseleave', function(){
      $('.header .nav .depth--menu').removeClass('active');
      $('.nav__bg').fadeOut(300);
    });
  },
  menu_hover: function(){
    $('.classify-box__sort .sort-item').on('mouseover focus', function(){
      $('.classify-box__sort .sort-item').removeClass('active');
      $(this).addClass('active');
    });
    $('.classify-box__sort .sort-item').on('mouseleave', function(){
      $(this).removeClass('active');
    });
  }
}

/* 모바일 네비게이션 */
var navMobile = {
  init: function () {
    this.nav_mobile_btn(); // 모바일네비 토글
    this.nav_mobile_active(); //활성화된 메뉴 열어두기
    this.nav_mobile_down(); //하위메뉴가 있는 항목 찾아서 addClass
    this.nav_mobile_action(); // 아코디언 메뉴
  },
  nav_mobile_btn: function () {
    var $navBtn = $('.nav-mobile__btn'),
      $navBg = $('.nav-mobile__bg'),
      $nav = $('.nav-mobile'),
      $closeBtn = $('#aside-close__btn');
    var toggleNav = function () {
      $navBg.fadeToggle(200,"linear");
      $nav.toggleClass('active');
    };
    $closeBtn.on('click',function(){
      $nav.removeClass('active');
      $navBg.fadeOut(200,"linear");
    });
    $navBtn.on('click', function () {
      toggleNav();
    });
    $navBg.on('click', function () {
      toggleNav();
    });

  },
  nav_mobile_active: function () {
    //활성화된 메뉴 열어두기(1depth)
    // $('.nav-mobile .depth-1 > .link.on').next('.nav-list--depth2').show();
    // $('.nav-mobile .depth-1 > .link.on').addClass('active');
    $('.nav-mobile .depth-1 > .link.on,.nav-mobile .depth-2 > .link.on').addClass('active').next().show();
  },
  nav_mobile_down: function () {
    // 하위메뉴가있는 메뉴에 드롭다운 표시를 위한 클래스 붙이기
    $('.nav-mobile .depth-1, .nav-mobile .depth-2').each(function () {
      if ($(this).children('').next().length > 0) {
        $(this).addClass('_down');
      } else {
        $(this).removeClass('_down');
      }
    });
  },
  nav_mobile_action: function () {
    var $depth1 = $('.nav-mobile .depth-1'),
      $depth2 = $('.nav-mobile .depth-2'),
      $depth2_list = $('.nav-mobile .nav-list--depth2'),
      // $depth3 = $('.nav-mobile .depth-3'),
      $depth3_list = $('.nav-mobile .nav-list--depth3');

    $depth1.children('.link').click(function () {
      if ($(this).next().length > 0) {
        if ($(this).next().css('display') === 'none') {
          $depth2.find('.link').removeClass('active');
          $depth1.children('.link').removeClass('active');
          $(this).addClass('active');
          $depth3_list.hide();
          $depth2.find('.link').removeClass('active');
          $depth2_list.slideUp(300);
          $(this).next().stop(false, true).slideDown(300);
        } else {
          $depth2.find('.link').removeClass('active');
          $(this).next().slideUp(200);
          $depth1.children('.link').removeClass('active');
        }
        return false;
      } else {
      }
    });

    $depth2.children('.link').click(function () {
      if ($(this).next().length > 0) {
        if ($(this).next().css('display') === 'none') {
          $depth3_list.find('.link').removeClass('active');
          $depth3_list.stop(false, true).slideUp(300);
          $(this).addClass('active');
          $(this).next().stop(false, true).slideDown(300);
        } else {
          $depth3_list.find('.link').removeClass('active');
          $(this).removeClass('active');
          $(this).next().stop(false, true).slideUp(300);
        }
        return false;
      } else {
      }
    });
  },
};

/* 서브 네비게이션 */
var subNav = {
  init: function () {
    this.depth_clone();
    this.drop_down();
  },
  depth_clone: function () {
    var $depth1Active = $('.nav').find('.depth-1 > .link'); // 1dp 가져오기
    var $depth2Active = $('.nav').find('.depth-1 > .link.on').next().find('.depth-2 > .link'); //활성화된 2depth
    var $depth3Active = $('.nav').find('.depth-2 > .link.on').next().find('.depth-3 > .link'); //활성화된 3depth

    // console.log(depth2Active);
    var $depth1List = $('.sub-nav-clone--depth1'); //depth1Active를 복사해 넣을 컨테이너
    var $depth2List = $('.sub-nav-clone--depth2'); //depth2Active를 복사해 넣을 컨테이너
    var $depth3List = $('.sub-nav-clone--depth3'); //depth3Active를 복사해 넣을 컨테이너

    //1뎁스 클론
    var $depth1Clone = $depth1Active.clone();
    //1뎁스 클론에 루프 하여 li생성후 넣기
    $.each($depth1Clone, function (index, ele) {
      var $li = $('<li class="item"></li>');
      var li = $li.appendTo($depth1List);
      $(ele).appendTo(li);
    });

    //2뎁스 클론
    var $depth2Clone = $depth2Active.clone();
    //2뎁스 내용 넣기
    $.each($depth2Clone, function (index, ele) {
      var $li = $('<li class="item"></li>');
      var li = $li.appendTo($depth2List);
      $(ele).appendTo(li);
    });

    //3뎁스 클론
    var $depth3Clone = $depth3Active.clone();
    //3뎁스 내용 넣기
    $.each($depth3Clone, function (index, ele) {
      var $li = $('<li class="item"></li>');
      var li = $li.appendTo($depth3List);
      $(ele).appendTo(li);
    });
  },

  drop_down: function () {
    var $dropDown = $('.sub-nav--dropdown .sub-nav__item'),
      $dropDownBtn = $('.sub-nav__button'),
      $dropDownList = $('.sub-nav__drawer');

    $dropDown.each(function () {
      $(this)
        .find($dropDownBtn)
        .click(function () {
          if ($(this).hasClass('on') == true) {
            $(this).removeClass('on');
            $(this).next().stop(false, true).slideUp(200);
          } else {
            $dropDownList.stop(false, true).hide();
            $dropDownBtn.removeClass('on');
            $(this).next().stop(false, true).slideDown(100);
            $(this).addClass('on');
          }
          return false;
        });
    });
  },
};

/* 서브네비게이션 스크롤 형태 */
var subNavScroll = {
  init: function () {
    this.sticky_nav();
  },

  sticky_nav: function () {
    var $subNav = $('.sub-nav--sticky'),
      $subNavWrap = $('.sub-nav--sticky .sub-nav__wrap');
    if ($subNav.length > 0) {
      var subNavOffset = $subNav.offset(),
        // subNavTop = subNavOffset.top;
        subNavTop = subNavOffset.top - $('.header').outerHeight(); // #헤더 고정형일때

      if ($(window).outerWidth() > 1024) {
        if ($(window).scrollTop() > subNavTop) {
          $subNav.addClass('fix');
          $subNavWrap.css('top', $('.header').outerHeight()); //#헤더 고정형일때
        } else {
          $subNav.removeClass('fix');
          $subNavWrap.css('top', 0); //#헤더 고정형일때
        }
      } else {
        if ($(window).scrollTop() > subNavTop) {
          $subNav.addClass('fix');
        } else {
          $subNav.removeClass('fix');
        }
      }
    }
  },
};

/* 스크롤 이동 */
$(".location-button").on('click', function () {
  var target = $(this).attr('data-target');
  var scrollPosition = $(target).offset().top  - $('.header-gnb__fix').outerHeight();  

  $("html, body").stop().animate({
    scrollTop: scrollPosition
  }, 500);
});

/* Magnific 팝업 */
var magnificPop = {
  init: function () {
    this.ajax(); //ajax 팝업
  },
  ajax: function () {
    $('.popup-link').magnificPopup({
      type: 'ajax',
      closeOnBgClick: false,
      mainClass: 'mfp-fade',
      callbacks: {
        ajaxContentAdded: function () {
          var $content = $(this.content[0]);
          var $pop = $content.find('.popup-in-popup');
          var aURL = '';

          if ($pop.length > 0) {
            aURL = $pop.attr('href');

            $pop.on('click', function (e) {
              e.preventDefault();

              $.ajax({
                url: aURL,
                dataType: 'html',
                success: function (data) {
                  var item = '<div class="pop-in-pop">';
                  item += data;
                  item += '</div>';

                  /* HTML append */
                  $content.append(item);

                  /* 닫기 버튼 append */
                  $('.pop-in-pop').children().append('<div class="pop-in-close"><i class="xi-close"></i></div>');

                  /* 닫기 버튼 */
                  $('.pop-in-close').on('click', function(){
                    $('.pop-in-pop').remove();
                  });
                }
              });
            });
          }
        }
      }
    }, 500);
  },
};

function closePopup() {
  $.magnificPopup.close();
}

$('.gallery-pop').magnificPopup({
  type: 'image',
  closeOnContentClick: true,
  closeBtnInside: false,
  gallery:{
    enabled:true
  }
});

function gnbFix(){
  var winS = $(window).scrollTop(),
      $header = $('.header');

  if ($header.hasClass('header--company')) {
    var gnbT2 = $('.header .header-gnb__wrap').offset().top;

    if (winS >= gnbT2) {
      $header.addClass('fix');
    } else {
      $header.removeClass('fix');
    }
  } else {
    var gnbT1 = $('.header .header-btm-wrap').offset().top;

    if (winS >= gnbT1) {
      $header.addClass('fix');
    } else {
      $header.removeClass('fix');
    }
  }
  
}

$(window).on('scroll', function () {
  subNavScroll.init();
  gnbFix();
});

$(window).on('resize', function () {
  subNavScroll.init();
});

$(document).on('mouseover', function () {
  magnificPop.init();
});

$(document).ready(function () {
  /* Navigation Active */
  $('.nav, .nav-mobile').not('.nav--company').navActive({
    depth1: '.depth-1',
    depth2: '.depth-2',
    depth3: '.depth-3',
    activeClass: 'on',
    callback: function () {
      // console.log('callback function');
    },
  });

  $('.nav--company').navActive({
    depth2: '.depth-1',
    activeClass: 'on',
    callback: function () {
      // console.log('callback function');
    },
  });


  /* HEADER GNB Drop */
  $('.header').navDrop({
    type: 'each', // 기본값 udnefiend, 선언하지 않거나 없는 값을 선언할 경우 콘솔창에 경고문구 출력
    background: false, // 기본값 true, 배경 엘리먼트가 없을 경우 콘솔창에 경고문구 출력
    backgroundClass: '.nav__bg', // 기본값 .nav__bg
    backgroundAutoColor: false, // 기본값 false, depth2의 배경색을 자동으로 적용
    effect: 'fade', // 기본값 fade, 옵션값은 fade, slide
    delay: 800, // 출력시 delay
    callback: function () {}, // 콜백 함수
  });

  
  $(window).scrollTrack({
    threshold: 0, 
    activeClass: 'active',
  });
 

  //gnbdrop.init();
  gnbFix();
  gnbMenu.init();
  navMobile.init();
  subNav.init();
  subNavScroll.init();
  startPop();

  var wowJS = new WOW().init(); 

  /*
    File Upload
    이벤트 버블링 방지를 위해 on('change') 형태로 변경함.
  */
  $('.file-box').find('input[type=file]').on('change', function(){
    var tmp = $(this).val().replace(/^.*\\/, "");
    $(this).parents('.file-box').find('.file-box__text').text(tmp);
    $(this).parents('.file-box').find('.file-box__text').addClass('on');
  });
  
  /*
  * 구버전 file upload
  * */
  $('.file_box input[type="file"]').on('change', function(){
    var tmp = $(this).val().replace(/^.*\\/, "");
    $(this).siblings("p").text(tmp);
  });

  /* Bullet List */
  $('.bullet-list').each(function () {
    if ($(this).hasClass('bullet-list--decimal')) {
      $(this).children('.item').each(function (index) {
        $(this).prepend('<span class="decimal-number">' + (index + 1) + '</span>');
      });
    }

    $(this).addClass('bullet-type--js');
  });
  
  /*
  min-width지정 rowscroll
  */
  $('.row-scrollwrap').each(function () {
    var $rowScrollTxtWidth = $(this).data('show'),
      $rowScrollTxt = $(this).find('.row-scrollwrap__txt');
    $(this).find('.row-scrollwrap__content').css('min-width', $rowScrollTxtWidth);
    // 가로스크롤 영역 min-width지정
    var $gutter = 40; // $container-gutter-width (_var.scss)
    if ($(window).width() < $rowScrollTxtWidth + $gutter) { 
      $rowScrollTxt.show();
      // 지정된 rowScrollTxtWidth + (gutter) 해상도에서 안내문구 노출
    }
  });

  /* scrollbar js */
  $('.scrollbar-inner').scrollbar();
  // $('.scrollbar-outer').scrollbar();
  // $('.scrollbar-light').scrollbar();

  /* Resizing Check */
  var resizing = resizingCheck({
    breakpoints: {
      414: function () {
        // console.log('414 < width < 768');
      },
      768: function () {
        // console.log('768 < width < 1024');
      },
      1024: function () {
        // console.log('1024 < width < 1200');
      },
      1200: function () {
        // console.log('1200 < width');
      },
    },
  });
});


/* 헤더 최상단 광고배너 */
$('.topbanner-close').on('click', function(){
  $('.topbanner-wrap').hide();
});

$('.header-ad-wrap').hide();

$('.mobile-more').on('click', function(){
  $('.header-ad-wrap').slideToggle('fast');
  $(this).toggleClass('active');
});

//검색영역
// $(document).ready(function () {
// // $(window).resize(function(e){ 
//   if (window.innerWidth < 1024) { 
//     $('.search__btn').on('click', function(){
//       $('.search__txt').toggleClass('open');
//       $('.search-open').toggleClass('open');
//     }); 
//   } else {     
//     $('.search-open').hover(function(){
//       $('.search-open').toggleClass('open');
//     });
//   } 
// // }).resize();'
// });

$('.search-form').on('click', function(){
  $('.search-open').show();
}); 

// $('.search__btn').on('click', function(){
//   if ($(window).outerWidth() <= 1024) {
//     $('.search-open').toggle();
//   }
// }); 

$('body').on('click', function(e){
  var $tgPoint = $(e.target);
  var $popCallBtn = $tgPoint.hasClass('search__txt');
  var $popArea = $tgPoint.hasClass('search-open');

  if ($(window).outerWidth() > 1024) {
    if ( !$popCallBtn && !$popArea ) {
      $('.search-open').hide();
  }
  }
});

// $('body').on('click', function(e){
//   var $tgPoint = $(e.target);
//   var $popmBtn = $tgPoint.hasClass('search__btn');

//   if ($(window).outerWidth() <= 1024) {
//     if ( !$popmBtn ) {
//       $('.search-open').hide();
//   }
//   }
// });

$(window).resize(function(e){ 
  if (window.innerWidth < 1024) { 
    $('.search__btn').on('click', function(){
      $('.search__txt').toggleClass('open');
      $('.search-open').toggleClass('open');
    }); 
    // $('object').on('touchmove', function(e){
    //   var $tgPoint = $(e.target);
    //   var $popmBtn = $tgPoint.hasClass('search__btn');
    //   if ($(window).outerWidth() <= 1024) {
    //     if ( !$popmBtn ) {
    //       $('.search-open').hide();
    //   }
    //   }
    // });
  } 
}).resize();





var lnbItem = $('.menu-body__list');

lnbItem.on('mouseover focus', function () {
  lnbItem.removeClass('hover');
  $(this).addClass('hover');
});

lnbItem.on('mouseleave', function () {
  $(this).removeClass('hover');
});


// function subNavScroll_front() {
//   var $subNav = $('.nav');
//   var subNavLinkLeft = $('.nav .link.on').offset().left;
//   var subNavWidth = $('.nav');
//   var totalWidth = 0;

//   for (var i = 0; i < subNavWidth.length; i++) {
//     totalWidth += subNavWidth[i].offsetWidth;
//   }

//   $subNav.animate({ scrollLeft: subNavLinkLeft - 100 }, 1);
// }


// $(document).ready(function () {
//   if ($('.nav').length > 0) {
//     if ($(window).innerWidth() < 1201) {
//       subNavScroll_front();
//     }
//   }
// });
// $(window).resize(function () {
//   if ($('.nav').length > 0) {
//     if ($(window).innerWidth() < 1201) {
//       subNavScroll_front();
//     }
//   }
// });