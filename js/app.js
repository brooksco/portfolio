$(document).foundation();

$(document).ready(function() {

	// Flex and fixed don't play the same in Safari as they do in Chrome and Firefox
	// So check, and if it's safari, add an extra class to fix text positioning issues
	var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
	var isChrome = !!window.chrome && !!window.chrome.webstore;
	var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0 || !isChrome && !isOpera && window.webkitAudioContext !== undefined;

	if (isSafari) {
		$(".text-holder").addClass("safari");

		var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

		if (isIOS) {
			$(".text-holder").addClass("ios");
		}
	}

	// If it seems like we're on a mobile device, HTML5 video backgrounds aren't likely to work right
	// So replace the videos with images
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		$("video").css('opacity', 0).animate( { opacity: 1 }, 400);

	} else {
		// Otherwise fade in the videos
		$("video").each(function() { $(this)[0].pause(); });
		$("video").css('opacity', 0).animate( { opacity: 1 }, 400);
	}

	// Index page
	// Handlers for changing brightness on hover (mouse enter and mouse leave)
	$( "#main-left, .mobile-left-text" ).mouseenter(function() {
		$("#main-right").css({"filter" : "brightness(50%)", "-webkit-filter" : "brightness(50%)" });
		$("#main-right-video")[0].pause();
		$("#main-left-video")[0].play();
	});

	$( "#main-left, .mobile-left-text" ).mouseleave(function() {
		$("#main-right").css({"filter" : "brightness(100%)", "-webkit-filter" : "brightness(100%)" });
		$("#main-right-video")[0].pause();
		$("#main-left-video")[0].pause();
	});

	$( "#main-right, .mobile-right-text" ).mouseenter(function() {
		$("#main-left").css({"filter" : "brightness(50%)", "-webkit-filter" : "brightness(50%)" });
		$("#main-left-video")[0].pause();
		$("#main-right-video")[0].play();
	});

	$( "#main-right, .mobile-right-text" ).mouseleave(function() {
		$("#main-left").css({"filter" : "brightness(100%)", "-webkit-filter" : "brightness(100%)" });
		$("#main-right-video")[0].pause();
		$("#main-left-video")[0].pause();
	});

	// Photography page

	$(".item").each(function(i){
		var current = $(this);
		setTimeout(function() { 
			current.css("opacity", "1");
		}, (i + 1) * 80);
	});

	// Lightbox
	$.fancybox.defaults.buttons = [ 'close' ];

	// Development page

    // Scrolling navbar for non-mobile sizes
    enquire.register("screen and (min-width: 640px)", {
    	match : function() {
    		if ($("#waypoint").length != 0) {

    			var waypoint = new Waypoint({
    				element: $('#waypoint'),
    				handler: function(direction) {
    					if (direction == 'down') {
    						$(".full-nav").fadeIn();
    					} else {
    						$(".full-nav").fadeOut();
    					}

    				},
    				offset: 120 
    			});
    		}
    	},  
    	unmatch : function() {
			// $(".full-nav").hide();
		}

	});

	// Save this so we don't havae to keep getting it
	var $root = $('html, body');

	// For the active link and my name, prevent it from reloading the page and instead scroll to the top
	$(".full-nav .active, .full-nav__name").on('click', function(event){     
		event.preventDefault();

		$root.animate({
			scrollTop: $("body").offset().top
		}, 1000);
	});

	$( ".dev-video" ).mouseenter(function() {
		$(this)[0].play();
	});

	$( ".dev-video" ).mouseleave(function() {
		$(this)[0].pause();
	});

	// Smooth anchor link scrolling
	$('a[href*="#"]:not([href="#"])').click(function() {
		var offset = -60;
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				$('html, body').animate({
					scrollTop: target.offset().top + offset
				}, 1000);
				return false;
			}
		}
	});

});