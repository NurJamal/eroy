
	/*JAVASCRIPT PERLEMBAGAAN*/
	/*Need to clear all localStorage related perlembagaan first */

		// Create the tooltips only when document ready
		$("#appendPerlembagaan").delegate(".openToolTip", "click", function (){
		
		rewriteID();
		var currentSelectedId = $(this).attr('id');
		var arr = currentSelectedId.split('_');
		localStorage['selected_id_perlembagaan'] = $.trim("tr_"+arr[1]);
		var currentID = localStorage['selected_id_perlembagaan'];
		var lol = '<table width="220" height="30">';
		lol += '<tr align="center">';
		lol += '<td width="10px"></td>';
		lol += '<td width="40px"><img src="img/addbottom-icon.png" width="40px" height="45px"  onclick="addTop()"></td>';
		lol += '<td width="40px"><img src="img/addtop-icon.png" width="40px" height="45px" onclick="addBottom()"></td>';
		lol += '<td width="40px"><img src="img/add-icon.png" width="40px" height="45px" onclick="addFasal()"></td>';
		lol += '<td width="40px"><img src="img/pindaan-icon.png" width="40px" height="45px" onclick="editFasal()"></td>';
		lol += '</tr>';
		lol += '</table>';
		
		$('#'+currentSelectedId).qtip({
		overwrite: false, 
			content: {
				text: lol,
				button: false,
					
			},
			 style: {
				width: 260, 
				height: 63,
				classes: 'qtip-rounded'
			 },   
				
			show: {
			 //effect: function(offset) {
			//		$(this).slideDown(100); // "this" refers to the tooltip
			//	},
				event: 'click',
				solo: false,
				
		   
			},

			hide:'unfocus',
			events: {
				visible: function(event, api) {
					$('#transparent_layer').show();
					$("body").css("overflow-y", "hidden");
					$('#added_'+currentID).remove();
				},
				 hide: function(event, api) {
					$('#transparent_layer').hide();
					$("body").css("overflow-y", "visible");
				
				}
			},
			 position: {
				my: 'bottom left',
				at: 'top left'
			}
		});
	});
		
	

	
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
						beforeSend: function() {
								run_waitMe();
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
																	
																					$('#tr_'+sub_fasal_nested_list_1.id).append('<div class="checkbox" style="margin-left:'+marginLeftPX+'px;" id="tr_'+sub_fasal_nested_list.id+'"><div id="level_'+sub_fasal_nested_list.level+'">'+editorImgFirstLvl+' '+checkBoxFirstLvl+'<span id="fasal_'+sub_fasal_nested_list.id+'"></span></div>');
																					$('#fasal_'+sub_fasal_nested_list.id).append('<label for="checkbox'+sub_fasal_nested_list.id+'"><span class="sub_fasal_label" id="fasal_index_'+sub_fasal_nested_list.id+'">'+ sub_fasal_nested_list.code_level+'</span> - <span class="fasal_label_text" id="fasal_index_'+sub_fasal_nested_list.id+'_text"> '+sub_fasal_nested_list.fasal+'</span></label>');										
																				
																					//if((index_4_2+1) == (fasal_list.sub_fasal).length){
																					//}
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
							
							$('body').waitMe('hide');
							
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
	
	
	//Add Bottom
	function addBottom()
	{			

		/*Get selected & previous id - switch place*/	
		var selected = localStorage.getItem('selected_id_perlembagaan');
		var prevID = $("#"+selected).prev().attr('id');

		//If prev id == 'level'. Do nothing. 
		var arr = prevID.split('_');
		var val =  $.trim(arr[0]);
		if(val != 'level'){
			divSelected = $('#'+selected);
			divprev = $('#'+prevID);

			tdiv1 = divSelected.clone();
			tdiv2 = divprev.clone();

			divSelected.replaceWith(tdiv2);
			divprev.replaceWith(tdiv1);
		}
		$("div").qtip('hide');
		
		
		rewriteSubFasal(selected,prevID);
		rewriteID();
	}

	
	//Add Top
	function addTop()
	{
		var selected = localStorage.getItem('selected_id_perlembagaan');
		var nextID = $("#"+selected).next().attr('id');

		divSelected = $('#'+selected);
		divNext = $('#'+nextID);

		tdiv1 = divSelected.clone();
		tdiv2 = divNext.clone();

		divSelected.replaceWith(tdiv2);
		divNext.replaceWith(tdiv1);
		$("div").qtip('hide');				

		rewriteSubFasal(nextID,selected);
		rewriteID();
	}
	
	//Add Bottom
	function addFasal()
	{	
		var selected = localStorage.getItem('selected_id_perlembagaan');
		var levelID = $('#'+(selected)).children().attr('id');
		var selectedFasalTxtShow;
		
		var levelIDShow = levelID.replace('level_','');
		
		localStorage['fasal_index'] = (parseInt((selected).replace('tr_', ''))+1);
		localStorage['level_id'] = levelIDShow;
		
		//get current fasal & plus one
		if(levelIDShow < 2){
			var selectedFasalTxt = $('#'+(selected)+' .fasal_label').html();;
			selectedFasalTxtShow = 'Fasal '+(parseInt((selectedFasalTxt).replace('Fasal ', ''))+1);
		}
		else
		{
			var selectedFasalTxt = $('#'+(selected)+' .sub_fasal_label').html();;
			selectedFasalTxtShow = selectedFasalTxt;
		}
		
		$('.inform').remove();
		$('#'+selected).append("<div class='inform' id='added_"+selected+"'><table><tr><td width='90px'><input type='text' id='no_fasal_"+(selected+1)+"_added' placeholder='"+selectedFasalTxtShow+"' disabled></input></td><td width='10px'>&nbsp;</td><td><input type='text' id='fasal_added_"+selected+"'></input></td><td width='90px'><div class='okIcon' id='search' onclick='addDisplay();'></div></td></tr></table></div>");
		$("div").qtip('hide');				
		
	

	
		$('.fasal_label').each(function() {
			var span_id = this.id;
			var span_value = $('#'+span_id).html();
			var addOne = parseInt(span_value.replace('Fasal ',''));
			
			if(addOne > selected.replace('tr_', ''))
			{
				var afterAdd = parseInt(addOne+1);
				var fasal_index = 'Fasal '+afterAdd;
				$('#'+span_id).html(fasal_index);	
			}

		});
		
		var zz = 1;
		var zzz = 1;
		
		$('.fasal_label').each(function() {
			var tr_id = this.id;
			var arr = tr_id.split('_');
			var tr_value =  $.trim("fasal_index_"+arr[2]);
			
			$('#'+tr_value).attr('id','xxxxx_'+zz);
			zz = parseInt(zz+1);

		});

		$('.fasal_label').each(function() {
			$('#xxxxx_'+zzz).attr('id','fasal_index_'+zzz);
			zzz = parseInt(zzz+1);
		});
	}
	
	//Edit Fasal
	function editFasal()
	{				
		var selected = localStorage.getItem('selected_id_perlembagaan');
		var IDselected = selected.replace('tr_', '');
		var levelID = $('#'+(selected)).children().attr('id');
		var levelIDShow = levelID.replace('level_','');
		
		//get current fasal 
		if(levelIDShow < 2){
			var selectedFasalTxt = $('#'+(selected)+' .fasal_label').html();;
			selectedFasalTxtShow = selectedFasalTxt;
		}
		else
		{
			var selectedFasalTxt = $('#'+(selected)+' .sub_fasal_label').html();;
			selectedFasalTxtShow = selectedFasalTxt;
		}
		
		$('.inform').remove();
		
		$('#'+selected).append("<div class='inform' id='added_"+selected+"'><table><tr><td width='90px'><input type='text' id='no_fasal_"+(selected)+"_added' placeholder='"+selectedFasalTxtShow+"' disabled></input></td><td width='10px'>&nbsp;</td><td><input type='text' id='fasal_added_"+selected+"' value='"+$('#fasal_index_'+IDselected+'_text').text()+"'></input></td><td width='90px'><div class='okIcon' id='search' onclick='editDisplay();'></div></td></tr></table></div>");
		$("div").qtip('hide');
		
		/*FASAL LABEL INDEX*/
		var dummyFasalLabelIndex = 1;
	}
	
	function editDisplay()
	{
		var id = localStorage.getItem('selected_id_perlembagaan');
		var IDselected = id.replace('tr_', '');
		/*On click display - check if null*/
		if($('#fasal_added_'+(id)).val() != "")
		{
			var editedFasalText = $('#fasal_added_'+id).val();
			$('#fasal_index_'+IDselected+'_text').text(editedFasalText);
		}
		
		$('#added_'+id).remove();

	}

	
	function addDisplay()
	{			
		/*FASAL LABEL INDEX*/
		var dummyFasalLabelIndex = 1;
	
		var id = localStorage.getItem('selected_id_perlembagaan');
		var thisID = id;
		var fasal_index = localStorage.getItem('fasal_index');
		var appendId = 'tr_'+(parseInt((id).replace('tr_', ''))+1);
		
		/*SET MARGIN FOR EACH FASAL LEVEL*/
		var loopForMarginLeftValue = localStorage.getItem('level_id');
		var label_class;
		var label_text;
		
		if(loopForMarginLeftValue > 1)
		{
			label_class = 'sub_fasal_label';
			label_text = 'PerPuluhan';
			
		}
		else
		{
			label_class = 'fasal_label';
			label_text = 'Fasal '+ fasal_index;
		}
		var marginLeftPX = 0;
		for(var x = 1; x < loopForMarginLeftValue ; x++)
		{
			marginLeftPX = parseInt(marginLeftPX+30);
		}

		/*On click display - check if null*/
		if($('#fasal_added_'+(id)).val() != "")
		{
			var editorImgSecondLvl = '<image class="openToolTip" id="'+appendId+'_img" style="margin-bottom:-7px;" src="img/pindaan-icon.png" width="25px" height="25px" >';
			var checkBoxSecondLvl = '<input class="checkboxClass" id="checkbox'+id+'" type="checkbox" name="senarai" value="Maklumat Sijil Pendaftaran Pertubuhan Belia" /><label/>';
			$('<div class="checkbox" id="new_added_'+appendId+'" style="margin-left:'+marginLeftPX+'px;" ><div width="30px" class="xx" id="level_'+loopForMarginLeftValue+'">'+editorImgSecondLvl+' '+checkBoxSecondLvl+'<label id="fasal_added_'+(id+1)+'" for="checkbox'+id+'"><span class="'+label_class+'" id="fasal_index_'+appendId+'">'+label_text+'</span> - <span class="fasal_label_text" id="fasal_index_'+appendId.replace('tr_', '')+'_text"> '+$('#fasal_added_'+(id)).val()+'</span></label></div></div>').insertAfter($('#'+id));				
		}
		
		$('#added_'+id).remove();
		
		/*Differentiate between <tr>*/
		$('.checkbox').each(function() {
			
			var tr_id = this.id;
			var tr_value =  $('#'+tr_id).attr('id');
			var trAddOne = parseInt(tr_value.replace('tr_',''));

			if(trAddOne > id.replace('tr_',''))
			{
				var trAfterAdd = parseInt(trAddOne+1);
				$('#'+tr_id).attr('id','tr_'+trAfterAdd);
			}
		});
		
		$('#new_added_'+appendId).attr('id',appendId);
		
		rewriteID();
	}
	
	function rewriteID()
	{
		/* Re-write <TR NO> */
		var index = 1;
		var indexx = 1;

		$('.checkbox').each(function() {
			var tr_id = this.id;
			var tr_value =  $('#'+tr_id).attr('id');
			$('#'+tr_value).attr('id','xx_'+index);

			index = parseInt(index+1);
		});
		
		var indexx = 1;
		$('.checkbox').each(function() {
			$('#xx_'+indexx).attr('id','tr_'+indexx);
			indexx = parseInt(indexx+1);
		});
	

		/* Re-write <FASAL LABEL NO/ID> */
		var indexFasal = 1;
		var indexFasalR = 1;

		$('.fasal_label').each(function() {
				
			var tr_id = this.id;
			var tr_value =  $('#'+tr_id).attr('id');

			var arr = tr_value.split('_');
			var label_text_no = $.trim(arr[2]);

			$('#'+tr_value).attr('id','xxx_'+indexFasal);
			$('#fasal_index_'+label_text_no+'_text').attr('id','tmp_'+indexFasal);

	
			indexFasal = parseInt(indexFasal+1);

		});

		$('.fasal_label').each(function() {
			$('#xxx_'+indexFasalR).attr('id','fasal_index_'+indexFasalR);
			$('#tmp_'+indexFasalR).attr('id','fasal_index_'+indexFasalR+'_text');

			$('#fasal_index_'+indexFasalR).html('Fasal '+' '+indexFasalR);
			
			indexFasalR = parseInt(indexFasalR+1);
		});

		/* Fasal Label Text */

		var indexFasalSS = 1;
		var indexFasalRSS = 1;

		$('.fasal_label_text').each(function() {
				
			var tr_id = this.id;
			var tr_value = tr_id.replace('tr_','')

			$('#'+tr_value).attr('id','tempxx_'+indexFasalSS);
	
			indexFasalSS = parseInt(indexFasalSS+1);

		});

		$('.fasal_label_text').each(function() {
			
			$('#tempxx_'+indexFasalRSS).attr('id','fasal_index_'+indexFasalRSS+'_text');			
			indexFasalRSS = parseInt(indexFasalRSS+1);

		});
		
		
		/* Re-write <Img ID> */
		var indexFasalXX = 1;
		var indexFasalRXX = 1;

		$('.openToolTip').each(function() {
			var tr_id = this.id;
			var arr = tr_id.split('_');
			var tr_value =  $.trim("tr_"+arr[1]);
			
			$('#'+tr_value+'_img').attr('id','xxx_'+indexFasalXX);
			indexFasalXX = parseInt(indexFasalXX+1);

		});

		$('.openToolTip').each(function() {
			$('#xxx_'+indexFasalRXX).attr('id','tr_'+indexFasalRXX+'_img');
			indexFasalRXX = parseInt(indexFasalRXX+1);
		});
	}

	function rewriteSubFasal(selected,prevID)
	{
		var idSelected = selected;
		var idPrev = prevID;

		/*Get current fasal text selected - plus one for switch with top*/
		var selectedFasalTxt = $('#'+(idSelected)+' .fasal_label').html();
		selectedFasalTxtShow = parseInt((selectedFasalTxt).replace('Fasal ', ''))-1;

		$('#'+(idSelected)+' .sub_fasal_label').each(function() {
			var tr_id = this.id;
			var currentSubFasal = $('#'+tr_id).html();
			
			var arr = currentSubFasal.split('.');
			var val =  $.trim(arr[0]);
			var newSubFasalMinus = '';
			for(var arrLength = 1; arrLength<arr.length; arrLength++)
			{
				newSubFasalMinus += '.'+$.trim(arr[arrLength]);

			}	

			$('#'+tr_id).html(selectedFasalTxtShow+''+newSubFasalMinus);
		});


		/*Get prev fasal text - add one for switch with bottom*/
		/* need to use level value to determine the no */
		//var prevFasalTxt = $('#'+(idPrev)+' .fasal_label').html();
		//prevFasalTxtShow = parseInt((prevFasalTxt).replace('Fasal ', ''))+1;

		var levelID = $('#'+(idPrev)).children().attr('id');
		levelIDShow = (levelID).replace('level_', '');


		$('#'+(idPrev)+' .sub_fasal_label').each(function() {
			var tr_id = this.id;
			var currentSubFasal = $('#'+tr_id).html();
			
			var arr = currentSubFasal.split('.');
			var val =  $.trim(arr[0]);
			var newSubFasalAdd = '';
			var prevFasalTxtShow = 0;

			for(var arrLength = levelIDShow; arrLength<arr.length; arrLength++)
			{
				newSubFasalAdd += '.'+$.trim(arr[arrLength]);
			}	
			for(var arrLengthNoChange = 0; arrLengthNoChange< levelIDShow; arrLengthNoChange++)
			{			
				prevFasalTxtShow = parseInt(arr[arrLengthNoChange])+1;
			}

			$('#'+tr_id).html(prevFasalTxtShow+''+newSubFasalAdd);
		});
	}

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
