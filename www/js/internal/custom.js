
	//var ajaxTimeout = 1000 * 10;

	/*On Ready Event*/
	/*Click To Top*/
	//$( document ).ready(function() {

		$("#scrollTop").click(function() {
		  $("html, body").animate({ scrollTop: 0 }, "100");
		  return false;
		});
		
		$(window).scroll(function() {
			if($(window).scrollTop() > 120) {
				$("#scrollTop").css("visibility","visible");
			} else {
				$("#scrollTop").css("visibility","hidden");
			}
			}); 
		

		/*Slide to Hide Header Menu*/
		// Hide Header on on scroll down
		var didScroll;
		var lastScrollTop = 0;
		var delta = 120;
		var navbarHeight = $("#head").outerHeight();

		$(window).scroll(function(event){
			didScroll = true;
		});

		setInterval(function() {
			if (didScroll) {
				hasScrolled();
				didScroll = false;
			}
		}, 450);

		function hasScrolled() {
		var st = $(this).scrollTop();
		
		// Make sure they scroll more than delta
		if(Math.abs(lastScrollTop - st) <= delta)
			return;
		
		// If they scrolled down and are past the navbar, add class .nav-up.
		// This is necessary so you never see what is "behind" the navbar.
		if (st > lastScrollTop && st > navbarHeight){
			// Scroll Down
			/*Put in custom class later nav-down*/
			
			
				//$("#head").css("top","-80px");
				//tak smooth la pulak
			
				
				//$("#head").css("transform","translate3d( -300px, 0, 0 )").animate({top:-80px}, "fast");
				//$("#head").css("transform", "translate3d( -300px, 0, 0 )");					
				$("#head").animate({opacity: '0.0',},"slow");					

				//$(".navbar").css("top","0");
				//$(".navbar").css("position","fixed");
				//$(".navbar").css("background-color","#F2F1EF");
				//$(".navbar").css("padding-top","12px");
				//$(".navbar").css("z-index","9");
				//$("._form").css("padding-top","83px");
				//$(".navbar").css("width","100%");
				//$(".navbar").css("height","auto");
				//$(".content_title").css("border-bottom","0px");
				
				//$(".navbar").css("border-bottom","2px solid #F9690E");
				//$("._form").css("padding-left","9px");
				//$("._form").css("padding-right","9px");
				//$(".navbar").css("padding-left","5px");
				//$(".navbar").css("padding-right","5px");
				//$(".content_title").css("position","fixed");
				//$(".content_title").css("top","0px");

		} else {
			// Scroll Up
			/*Put in custom class later nav-up*/

			if(st + $(window).height() < $(document).height()) {
				//$("#head").css("top","0");
				//$("#head").animate({top: '0'}, "fast");
				
				//$("#head").animate({top: '0'}, "fast");					
				$("#head").animate({opacity: '1'},"fast");	
				//$(".navbar").css("top","");
				//$(".navbar").css("position","");
				//$(".navbar").css("padding-top","");
				//$(".navbar").css("z-index","");
				
				
				//$("._form").css("padding-top","");

				//$(".navbar").css("padding-left","");
				//$("._form").css("padding-left","");
				//$("._form").css("padding-right","");
				//$(".content_title").css("border-bottom","2px solid #F9690E");
			}
		}
		
		lastScrollTop = st;
	}


	/*Set Payment Transaction Code*/
	 function SetTransactionCode() {
            var dtDate = new Date();
            var strTransactionCode = dtDate.getFullYear().toString() + dtDate.getMonth().toString() + dtDate.getDate().toString() + dtDate.getTime().toString();
            var strAmount = String(document.forms[0].Amount.value);
            strAmount = strAmount.replace(".", "");
            strTransactionCode = strTransactionCode.rpad("0", 27) + "001" + strAmount.rpad("0", 10);
            document.forms[0].TransactionCode.value = strTransactionCode;
        }
		

		
//});		
		
		
	/*Loading Indicator*/
	function run_waitMe(){
		$('body').waitMe({
			effect: "orbit",
			text: '',
			bg: 'rgba(0,0,0,0.2)',
			color:'#000',
			sizeW:'',
			sizeH:'',
			source: 'img.svg'
		});
	}
		
	/*Logout - remove localstorage*/
	function logKeluar(){
		localStorage.removeItem("NAMA");
		window.location.replace("index.html");
	}
	
	//alert(window.localStorage.getItem("LOGIN"));
	//window.localStorage.setItem("LOGIN", "TEST");
	//alert(window.localStorage.getItem("LOGIN"));

	/*Slide Menu Display Depend on User Session*/
	var value = window.localStorage.getItem("NAMA");
	if(value == null)	
	{
		$("#navigation").load('navigation_menu/nav_Xlogin.html');
	}
	else
	{
		$("#navigation").load('navigation_menu/nav_login.html');
	
	}

	/* Refresh Captcha  */
	function refreshCaptcha() 
	{
		$("#captcha_code").attr('src','http://eroy.me-tech.com.my/api/captcha_code.php');
	}
	
	/* For Uppercase */
	function upperCase() 
	{
		var nama = document.getElementById("f_nama");
		var message = document.getElementById("f_mesej");
		//var sijil = document.getElementById("f_sijil");
		nama.value = nama.value.toUpperCase();
		message.value = message.value.toUpperCase();
		//sijil.value = sijil.value.toUpperCase();
	}
	
	/* Email Validation */
	function ValidateEmail(email)
	{
		var reg = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
		return reg.test(email);
	};
