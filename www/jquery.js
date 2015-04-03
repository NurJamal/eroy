var nama_pertubuhan = JSON.parse(localStorage['NAMA PERTUBUHAN']);
	
	var kod_pertubuhan = JSON.parse(localStorage['CARIAN_KOD_PERTUBUHAN']);
	
	//var data = kod_pertubuhan.lk_carian;
	
	//$.each(data.split('kod_'), function (index, value) 
	//{
		$(function() 
		{
			$.ajax
			(
				{
					type: "GET",
					url:"http://eroy.me-tech.com.my/api/api_carian_papar.php",
					dataType: "xml",
					success: function(xml)
					{
						var xmlDoc = $.parseXML(xml),
						$xml = $(xmlDoc);
						$(xml).find("lk_carian").each(function()
						{						
							var kod_id = $(this).find("kod_nama_pertubuhan");
							var npertubuhan = $(this).find("nama_pertubuhan");
							var alamat_urusan = $(this).find("alamat1");
							var alamat_urusan1 = $(this).find("alamat2");
							var alamat_urusan2 = $(this).find("alamat3");
							var alamat_pos = $(this).find("alamat_pos1");
							var alamat_pos1 = $(this).find("alamat_pos2");
							var alamat_pos2 = $(this).find("alamat_pos3");
							
							console.log($(this).text());						
							
							$('#nama_pertubuhan').append($(npertubuhan).text()+'<br/>');
							$('#alamat_urusan').append($(alamat_urusan).text()+' '+$(alamat_urusan1).text()+
							' '+$(alamat_urusan2).text()+'<br/>');
							$('#alamat_pos').append($(alamat_pos).text()+' '+$(alamat_pos1).text()+' '
							+$(alamat_pos2).text()+'<br/>');
						});
					},
					error: function() 
					{
						console.log("An error occurred while processing XML file.");
					}
				}
			);

		});
	//});