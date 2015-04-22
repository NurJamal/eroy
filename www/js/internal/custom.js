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
	function getFasal(id1, kodPertubuhan)
	{
			var id_pertubuhan = kodPertubuhan;
			var fasal_id = id1;
			
			
			
			$(function() 
			{
				$.ajax
				(
					{
						type: "POST",
						url: "http://eroy.me-tech.com.my/api/lookup_table/get_fasal.php",
						data: {
							id_pertubuhan : id_pertubuhan,
						},
						dataType: "xml",
						success: function(xml)
						{
							var json = $.xml2json(xml);
							var data  = JSON.stringify(json);
							var parseData = JSON.parse(data);
							console.log(parseData);
							
					$.each(parseData.fasal_template, function (index_1, value) {
						
						
						$.each(value, function (index_2, fasal_list) {
						
								var div = '<div></div>';
						
								var fasal_index= 'Fasal '+(index_2+1);
		
								var editorImgFirstLvl = '<image class="openToolTip" id="tr_'+fasal_list.id+'_img" style="margin-bottom:-7px;" src="img/pindaan-icon.png" width="25px" height="25px" ><span >';
								var checkBoxFirstLvl = '<input class="checkboxClass" id="checkbox'+fasal_list.id+'" type="checkbox" name="senarai" value="Maklumat Sijil Pendaftaran Pertubuhan Belia" /><label for="checkbox'+fasal_list.id+'"></label>';
								
								//First Lvl
								$('#'+fasal_id).append('<div class="checkbox" id="tr_'+fasal_list.id+'"><div width="30px" id="level_'+fasal_list.level+'">'+editorImgFirstLvl+' '+checkBoxFirstLvl+'<span id="fasal_'+fasal_list.id+'"></span></div></div>');
								$('#fasal_'+fasal_list.id).append('<label for="checkbox'+fasal_list.id+'"><span class="fasal_label" id="fasal_index_'+fasal_list.id+'"> Fasal '+ fasal_list.code_level+'</span> - <span class="fasal_label_text" id="fasal_index_'+fasal_list.id+'_text"> '+fasal_list.fasal+'</span></label>');
								var arrayCode = [];
								
								if(fasal_list.sub_fasal != null)
								{
									if (Array.isArray(fasal_list.sub_fasal))
									{
											var arrayCode2 = [];
											
											$.each(fasal_list.sub_fasal, function (index_3, sub_fasal_list) {
												//Second Lvl

												var editorImgSecondLvl = '<image class="openToolTip" id="tr_'+sub_fasal_list.id+'_img" style="margin-bottom:-7px;" src="img/pindaan-icon.png" width="25px" height="25px" >';
												var checkBoxSecondLvl = '<input class="checkboxClass" id="checkbox'+sub_fasal_list.id+'" type="checkbox" name="senarai" value="Maklumat Sijil Pendaftaran Pertubuhan Belia" /><label for="checkbox'+sub_fasal_list.id+'"></label>';

												if(sub_fasal_list.ref_level == fasal_list.code_level )
												{
												

													$('#tr_'+fasal_list.id).append('<div class="checkbox" style="margin-left:30px;" id="tr_'+sub_fasal_list.id+'"><div width="30px" id="level_'+sub_fasal_list.level+'">'+editorImgSecondLvl+' '+checkBoxSecondLvl+'<span id="fasal_'+sub_fasal_list.id+'"></span></div>');
													$('#fasal_'+sub_fasal_list.id).append('<label for="checkbox'+sub_fasal_list.id+'"><span class="sub_fasal_label" id="fasal_index_'+sub_fasal_list.id+'">'+ sub_fasal_list.code_level+'</span> - <span class="fasal_label_text" id="fasal_index_'+sub_fasal_list.id+'_text"> '+sub_fasal_list.fasal+'</span></label>');
													
													
													//Third Lvl and above
													$.each(fasal_list.sub_fasal, function (index_4_1, sub_fasal_nested_list_1)
														{ 
															$.each(fasal_list.sub_fasal, function (index_4_2, sub_fasal_nested_list)
																{
																
																		arrayCode2.push(sub_fasal_nested_list.ref_level);		
																		if(sub_fasal_nested_list_1.code_level == sub_fasal_nested_list.ref_level && arrayCode.indexOf(sub_fasal_nested_list.ref_level) <= 0 )
																		{
																		
																			//Per sec0nd Lvl. -_-
																			if(sub_fasal_nested_list.main_sub_level == sub_fasal_list.code_level )
																			{
																				
																				
																				var marginLeftPX = 0;
																				if(sub_fasal_nested_list.level > 1)
																				{
																					marginLeftPX = '30';
																				}
																				
																				//for(var x = 1 ; x < sub_fasal_nested_list.level ; x ++)
																				//{
																				//	marginLeftPX = parseInt(marginLeftPX+30);
																				//}
																																					
																				$('#tr_'+sub_fasal_nested_list_1.id).append('<div class="checkbox" style="margin-left:'+marginLeftPX+'px;" id="tr_'+sub_fasal_nested_list.id+'"><div id="level_'+sub_fasal_nested_list.level+'">'+editorImgFirstLvl+' '+checkBoxFirstLvl+'<span id="fasal_'+sub_fasal_nested_list.id+'"></span></div>');
																				$('#fasal_'+sub_fasal_nested_list.id).append('<label for="checkbox'+sub_fasal_nested_list.id+'"><span class="sub_fasal_label" id="fasal_index_'+sub_fasal_nested_list.id+'">'+ sub_fasal_nested_list.code_level+'</span> - <span class="fasal_label_text" id="fasal_index_'+sub_fasal_nested_list.id+'_text"> '+sub_fasal_nested_list.fasal+'</span></label>');										
																				
																				if((index_4_2+1) == (fasal_list.sub_fasal).length){
																					//arrayCode = arrayCode2;
																				}
																			}	
																		}
																	
																});	
																
														});	
														
												}
												
											});
									}
									else
									{
										var editorImgNotArray = '<image src="img/pindaan-icon.png" width="25px" height="25px" style="margin-bottom:-7px;">';
										var checkBoxNotArray = '<input class="checkboxClass" id="checkbox'+fasal_list.sub_fasal.id+'" type="checkbox" name="senarai" value="Maklumat Sijil Pendaftaran Pertubuhan Belia" /><label/>';
								
										if(fasal_list.sub_fasal.ref_level == fasal_list.code_level)
										{
											$('#tr_'+fasal_list.id).append('<div class="checkbox" style="margin-left:30px" id="tr_'+fasal_list.id+'"><div id="level_'+fasal_list.level+'">'+editorImgNotArray+' '+checkBoxNotArray+'<span id="fasal_'+fasal_list.sub_fasal.id+'"></span></div>');
											$('#fasal_'+fasal_list.sub_fasal.id).append('<label for="checkbox'+fasal_list.sub_fasal.id+'"><span class="sub_fasal_label" id="fasal_index_'+fasal_list.id+'">'+ fasal_list.code_level+'</span> - <span class="fasal_label_text" id="fasal_index_'+fasal_list.id+'_text"> '+fasal_list.fasal+'</span></label>');										
										}
									}
								}						
							});
							
							
							
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

	
	
	
	
	
	
	
	
	
	
	