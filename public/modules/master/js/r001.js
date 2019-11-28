/**
 * 
 * R001 repost-excel
 *
 * @copyright       :   ANS
 * @author          :   VIETDT - 2019/09/06 - create
 * @author          :
 */
 var _obj = {
 	  'company_cd'			: {'type': 'text', 'attr':  {'maxlength': '4',   'class': 'numeric'}}
 	, 'project_no'			: {'type': 'text', 'attr': 	{'maxlength': '8',   'class': 'numeric'}}
 	, 'project_dtl_no'		: {'type': 'text', 'attr':  {'maxlength': '4',  'class': 'numeric'}}
 	, 'detail_type_div'		: {'type': 'select', 'attr':{'maxlength': '2',   'class': ''}}
 };
 $(document).ready(function () {
 	try {
 		initialize();
 		initEvents();
 	} catch (e) {
 		alert('ready: ' + e.message);
 	}
 });
/**
 * function initialize
 *
 * @author  :   VIETDT - 2019/09/06 - create
 * @author  :
 *
 */
 function initialize() {
 	try {
 		initItem(_obj);
 	} catch (e) {
 		alert('initialize: ' + e.message);
 	}
 }
/**
 * function initEvents
 *
 * @author  :  VIETDT - 2019/09/06 - create
 * @author  :
 *
 */
 function initEvents() {
 	try {
		//btn-excel
		$(document).on('click', '#btn-excel', function(e) {
			try {
				jMessage(5, function(r){
                    if (r) {
						ExportExcel()
                    }
                });
			} catch (e) {
				alert('#btn-excel' + e.message);
			}
		});
		 $(document).on('change', '#project_no', function (e) {
            try {
                e.preventDefault();
                var project_no = $(this).val();
                var company_cd = $('#company_cd').val();
                var data = {
                    'company_cd' : company_cd
                    ,    'project_no' : project_no
                };
      
                    refer_project(data);
       
            } catch (e) {
                alert('change project_no' + e.message);
            }
        });
		
	} catch (e) {
		alert('initEvents: ' + e.message);
	}
}
/**
 *  function export excel R001
 *
 * @author  :   VIETDT - 2019/09/06 - create
 *
 */
function ExportExcel()
{
    try {
        var data = getData(_obj);
        $.ajax({
            type: 'POST',
            loading:true,
            url: '/export/exportR001',
            dataType: 'json',
            data: data,
            success: function (res) {
                switch (res['status']){
                    // Success
                    case 200:
                        location.href = '/export/excel/download?real_filename='+res['filename']+'&filename='+encodeURI(res['download_filename']);
                        break;
                    case 203:
                        jError(_text[11]);
                        break;
                    default:
                        jError(_text[36]);
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
/**
 * function refer_project
 *
 * @author  :   VIETDT - 2019/07/25 - create
 * @author  :
 *
 */
 function refer_project(data) {
    try{
        $.ajax({
            type: 'POST',
            url: '/master/r001/referProject',
            dataType: 'html',
            data: data,
            async:true,
            success: function (res) {
                $("#project_dtl_no").empty();
                $("#project_dtl_no").append(res);
            },
            // Ajax error
            error: function (res) {
            }
        });
    }catch (e) {
        alert('refer_project ' + e.message);
    }
}