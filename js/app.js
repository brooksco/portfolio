$(document).foundation();




$(document).ready(function() {

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