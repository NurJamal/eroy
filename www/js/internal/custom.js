/*
EROY GLOBAL FUNCTION
PLEASE PUT COMMENT IF NECESSARY
TQ
*/

		/*Payment Get URL From Native*/
		function handleOpenURL(url) {
			setTimeout(function() {
				//localStorage['PAYMENT_REDIRECT_URL'] = url;
				paymentRedirect(url);
			 }, 3000);
		}
	
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
			var delta = 50;
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

	function redisplayHeader() {
		$("#head").animate({opacity: '1'},"fast");	
		$("#scrollTop").css("visibility","hidden");
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
	
	/*Go Back History*/
	function goBack()
	{
		window.history.back();
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
	function getCountry(id,selected)
	{
		var sel_id = id;
		var set_selected = selected;

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
							$('#'+id)
							.find('option')
							.remove()
							.end();
							$('#'+sel_id).append('<option value="">Pilih Negeri</option>');


							var xmlDoc = $.parseXML(xml);
							$xml = $(xmlDoc);
							$(xml).find("lk_kod_negeri").each(function()
							{
								var id = $(this).find("id");
								var negeri = $(this).find("negeri");
								$('#'+sel_id).append('<option value="'+$(id).text()+'">'+$(negeri).text()+'</option>');
							});

						$('#'+sel_id).val(set_selected);

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
	function getDaerah(negeri,id,selected)
	{
	
		var daerah_id = id;
		var set_selected = selected;

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
							$('#'+id).append('<option value="">Pilih Daerah</option>');
							var xmlDoc = $.parseXML(xml);
							$xml = $(xmlDoc);
							$(xml).find("lk_kod_daerah").each(function()
							{
								var kodDaerah = $(this).find("Kod_Daerah");
								var kod = $(this).find("Kod");
								var keterangan = $(this).find("Keterangan");
								
								$('#'+daerah_id).append('<option value="'+$(kodDaerah).text()+'">'+$(keterangan).text()+'</option>');
							});
						
							$('#'+daerah_id).val(set_selected);

						},
						error: function() 
						{
							console.log("An error occurred while processing XML file.");
						}
					}
				);

			});
			
		
	};
	
	/*GET NAMABANK*/
	function getNamaBank(id)
	{
	
		var daerah_id = id;
		$(function() 
			{
				$.ajax
				(
					{
						type: "POST",
						url: "http://eroy.me-tech.com.my/api/lookup_table/get_kod_bank.php",
						dataType: "xml",
						success: function(xml)
						{
							
						
							var xmlDoc = $.parseXML(xml),
							$xml = $(xmlDoc);
							$(xml).find("lk_nama_bank").each(function()
							{
								var id = $(this).find("id");
								var nama_bank = $(this).find("nama_bank");
								
								$('#'+daerah_id).append('<option value="'+$(id).text()+'">'+$(nama_bank).text()+'</option>');
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
	
	
	/*GET JENIS BAYARAN*/
	function getJenisBayaran(id)
	{
	
		var jenis_bayaran_id = id;
		$(function() 
			{
				$.ajax
				(
					{
						type: "POST",
						url: "http://eroy.me-tech.com.my/api/lookup_table/get_jenis_bayaran.php",
						dataType: "xml",
						success: function(xml)
						{
							var xmlDoc = $.parseXML(xml),
							$xml = $(xmlDoc);
							$(xml).find("lk_bentuk_bayaran").each(function()
							{
								console.log($(this).text());
								var id = $(this).find("id");
								var jenis_bayaran = $(this).find("bentuk_bayaran");
								
								$('#'+jenis_bayaran_id).append('<option value="'+$(id).text()+'">'+$(jenis_bayaran).text()+'</option>');
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
	
	
	
	/*GET JUMLAH BAYARAN MENGIKUT PERINGKAT*/
	function getJumlahBayaranMengikutPeringkat(id,id1,id2)
	{
	
		var jumlah_bayaran_id = id;
		var id_bayaran = id1;

		var peringkat_id = id2;

		$(function() 
			{
				$.ajax
				(
					{
						type: "POST",
						url: "http://eroy.me-tech.com.my/api/lookup_table/get_jumlah_bayaran_mengikut_peringkat.php",
						dataType: "xml",
						data:{
							peringkat_id : peringkat_id,
						},
						success: function(xml)
						{
							var xmlDoc = $.parseXML(xml),
							$xml = $(xmlDoc);
							$(xml).find("lk_jumlah_bayaran").each(function()
							{
								console.log($(this).text());
								var jumlah_bayaran = $(this).find("amaun_pembayaran");
								var id = $(this).find("jenis_pembayaran");

								$('#'+jumlah_bayaran_id).val('RM '+jumlah_bayaran.text());
								$('#'+id_bayaran).val(id.text());
								$('#amount').val(jumlah_bayaran.text());

								
								
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
	
	
	/*GET JENIS PERTUBUHAN*/
	function getJenisPertubuhan(id1,id2,id3)
	{
		var title_pendaftaran_pertubuhan = id1;
		var jenis_pertubuhan_id = id2;
		var static_kod_pertubuhan = id3;


		$(function() 
			{
				$.ajax
				(
					{
						type: "POST",
						url: "http://eroy.me-tech.com.my/api/lookup_table/get_jenis_pertubuhan.php",
						dataType: "xml",
						data:{
							static_kod_pertubuhan : static_kod_pertubuhan,
						},
						success: function(xml)
						{
							var xmlDoc = $.parseXML(xml),
							$xml = $(xmlDoc);
							$(xml).find("lk_jenis_pertubuhan").each(function()
							{	
								/*SET JENIS PERTUBUHAN PADA ID BERIKUT*/
								var nama_pertubuhan = $(this).find("jenis_pertubuhan");
								$('#'+jenis_pertubuhan_id).html(nama_pertubuhan);
					
								/*SET JENIS PERTUBUHAN PADA ID BERIKUT*/
								//$('#'+title_pendaftaran_pertubuhan).append(nama_pertubuhan);

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
	
	
	/*GET JENIS PERTUBUHAN*/
	function getKategoriPertubuhan(id1,id2)
	{
		var kategori_pertubuhan_id = id1;
		var static_kategori_pertubuhan = id2;
		
		
		$(function() 
			{
				$.ajax
				(
					{
						type: "POST",
						url: "http://eroy.me-tech.com.my/api/lookup_table/get_kategori_pertubuhan.php",
						dataType: "xml",
						data:{
							static_kategori_pertubuhan : static_kategori_pertubuhan,
						},
						success: function(xml)
						{
							var xmlDoc = $.parseXML(xml),
							$xml = $(xmlDoc);
							$(xml).find("lk_kategori_pertubuhan").each(function()
							{
								var id = $(this).find("id");
								var kategori_pertubuhan = $(this).find("kategori_pertubuhan");
								var lang = $(this).find("lang");

								$('#'+kategori_pertubuhan_id).append('<option value="'+$(id).text()+'">'+$(kategori_pertubuhan).text()+'</option>');
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
	
	/*GET PERINGKAT PERTUBUHAN*/
	function getPeringkatPertubuhan(id1,id2)
	{
		var peringkat_pertubuhan_id = id1;
		var static_jenis_pertubuhan = id2;
		
		
		$(function() 
			{
				$.ajax
				(
					{
						type: "POST",
						url: "http://eroy.me-tech.com.my/api/lookup_table/get_peringkat_pertubuhan.php",
						dataType: "xml",
						data:{
							static_peringkat_pertubuhan : static_jenis_pertubuhan,
						},
						success: function(xml)
						
						{ 
							var xmlDoc = $.parseXML(xml),
							$xml = $(xmlDoc);
							$(xml).find("lk_peringkat_pertubuhan").each(function()
							{
								var id = $(this).find("id");
								var peringkat_pertubuhan = $(this).find("peringkat_pertubuhan");
								var lang = $(this).find("lang");

								$('#'+peringkat_pertubuhan_id).append('<option value="'+$(id).text()+'">'+$(peringkat_pertubuhan).text()+'</option>');
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
	
	function getPeringkatInduk(id1,id2)
	{		
		var peringkat_pertubuhan_id = id1;
		var static_jenis_pertubuhan = id2;
								


		$(function() 
			{
				$.ajax
				(
					{
						type: "POST",
						url: "http://eroy.me-tech.com.my/api/lookup_table/get_peringkat_induk.php",
						dataType: "xml",
						data:
						{
							static_jenis_pertubuhan : static_jenis_pertubuhan,
						},
						success: function(xml)
						{
							var xmlDoc = $.parseXML(xml),
							$xml = $(xmlDoc);							
							$(xml).find("lk_peringkat_pertubuhan").each(function()
							{	
								/*SET JENIS PERTUBUHAN PADA ID BERIKUT*/
								var nama_pertubuhan = $(this).find("peringkat_pertubuhan");
								$('#'+peringkat_pertubuhan_id).html(nama_pertubuhan);					
							
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
	/*Control IC - Input*/
	function ic_control(ic_id)
	{
		var kad_pengenalan_field_id = ic_id;
		$( "#"+kad_pengenalan_field_id ).keyup(function() 
		{
			var input = $("#"+kad_pengenalan_field_id).val(); 
			if ( input.length == 6 ) {	
				$(function()
				{
					$( "#"+kad_pengenalan_field_id ).val(input+"-");
				});
			}
			if ( input.length == 9 ) {	
				$(function()
				{
					$( "#"+kad_pengenalan_field_id ).val(input+"-");
					
				});
			
			}
		});
	}
	
	/*Auto Calculate Umur - Input*/
	function auto_calculate_umur(tarikh_id)
	{
		var tarikh_id = tarikh_id;
		
		var dob = $("#"+tarikh_id).val();
		dob = dob.split('-');
		
		var yearOfDob = dob[0];
		var currentYear = (new Date).getFullYear(); 
		var age = Math.floor(currentYear-yearOfDob);
	
		return age;
	}

	function goBack()
	{
		window.history.back();
	}

	var count = 1;
	
	//LIST JAWATAN
	function getJawatan(id,selected)
	{
		var sel_id = id;
		var set_selected = selected;

		$(function() 
			{
				$.ajax
				(
					{
						type: "GET",
						url: "http://eroy.me-tech.com.my/api/get_jawatan.php",
						dataType: "xml",
						success: function(xml)
						{


							$('#'+id)
							.find('option')
							.remove()
							.end();
							$('#'+sel_id).append('<option value="">Sila Pilih Jawatan</option>');


							var xmlDoc = $.parseXML(xml),
							$xml = $(xmlDoc);
							$(xml).find("lk_jawatan").each(function()
							{
								var id = $(this).find("id");
								var jawatan = $(this).find("jawatan");
								$('#'+sel_id).append('<option value="'+$(id).text()+'">'+$(jawatan).text()+'</option>');
							});

						$('#'+sel_id).val(set_selected);

						},
						error: function() 
						{
							console.log("An error occurred while processing XML file.");
						}
					}
				);

			});
	}
	

	//LIST JAWATAN
	function getStatusIcon(statusId,idToAppend)
	{
		var statusId = statusId;
		var idToAppend = idToAppend;
		var imgPath;
		
		if(statusId == '1')//AKTIF
		{
			imgPath = "../../img/aktif_icon.png";
		}
		else if (statusId == '2')//TIDAK AKTIF
		{
			imgPath = "../../img/tidak_aktif_icon.png";
		}
		else if (statusId == '3')//GANTUNG
		{
			imgPath = "../../img/gantung_icon.png";
		}
		else if (statusId == '4')//BATAL
		{
			imgPath = "../../img/batal_icon.png";
		}
		else{}

		$('#keaktifan_'+idToAppend).append('<div style="height:45px;width:45px;"><img style="display: block;" width="auto" height="90%" src="'+imgPath+'" /></div>');
	}
	

	function openDeviceBrowser(externalLinkToOpen)
	{	
		window.open(externalLinkToOpen, '_system', 'location=no');
		//navigator.app.loadUrl('http://www.google.com', { openExternal:true } ); 
	}
	
function highlightID(id)
{
	var div_id = id;
	var colour_id = '#f4f4f4';

	$('#'+div_id).click(function() {
   		$(this).css("backgroundColor", colour_id); 
	});

}

	function navigatorOpenExternal()
	{
		//navigator.app.loadUrl('http://eroy.me-tech.com.my/api/payment/payment_dummy.php?k=abc', { openExternal:true } );
		window.open('http://eroy.me-tech.com.my/api/payment/payment_dummy.php?k=abc','_system')
		return false;
	}

function checkKuiriPendaftaran(kod_pertubuhan,lvl)
{
	var kod_pertubuhan = kod_pertubuhan;
	var level = lvl
	formLength = document.pendaftaran.elements.length;
	$(function() 
	{
		$.ajax({
			url:"http://eroy.me-tech.com.my/api/kuiri/check_kuiri_pendaftaran.php",
			type:'POST',
			data: {
				kod_pertubuhan : kod_pertubuhan,
				level : level,
			},
			success:function(data)
			{
				var json = $.xml2json(data);
				if (json.status == 'SELECT') {

				 	console.log(Array.isArray(json.details));
				 	if(Array.isArray(json.details))
				 	{
				 		for (var j = 0; j < json.details.length; j++) {
				 			for (var i = 0; i < formLength; i++) {
								if(document.pendaftaran.elements[i].name == json.details[j].id_label_pendaftaran)
								{
									var sel = json.details[j].id_label_pendaftaran.split('_');
                                    if(document.pendaftaran.elements[i].type == "file")
                                    {
                                        var div = '<div class="kuiriIcon" id="'+json.details[j].id_label_pendaftaran+'_div"></div>';
                                        $(div).insertBefore('#'+json.details[j].id_label_pendaftaran);
                                        $("#"+json.details[j].id_label_pendaftaran+"_div").attr("onclick","getInfo(\'"+json.details[j].kuiri+"\',\'"+json.details[j].id_label_pendaftaran+"\')");
                                        $("#"+json.details[j].id_label_pendaftaran+"_div").css('margin-top','0px');
                                        document.pendaftaran.elements[i].style.width = "85%";
                                        document.pendaftaran.elements[i].removeAttribute("disabled");
                                    }
									else if(sel[0] == "sel")
									{
										var newId = sel[1]+'_selection';
										var div = '<div class="kuiriIcon" id="'+json.details[j].id_label_pendaftaran+'_div"></div>';
										$(div).insertBefore('#'+newId);
										$("#"+json.details[j].id_label_pendaftaran+"_div").attr("onclick","getInfo(\'"+json.details[j].kuiri+"\',\'"+json.details[j].id_label_pendaftaran+"\')");
										$("#"+json.details[j].id_label_pendaftaran+"_div").css('margin-top','0px');
										$('#'+newId).css('width','85%');
										document.pendaftaran.elements[i].removeAttribute("disabled");
									}else
									{
										var div = '<div class="kuiriIcon" id="'+json.details[j].id_label_pendaftaran+'_div"></div>';
										$(div).insertAfter('#'+json.details[j].id_label_pendaftaran);
										$("#"+json.details[j].id_label_pendaftaran+"_div").attr("onclick","getInfo(\'"+json.details[j].kuiri+"\',\'"+json.details[j].id_label_pendaftaran+"\')");
										document.pendaftaran.elements[i].style.width = "85%";
										document.pendaftaran.elements[i].removeAttribute("disabled");
									} 
								}
							};					
						};
				 	}else
				 	{
				 		for (var i = 0; i < formLength; i++) {
							if(document.pendaftaran.elements[i].name == json.details.id_label_pendaftaran)
							{
								var sel = json.details.id_label_pendaftaran.split('_');
								if(sel[0] == "sel")
								{
									var newId = sel[1]+'_selection';
									var div = '<div class="kuiriIcon" id="'+json.details.id_label_pendaftaran+'_div"></div>';
									$(div).insertBefore('#'+newId);
									$("#"+json.details.id_label_pendaftaran+"_div").attr("onclick","getInfo(\'"+json.details.kuiri+"\',\'"+json.details.id_label_pendaftaran+"\')");
									$("#"+json.details.id_label_pendaftaran+"_div").css('margin-top','0px');
									$('#'+newId).css('width','85%');
									document.pendaftaran.elements[i].removeAttribute("disabled");
								}else
								{
									var div = '<div class="kuiriIcon" id="'+json.details.id_label_pendaftaran+'_div"></div>';
									$(div).insertAfter('#'+json.details.id_label_pendaftaran);
									$("#"+json.details.id_label_pendaftaran+"_div").attr("onclick","getInfo(\'"+json.details.kuiri+"\',\'"+json.details.id_label_pendaftaran+"\')");
									document.pendaftaran.elements[i].style.width = "85%";
									document.pendaftaran.elements[i].removeAttribute("disabled");
								} 
							}
							
						};
				 	}
					$('body').waitMe('hide');

				}else if (json.status == 'EMPTY')
				{
					//alert("empty");
					$('#id_pertubuhan').val("empty");
					$('body').waitMe('hide');
				}
			}
		});
	});
}

function checkKuiriPindaan(id_pertubuhan)
{
	var kod_pertubuhan = id_pertubuhan;
	formLength = document.pendaftaran.elements.length;
	$(function() 
	{
		$.ajax({
			url:"http://eroy.me-tech.com.my/api/kuiri/check_kuiri_pindaan.php",
			type:'POST',
			data: {
				kod_pertubuhan : kod_pertubuhan,
			},
			success:function(data)
			{
				var json = $.xml2json(data);
				
				if (json.status == 'SELECT') {
				 	if(Array.isArray(json.details))
				 	{
				 		for (var j = 0; j < json.details.length; j++) {
				 			for (var i = 0; i < formLength; i++) {
								if(document.pendaftaran.elements[i].name == json.details[j].id_label_pindaan)
								{
									var sel = json.details[j].id_label_pindaan.split('_');
									if(sel[0] == "sel")
									{
										var newId = sel[1]+'_selection';
										var div = '<div class="kuiriIcon" id="'+json.details[j].id_label_pindaan+'_div"></div>';
										$(div).insertBefore('#'+newId);
										$("#"+json.details[j].id_label_pindaan+"_div").attr("onclick","getInfo(\'"+json.details[j].kuiri+"\',\'"+json.details[j].id_label_pindaan+"\')");
										$("#"+json.details[j].id_label_pindaan+"_div").css('margin-top','0px');
										$('#'+newId).css('width','85%');
										document.pendaftaran.elements[i].removeAttribute("disabled");
									}else
									{
										var div = '<div class="kuiriIcon" id="'+json.details[j].id_label_pindaan+'_div"></div>';
										$(div).insertAfter('#'+json.details[j].id_label_pindaan);
										$("#"+json.details[j].id_label_pindaan+"_div").attr("onclick","getInfo(\'"+json.details[j].kuiri+"\',\'"+json.details[j].id_label_pindaan+"\')");
										document.pendaftaran.elements[i].style.width = "85%";
										document.pendaftaran.elements[i].removeAttribute("disabled");
									} 
								}
							};					
						};
				 	}else
				 	{
				 		for (var i = 0; i < formLength; i++) {
							if(document.pendaftaran.elements[i].name == json.details.id_label_pindaan)
							{
								var sel = json.details.id_label_pindaan.split('_');
								console.log(sel[0]);
								if(sel[0] == "sel")
								{
									var newId = sel[1]+'_selection';
									var div = '<div class="kuiriIcon" id="'+json.details.id_label_pindaan+'_div"></div>';
									$(div).insertBefore('#'+newId);
									$("#"+json.details.id_label_pindaan+"_div").attr("onclick","getInfo(\'"+json.details.kuiri+"\',\'"+json.details.id_label_pindaan+"\')");
									$("#"+json.details.id_label_pindaan+"_div").css('margin-top','0px');
									$('#'+newId).css('width','85%');
									document.pendaftaran.elements[i].removeAttribute("disabled");
								}else
								{
									var div = '<div class="kuiriIcon" id="'+json.details.id_label_pindaan+'_div"></div>';
									$(div).insertAfter('#'+json.details.id_label_pindaan);
									$("#"+json.details.id_label_pindaan+"_div").attr("onclick","getInfo(\'"+json.details.kuiri+"\',\'"+json.details.id_label_pindaan+"\')");
									document.pendaftaran.elements[i].style.width = "85%";
									document.pendaftaran.elements[i].removeAttribute("disabled");
								} 
							}
							
						};
				 	}
					$('body').waitMe('hide');

				}else if (json.status == 'EMPTY')
				{
					//alert("empty");
					$('#id_pertubuhan').val("empty");
					$('body').waitMe('hide');
				}
			}
		});
	});
}

function getInfo(msg,id)
{
	var currentSelectedId = $('#'+id+'_div');
	
	var lol = '<table width="100%" height="20">';
	lol += '<tr align="center">';
	lol += '<td width="40px">'+msg+'</td>';
	lol += '</tr>';
	lol += '</table>';
	
	currentSelectedId.qtip({
	overwrite: false, 
		content: {
			//text: $('#tooltiptext'),
			text: lol,
			button: false,
				
		},
		 style: {
			width: '100%', 
			height: 30,
			classes: 'qtip-cream'
		 },   
			
		show: {
		 //effect: function(offset) {
		//		$(this).slideDown(100); // "this" refers to the tooltip
		//	},
			event: 'click',
			solo: true,
			
	   
		},

		hide:'unfocus',
		events: {
			visible: function(event, api) {
				//$('#transparent_layer').show();
				$("body").css("overflow-y", "hidden");
			},
			 hide: function(event, api) {
				//$('#transparent_layer').hide();
				$("body").css("overflow-y", "visible");
			}
		},
		 position: {
			my: 'bottom right',
			at: 'top left'
		}
	});
}
	
	
	
	
	
	
	
	
	
	