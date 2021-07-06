$(function () {
    $('header nav').meanmenu({
        meanMenuContainer: 'header .place-nav',
        meanMenuOpen: "<i class='icon-menu'></i>",
        meanMenuClose: "<i class='icon-plus'></i>",
        meanScreenWidth: 1025,
        meanDisplay: "block"
    });

    // this will get the full URL at the address bar
    var url = window.location.href; 
    // passes on every "a" tag 
    $("#main-nav a").each(function() {
            // checks if its the same on the address bar
        if(url == (this.href)) { 
            $(this).closest("li").addClass("active").attr("aria-current", "Page");
        }
    });

    $("nav a[href^='https']").attr({target:"_blank", rel:"noopener noreferrer" });
    $("a[name]").parent().addClass('has_target');
    $("#page h1, h2#append").appendTo("#page-title");
    $("#page .page-divider").parent("#page").addClass('has_divider');
    $(".internal .more-to-explore").appendTo(".internal");

    $("#main-link").click(function() { $('main').focus(); });
    $("#nav-link").click(function() { $('#main-nav').focus(); });
    $("#bn-play").click(function() { $('#bn-vid').focus(); });
    $("#popup").click(function() { $('.modal-content').focus(); });
    
    ///////////// global variables
    var theWindow = $(window),
        body = $("body"),
        header = $("header"),
        headerBottom = $("header").outerHeight(),
        stickyBottom = $("header #hd-top").outerHeight();

    /////////////// resize options
    $(window).on('resize', function () {
        $("body").css('padding-top', $("header").outerHeight());
        $(".mean-container .mean-nav").css('bottom', $("#fixed-tabs").outerHeight());
        if ($(window).width() <= 1025) {
            $("footer").css('padding-bottom', $("#fixed-tabs").outerHeight());
        }
    }).trigger('resize');

    /////////////// fixed header with animated in on desktop and attach on mobile
    theWindow.on("scroll", function () {
        if (theWindow.width() > 1025) {
            if (theWindow.scrollTop() >= headerBottom) {
                body.addClass("fix-nav");
                header.addClass("animated slideInDown");
            } else if (theWindow.scrollTop() <= headerBottom) {
                body.removeClass("fix-nav");
                header.removeClass("animated slideInDown");
            }
        }

    });


    var url = window.location.href; 
    // passes on every "a" tag 
    $("header nav a").each(function() {
            // checks if its the same on the address bar
        if(url == (this.href)) { 
            $(this).closest("li").addClass("active").attr("aria-current", "Page");
        }
    });
    $('nav ul li').each(function() {
        if ($(this).find('ul').length) {
            ($(this).addClass('has-submenu').attr('aria-haspopup', 'true'))
        }
    });

    if (theWindow.width() > 1025) {
       $('nav > ul > .has-submenu > a').append("<button aria-label='Toggle submenu'><i class='icon-angle-down'></i></button>")
       $('nav ul ul > .has-submenu > a').append("<button aria-label='Toggle submenu'><i class='icon-angle-right'></i></button>")
    }


    if (theWindow.width() <= 1025) {
        var didScroll,lastScrollTop=0,delta=5,navbarHeight=$("header").outerHeight();function hasScrolled(){var l=$(this).scrollTop();Math.abs(lastScrollTop-l)<=delta||(l>lastScrollTop&&l>navbarHeight?$("header").removeClass("nav-down").addClass("nav-up"):l+$(window).height()<$(document).height()&&$("header").removeClass("nav-up").addClass("nav-down"),lastScrollTop=l)}$(window).scroll(function(l){didScroll=!0}),setInterval(function(){didScroll&&(hasScrolled(),didScroll=!1)},250);
    }

    if ($(window).width() <= 1025) {
        $("footer .social").clone().prependTo(".mean-container .mean-nav");
        $("footer .hours").clone().appendTo(".mean-container .mean-nav");
    }

       ///// Calls the leanModal popups
  $("a[rel*=leanModal]").leanModal({
    // top: 100,
    overlay: 1,
    closeButton: ".modal-close"
});

//// Prepends + appends Close button to popups modals - gives keyboard focus easier access to close button.
  $(".modal-content").prepend('<button class="modal-close" aria-label="close popup"><i></i><span>Close Popup</span></button>');
  $(".modal-content").append('<button class="modal-close" aria-label="close popup"><i></i><span>Close Popup</span></button>');


//// Clicking popup moves keyboard focus into modal 
    $("a[rel*=leanModal]").on("click", function(){
        let href = $(this).attr('href');
        let trimmed = href.substring(1);
       // console.log(trimmed)
        document.getElementById(trimmed).focus();
     });

     
     // In Firefox and Safari plays modal popup videos automatically
     $("#openVid").on("click", function() {
        $("#bio-modal .youtube:not('.active')").trigger("click");
      });
  // Closing popup modal turns off video
    $(".modal-close").on("click", function(){
        for (var i = 0; i < $('.modal-content .youtube iframe').length; i++) {
          var video = $('.modal-content .youtube iframe').attr("src");
          var video = video.replace("autoplay=1", "autoplay=0") ;
          $('.modal-content youtube iframe').attr("src","");
          $('.modal-content .youtube iframe').attr("src",video);
        }
    });


    var menuItemsBut = document.querySelectorAll('li.has-submenu');
    Array.prototype.forEach.call(menuItemsBut, function(el, i){
        el.querySelector('button').addEventListener("click",  function(event){
            if (this.parentNode.parentNode.className == "has-submenu") {
                this.parentNode.parentNode.className = "has-submenu open";
                this.setAttribute('aria-expanded', "true");
            } else {
                this.parentNode.parentNode.className = "has-submenu";
                this.setAttribute('aria-expanded', "false");
                this.parentNode.parentNode.className = "has-submenu";
            }
            event.preventDefault();
            return false;
        });
    });

});   // end of top function



