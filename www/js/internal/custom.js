
	/*On Ready Event*/
	$( document ).ready(function() {
	
	
	
	$("#scrollTop").click(function() {
	  $("html, body").animate({ scrollTop: 0 }, "100");
	  return false;
	});
	
	$(window).scroll(function() {
        if($(window).scrollTop() > 100) {
			$("#scrollTop").css("visibility","visible");
        } else {
			$("#scrollTop").css("visibility","hidden");
        }
		}); 
	});
