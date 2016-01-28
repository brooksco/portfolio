$(document).foundation();

$(document).ready(function() {

	// If it seems like we're on a mobile device, HTML5 video backgrounds aren't likely to work right
	// So replace the videos with images
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		$("#main-left-video, #main-right-video").remove();
 		$("#main-left").css({ "background" : "url(img/code.jpg) no-repeat bottom center", "background-size" : "cover" });
 		$("#main-right").css({ "background" : "url(img/rainierunderthemoon.jpg) no-repeat bottom center", "background-size" : "cover" });
	}

	// Index page
	// Handlers for changing brightness on hover (mouse enter and mouse leave)
	$( "#main-left" ).mouseenter(function() {
  		$("#main-right").css({"filter" : "brightness(50%)", "-webkit-filter" : "brightness(50%)" });
  		$("#main-right-video")[0].pause();
  		$("#main-left-video")[0].play();
	});

	$( "#main-left" ).mouseleave(function() {
  		$("#main-right").css({"filter" : "brightness(100%)", "-webkit-filter" : "brightness(100%)" });
  		$("#main-right-video")[0].pause();
  		$("#main-left-video")[0].pause();
	});

	$( "#main-right" ).mouseenter(function() {
  		$("#main-left").css({"filter" : "brightness(50%)", "-webkit-filter" : "brightness(50%)" });
  		$("#main-left-video")[0].pause();
  		$("#main-right-video")[0].play();
	});

	$( "#main-right" ).mouseleave(function() {
  		$("#main-left").css({"filter" : "brightness(100%)", "-webkit-filter" : "brightness(100%)" });
  		$("#main-right-video")[0].pause();
  		$("#main-left-video")[0].pause();
	});

	// Development page

	$( ".dev-video" ).mouseenter(function() {
  		$(this)[0].play();
	});

	$( ".dev-video" ).mouseleave(function() {
  		$(this)[0].pause();
	});

	// Photography page

	$(".item").each(function(i){
		// $(this).css("opacity", "1");
		// alert(i);
		var current = $(this);
    	setTimeout(function() { 
    		current.css("opacity", "1");
    	}, (i + 1) * 80);
	});

});