// $.fn.wrapInTag = function(opts) {
//     var tag = opts.tag || 'strong',
//         words = opts.words || [],
//         regex = RegExp(words.join('|'), 'gi'),
//         replacement = '<' + tag + '>$&</' + tag + '>';
//     var icon = $(this).find("i, img").remove();
//     var newText = $(this).text().replace(regex, replacement);
//     if ($(this).text() === newText) {
//         $(this).html($(this).text().replace(/^(\w+)/, '<strong>$1</strong>'));
//         if (icon.length > 0) {
//             icon.prependTo($(this));
//         }
//     } else {
//         $(this).html(newText);
//         if (icon.length > 0) {
//             icon.prependTo($(this));
//         }
//     }
// };


$(function () {
    var theWindow = $(window);

////////////////////////////// Wrap words in in a tag
    // $(".why h2").each(function() {
    //     $(this).wrapInTag({
    //         tag: 'span',
    //         words: ['Why Choose']
    //     });
    // });


 $( ".why ul li" ).wrapInner( "<span></span>");

////////////////////////////// Randomized Banner Background
     var selectBG = Math.floor(Math.random() * 10) + 1;
     if (!$("body").hasClass("page_index")) {
         $('#interior-banner').css({
             'background-image': 'url(assets/images/interior-banner-' + selectBG + '.jpg)',
             'background-size': 'cover',
             'background-repeat': 'no-repeat',
             'background-position': 'center center'
         })
     }


    ////////////////////////////// FAQ / Accordion
    $(".accordion > h3, .accordion > h2").each(function () {
        $(this).wrap('<button></button>').parent().addClass('toggle');
    });
    $(".toggle").each(function () {
        $(this).nextUntil('.toggle').add().wrapAll('<div>');
    });
    $(".toggle").on("click", function () {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active").next().slideUp();
        } else {
            $(".toggle").removeClass("active").next().slideUp();
            $(this).addClass("active").next().slideDown();
        }
        for (var i = 0; i < $('.accordion iframe').length; i++) {
            var video = $('.accordion iframe').attr("src");
            var video = video.replace("autoplay=1", "autoplay=0") ;
            $('.accordion iframe').attr("src","");
            $('.accordion iframe').attr("src",video);
          }
    });


    ////////////////////////////// page divider
    var dividerStart = "> h2, .page-divider .wrap",
        mobileWidth = 1025;
    $.when(setupServices()).done(function () {});
       function setupServices() {

        $(".page-divider " + dividerStart)
            .addClass("dividerLead").each(function () { //auto wrap
                $(this)
                    .nextUntil('.dividerLead')
                    .addBack()
                    .wrapAll('<div class="block">');
        });

         $(".block").each(function (index) {
                   $(this)
                       .find('.dividerLead')
                       .next(".elem")
                       .addClass('wow fadeIn')
                       .addClass(index % 2 ? 'elem-left' : 'elem-right')
                    // move .elem above H2
                   if ($(window).width() >= mobileWidth) {
                       $(this).children(".elem").insertBefore($(this).children(".dividerLead"));
                   }
               })


///////////// move anchors to top of blocks
           $(".page-divider .block a[name]:first-of-type").each(function () {
            var getAnchor = $(this).parent(".has_target"),
                anchorTarget = $(this).parentsUntil(".page-divider").next().find(".dividerLead").parent();
            getAnchor.remove();
            $(this).prependTo(anchorTarget);
        });

    }

    $(".block [class^='btn']").parent("p").addClass('has_btn');

/////////  mini-blocks for h3 inside divider blocks
    $(".page-divider h3").each(function() {
        $(this).nextUntil('h3, .dividerLead').addBack().wrapAll('<div>')
        .parent().addClass("mini-block")
    });
    $(".mini-block").each(function (index) {
        $(this)
            .find('h3')
            .next(".elem-sm")
            .addClass(index % 2 ? 'elem-left' : 'elem-right')
        if ($(window).width() >= mobileWidth) {
            $(this).children(".elem-sm").insertBefore($(this).children("h3"));
        }
    })

    ///////////// wraps text & .btn in article after .block .elem
    $(".block .elem + *, .block .wrap, .mini-block h3").each(function () { //auto wrap
        $(this).nextUntil('.block, .mini-block').addBack().wrapAll('<article>');
    });

    /// for flexing inside .blocks
    $(".block .elem").each(function () { //auto wrap
        $(this).nextUntil('.block, .mini-block').addBack().wrapAll('<div>').parent().addClass('contain');
    });

        ////////  If no image insided block to change styles
        $('.block').each(function() {
            if (!$(this).find('.elem').length) {
                ($(this).addClass('no_img'))
            }
        });
        $(".block.no_img .dividerLead").each(function () { //auto wrap
            $(this).nextUntil('.block').addBack().wrapAll('<article>');
        });

    /////////// If needed to change explore section if page divider ends with odds
    //   $(".page-divider .block:nth-of-type(odd):last-child").parent(".page-divider").addClass('has_oddlast');
    //     if ($(".page-divider").hasClass("has_oddlast")) {
    //           $('.more-to-explore').addClass("bkgrd");
    //       }


    //////// Takes an image and makes it background image to fill flexed container
    if (theWindow.width() > 1001) {
        $("#main-img").each(function() {
            var mainBkg = $(this).find("img").attr("src");
                    $(this).css({
                        'background-image': 'url(' + mainBkg + ')',
                        'background-size': 'cover',
                        'background-repeat': 'no-repeat',
                        'background-position': 'top 15% center',
                    })
            });
        }
    
  //////// Takes data-image source and makes it background image to fill flexed container
     ////// ie:  <div class="bkg-img" data-img="assets/images/callout-1.jpg">
       /*
        $(".bkg-img").each(function() {
            var bkgImg = $(this).data("img");
            $(this).css({
                'background-image': 'url(' + bkgImg + ')',
                'background-size': 'cover',
                'background-repeat': 'no-repeat',
                'background-position': 'center center'
            })
        })
      */

    ///// Takes main banner image on page and flexes with page title
    $("#main-img").appendTo("#interior-banner .contain")
    $("#main-img").appendTo("#interior-banner")
    $('#interior-banner').each(function() {
        if ($(this).find('#main-img').length) {
              $("#interior-banner .contain").next('#main-img').addBack().wrapAll('<div>').parent().addClass('flex-title');
        }
    });



    // page title + intro - interior banner
    ////////////  Add flex to .top img/video + text before page-dividers
    $("#page > p:first-of-type").each(function() {
        $(this).nextUntil("div, h1, h2, h3, form").addBack().wrapAll("<article id='intro'>")
    });

   $("#intro").appendTo("#interior-banner .contain")

    //////////  Adding interior banner videos
    // $('#page-title').each(function() {
    //     if ($(this).find('.play').length) {
    //         $(".page-banner").attr("data-player", "youtube")
    //     }
    // });



//////// Banner and testimonial video with different top offsets

    var theWindow = $(window);
    $("#banner[data-player]").tntvideos({
        playButton: '.play',
        closeButton: '.close',
        bodyPlaying: null,
        mobileWidth: 1000,
        animate: true,
        // mobileAppendPlay: '#banner article'
        closeButtonString: '<button class="close" aria-label="close video"><i class="icon-plus"></i> Close Video</button>'
    });

    if (theWindow.width() < 1001) {
        $('#banner .play').appendTo('#banner [data-embed]')
    }

    $("#testimonials[data-player]").tntvideos({
        playButton: '.play',
        closeButton: '.close',
        animate: true,
        mobileWidth: 1000
    });

     //Basic youtube embed with close button/for internal pages
     $(".internal [data-player]").tntvideos({
         closeButton: '.close',
         playButton: '.yt-play',
         animate: false,
         mobileWidth: 1000,
         offset:0,
         closeButtonString: '<span><i class="icon-plus"></i></span>'
     });

   $('.video-grid > div iframe').wrap('<div class="videoWrapper"></div>')


 $(".slick-reviews").slick({      
    // focusOnChange: true,
    // accessibility: true,
    dots:true,   
    arrows:true,  
    appendDots:"#reviews .slick-controls",          
    appendArrows:"#reviews .slick-controls",
    draggable:false,
    autoplay:true,
   // fade: true,
    cssEase: 'linear',
    autoplaySpeed:10000,
    slidesToScroll:1,
    slidesToShow:1,
    prevArrow:'<button class="arrow" id="prev" aria-label="Previous Slide"><i class="icon-angle-left"></i></button>',
    nextArrow:'<button class="arrow" id="next" aria-label="Next Slide"><i class="icon-angle-right"></i></button>',
    speed:300,
    customPaging:function(slider,index) {         
        return '<button><span></span></button>' 
    },
    responsive: 
    [{
        breakpoint: 1000,
        settings: {
            fade: true,
        } 
    }]       
});   


   //Slider Form
   $(".slick-form").slick({      
    dots:true,     
    infinite:false,
    draggable: false,
    prevArrow:'',
    nextArrow:'.input .next', 
    arrows:true,
    customPaging:function(slider,index) {         
        return '<button><span></span></button>' 
         },
    }); 
    //prevent validator on slider form
    $('footer .forms input').on('invalid', function(e) { e.preventDefault(); });


    var $status = $('.gallery .pagingInfo');
    var $gallery = $('.gallery .slick-gallery');
    $gallery.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
        //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
        var i = (currentSlide ? currentSlide : 0) + 1;
        $status.html(`<span> ${i} </span>/<span> ${slick.slideCount} </span> `)
    });


    $(".slick-gallery").slick({
        dots:true,
        arrows:true, 
        fade: true,
        autoplay:true,
        autoplaySpeed:3000,
        // speed:900,    
        adaptiveHeight: true,
        appendDots:".slick-controls",
        appendArrows: ".slick-controls",
        prevArrow:'<button class="arrow" id="prev" aria-label="Previous Slide"><i class="icon-angle-left"></i></button>',
        nextArrow:'<button class="arrow" id="next" aria-label="Next Slide"><i class="icon-angle-right"></i></button>',     
        customPaging:function(slider,index) {         
            return '<button><span></span></button>' 
        },
        responsive: 
        [{
            breakpoint: 700,
            settings: {  
                appendArrows:".slick-controls",
                dots:true
            } 
        }]     
    }); 



});   /*end of videos & slider function */



  // leanModal v1.1 by Ray Stone - http://finelysliced.com.au
  // Dual licensed under the MIT and GPL

  (function($){$.fn.extend({leanModal:function(options){var defaults={top:100,overlay:0.5,closeButton:null};var overlay=$("<div id='lean_overlay'></div>");$("body").append(overlay);options=$.extend(defaults,options);return this.each(function(){var o=options;$(this).click(function(e){var modal_id=$(this).attr("href");$("#lean_overlay").click(function(){close_modal(modal_id)});$(o.closeButton).click(function(){close_modal(modal_id)});var modal_height=$(modal_id).outerHeight();var modal_width=$(modal_id).outerWidth();
  $("#lean_overlay").css({"display":"block",opacity:0});$("#lean_overlay").fadeTo(200,o.overlay);$(modal_id).css({"display":"block","position":"fixed","opacity":0,"z-index":11000,"left":50+"%","margin-left":-(modal_width/2)+"px","top":o.top+"px"});$(modal_id).fadeTo(200,1);e.preventDefault()})});function close_modal(modal_id){$("#lean_overlay").fadeOut(200);$(modal_id).css({"display":"none"})}}})})(jQuery);

  $("a[rel*=leanModal]").leanModal({top:10});

