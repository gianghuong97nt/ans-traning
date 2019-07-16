$(document).ready(function(){
	initControls();

	$(document).on('click','#btn-export',function(e) {

		exportExcel();

	});

});

/**
 * validate
 *
 * @author		:
 * @params		:	null
 * @return		:	null
 */
function exportExcel()
{
	try {
		var data = {};
		//
		$.ajax({
			type: 'POST',
			loading:true,
			url: '/export/exampleexcel',
			dataType: 'json',
			data: data,
			success: function (res) {
				switch (res['status']){
					// Success
					case 200:
						location.href = '/export/excel/download?real_filename='+res['filename']+'&filename='+res['download_filename'];
						break;
					case 203:
						jError(_text[11]);
						break;
					default:
				}
			},
			// Ajax error
			error: function (res) {
			}
		});
	} catch (e) {
		alert('search' + e.message);
	}
}
