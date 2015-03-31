
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
		
		if(window.localStorage.getItem("_MENU_FIX") == "FALSE"){
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
				$("#head").animate({opacity: '0.0',},"slow");					

			} else {
				// Scroll Up
				/*Put in custom class later nav-up*/
				if(st + $(window).height() < $(document).height()) {
						
				$("#head").animate({opacity: '1'},"fast");	
				
				}
			}
			
			lastScrollTop = st;
		}
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
	
	/* Email Validation */
	function ValidateEmail(email)
	{
		var reg = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
		return reg.test(email);
	};
	
	/*GET COUNTRY*/
	function getCountry(id)
	{

		$(function() 
			{
				$.ajax
				(
					{
						type: "GET",
						url: "http://eroy.me-tech.com.my/api/get_kod_negeri.php",
						dataType: "xml",
						success: function(xml)
						{
							var xmlDoc = $.parseXML(xml),
							$xml = $(xmlDoc);
							$(xml).find("lk_kod_negeri").each(function()
							{
								console.log($(this).text());
								var id = $(this).find("kod_negeri");
								var negeri = $(this).find("negeri");
								$('#'+id).append('<option value="'+$(id).text()+'">'+$(negeri).text()+'</option>');
							});
						},
						error: function() 
						{
							console.log("An error occurred while processing XML file.");
						}
					}
				);

			});
	};
	
	/*GET DAERAH*/
	function getDaerah(negeri,id)
	{
		$(function() 
			{
				$.ajax
				(
					{
						type: "POST",
						url: "http://eroy.me-tech.com.my/api/get_kod_daerah.php",
						data: {
							negeri : negeri,
						},
						dataType: "xml",
						success: function(xml)
						{
							$('#'+id)
							.find('option')
							.remove()
							.end();
				
						
							var xmlDoc = $.parseXML(xml),
							$xml = $(xmlDoc);
							$(xml).find("lk_kod_daerah").each(function()
							{
								console.log($(this).text());
								var kodDaerah = $(this).find("Kod_Daerah");
								var kod = $(this).find("Kod");
								var keterangan = $(this).find("Keterangan");
								
								$('#'+id).append('<option value="'+$(kodDaerah).text()+'">'+$(keterangan).text()+'</option>');
							});
						},
						error: function() 
						{
							console.log("An error occurred while processing XML file.");
						}
					}
				);

			});
	};