document.addEventListener('keydown', function(event){
	if(event.key === "Escape"){
        $("#lean_overlay").trigger("click");
	}
});




/* Other slick slider options - Delete if not needed */


    // $(".slick-banner").slick({      
    //     dots:true,   
    //     arrows:false,          
    //     appendDots:".banner-controls",
    //     customPaging:function(slider,index) {         
    //      return '<span></span>';
    //     },
    //     fade:true,
    //     draggable:false,
    //     autoplay:true,
    //     autoplaySpeed:8000,
    //     speed:800,        
    //     responsive: 
    //     [{
    //     breakpoint: 1023,
    //     settings: {                         
    //     } 
    //     }]

    // }); 

    // $("#banner-nav").slick({
    //     arrows:false,   
    //     dots:false,     
    //     draggable:false,
    //     infinite:false,
    //     autoplay:false,
    //     slidesToShow:4,
    //     focusOnSelect:true,
    //     asNavFor: ".slick-banner"
    // }); 


    // $(".slick-specials").slick({      
    //     dots:true,     
    //     arrows:true,   
    //     appendArrows:".specials-controls",
    //     appendDots:".specials-controls",
        // prevArrow:'<a href="#" id="prev"><i class="icon-angle-left"></i></a>',
        // nextArrow:'<a href="#" id="next"><i class="icon-angle-right"></i></a>',      
    //     slidesToShow:2,
    //     focusOnSelect:true,
    //     responsive: 
    //     [{
    //         breakpoint: 900,
    //         settings: {
    //             slidesToShow:1
    //         } 
    //     }],
    //     customPaging:function(slider,index) {
    //         return '<span></span>';
    //     }
    // }); 

    // if(theWindow.width() > 1023) {
    //     $(".slick-about").slick({      
    //         dots:true,     
    //         arrows:true,           
    //         appendArrows:".about-controls",
        // prevArrow:'<a href="#" id="prev"><i class="icon-angle-left"></i></a>',
        // nextArrow:'<a href="#" id="next"><i class="icon-angle-right"></i></a>',     
    //         appendDots:".about-controls",
    //         customPaging:function(slider,index) {
    //         var totalCount = "", totalSlides = ""; //to add 0
    //         if (slider.slideCount < 10) { totalCount = ""; }
    //         if (index < 9) { totalSlides ="";  }   
    //         return '<span><b>' + totalSlides + (index + 1) + '</b>/' + totalCount + slider.slideCount +'</span>';
    //         }
    //     });         
    // }

    //  if (theWindow.width() > 1023) {
    //     $(".slick-callouts").slick({      
    //         dots:false,     
    //         arrows:false,           
    //         fade:true,
    //         draggable:false,
    //         focusOnSelect: true,
    //         autoplay:false,
    //         asNavFor: '#switch-nav'
    //     }); 
    //     $("#callouts-nav").slick({
    //         arrows:false,   
    //         dots:false,     
    //         draggable:false,
    //         infinite:false,
    //         autoplay:false,
    //         slidesToShow:6,
    //         focusOnSelect:true,
    //         asNavFor: ".slick-switch"
    //     });
    // }

    // if (theWindow.width() > 1023) {
    //     $(".slick-switch").slick({      
    //         dots:false,     
    //         arrows:false,           
    //         fade:true,
    //         draggable:false,
    //         focusOnSelect: true,
    //         autoplay:false,
    //         asNavFor: '#switch-nav'
    //     }); 
    //     $("#switch-nav").slick({
    //         arrows:false,   
    //         dots:false,     
    //         draggable:false,
    //         infinite:false,
    //         autoplay:false,
    //         slidesToShow:3,
    //         focusOnSelect:true,
    //         asNavFor: ".slick-switch"
    //     });
    // }

    // if(theWindow.width() > 1023) {

    // $(".services-nav").slick({
    //     arrows:false,   
    //     dots:false,     
    //     draggable:false,
    //     infinite:false,
    //     vertical:true,
    //     slidesToShow:5,
    //     focusOnSelect:true,
    //     asNavFor: ".slick-services"
    // });
    // }

    // if(theWindow.width() > 1023) {
    //     $(".slick-callouts").slick({
    //         dots:true,
    //         arrows:true,
    //         centerMode:true,
    //         slidesToShow:3,
    //         appendDots:".callouts-controls",
    //         appendArrows:".callouts-controls",
        // prevArrow:'<a href="#" id="prev"><i class="icon-angle-left"></i></a>',
        // nextArrow:'<a href="#" id="next"><i class="icon-angle-right"></i></a>',                      
    //         customPaging:function(slider,index) {         
    //             return '<span></span>';
    //         }
    //     }); 
    // }    


