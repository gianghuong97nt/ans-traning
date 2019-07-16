/**
 * 
 * client master-M004
 *
 * @copyright       :   ANS
 * @author          :   VIETDT - 2019/06/04 - create
 * @author          :
 */
 var _obj = {
 	'client_cd'				: {'type': 'text', 'attr': {'maxlength': '8',   'class': 'required numeric'}}
 	, 'client_br_cd'			: {'type': 'text', 'attr': {'maxlength': '4',   'class': 'required numeric'}}
 	, 'client_nm'				: {'type': 'text', 'attr':   {'maxlength': '50',  'class': ''}}
 	, 'client_kn_nm'			: {'type': 'text', 'attr':   {'maxlength': '50',  'class': ''}}
 	, 'client_ab_nm'			: {'type': 'text', 'attr': 	 {'maxlength': '50',  'class': ''}}
 	, 'client_br_nm'			: {'type': 'text', 'attr':   {'maxlength': '50',  'class': ''}}
 	, 'client_br_kn_nm'			: {'type': 'text', 'attr':   {'maxlength': '50',  'class': ''}}
 	, 'client_br_ab_nm'			: {'type': 'text', 'attr':   {'maxlength': '30',  'class': ''}}
 	, 'client_div'				: {'type': 'select', 'attr': {'maxlength': '1',   'class': ''}}
 	, 'industrial_class_div'	: {'type': 'select', 'attr': {'maxlength': '1',   'class': ''}}
 	, 'client_class_div'		: {'type': 'select', 'attr': {'maxlength': '2',   'class': ''}}
 	, 'closing_date'			: {'type': 'select', 'attr': {'maxlength': '2',   'class': ''}}
 	, 'collenction_site'		: {'type': 'select', 'attr': {'maxlength': '2',   'class': ''}}
 	, 'collenction_date'		: {'type': 'select', 'attr': {'maxlength': '2',   'class': ''}}
 	, 'collenction_method_div'	: {'type': 'select', 'attr': {'maxlength': '2',   'class': ''}}
 	, 'bill_payable_amt'		: {'type': 'text', 'attr':   {'maxlength': '10',  'class': 'numeric'}}
 	, 'bill_payable_site'		: {'type': 'select', 'attr': {'maxlength': '2',   'class': ''}}
 	, 'zip'						: {'type': 'text', 'attr':   {'maxlength': '7',   'class': 'postal_code'}}
 	, 'adr1'					: {'type': 'text', 'attr':   {'maxlength': '100', 'class': ''}}
 	, 'adr2'					: {'type': 'text', 'attr':   {'maxlength': '100', 'class': ''}}
 	, 'section_nm'				: {'type': 'text', 'attr':   {'maxlength': '140', 'class': ''}}
 	, 'client_emp_nm'			: {'type': 'text', 'attr':   {'maxlength': '30',  'class': ''}}
 	, 'client_tel'				: {'type': 'text', 'attr':   {'maxlength': '20',  'class': ''}}
 	, 'client_fax'				: {'type': 'text', 'attr':   {'maxlength': '20',  'class': ''}}
 	, 'cost_pattern_cd'			: {'type': 'select', 'attr': {'maxlength': '3',   'class': ''}}
 	, 'report_kbn'				: {'type': 'text', 'attr':   {'maxlength': '3',   'class': ''}}
 	, 'remarks'					: {'type': 'textarea', 'attr':   {'maxlength': '200', 'class': ''}}
 	, 'company_cd'				: {'type': 'list',	'attr':{'typelist': 'checkbox','class':''}}
 };
 var _obj2 = {
 	'client_br_nm'			    : {'type': 'text', 'attr':   {'maxlength': '50',  'class': ''}}
 	, 'client_br_kn_nm'			: {'type': 'text', 'attr':   {'maxlength': '50',  'class': ''}}
 	, 'client_br_ab_nm'			: {'type': 'text', 'attr':   {'maxlength': '30',  'class': ''}}
 };
 var _mode =  0;
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
 * @author  :   VIETDT - 2019/06/04 - create
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
 * @author  :   VIETDT - 2019/06/04 - create
 * @author  :
 *
 */
 function initEvents() {
 	try {
		//btn list
		$(document).on('click', '#btn-list', function() {
			try {
				back();
			} catch (e) {
				alert('.btn-list' + e.message);
			}
		});
		//delete button
		$(document).on('click', '#btn-delete', function() {
			try {
				jMessage(3, function(r){
					if(r) {
						if (validate(_obj)) {
							if ($('.company_cd').is("input[type=checkbox]") && !$('.company_cd').is(":checked")) {
								$('.company_cd').errorStyle('必須入力です。');
							}else{
								del();
							}
						}}
					});
			} catch (e) {
				alert('#btn-delete' + e.message);
			}
		});
		//save button
		$(document).on('click', '#btn-save', function(e) {
			try {
				e.preventDefault();
				jMessage(1, function(r){
					if(r) {
						if (validate(_obj)) {
							if ($('.company_cd').is("input[type=checkbox]") && !$('.company_cd').is(":checked")) {
								$('.company_cd').errorStyle('必須入力です。');
							}else{
								save();
							}

						}}
					});
			} catch (e) {
				alert('#btn-save ' + e.message);
			}
		});
		//client_cd  refer data
		$(document).on('change','#client_cd',function(e){
			try{
				e.preventDefault();
				var client_cd = $("#client_cd").val();
				var client_br_cd = $("#client_br_cd").val();
				var data  	=	{
					'client_cd'	:	client_cd
					,	'client_br_cd'	: client_br_cd
				}
				if (client_cd!='') {
					refer_client(data,function(){
					});

				}
			}catch (e){
				alert('change #client_cd: ' + e.message);
			}
		});
		//client_br_cd  refer data
		$(document).on('change','#client_br_cd',function(e){
			try{
				e.preventDefault();
				var client_cd = $("#client_cd").val();
				var client_br_cd = $("#client_br_cd").val();
				var data  	=	{
					'client_cd'	:	client_cd
				,	'client_br_cd'	: client_br_cd
				}
				_mode =1;
				if (client_br_cd!='') {

					refer_client(data,function(){

						// $('#client_br_cd').focus();
						_mode = 0;
					});

				}
			}catch (e){
				alert('change #client_br_cd: ' + e.message);
			}
		});
		
	} catch (e) {
		alert('initEvents: ' + e.message);
	}

}


/**
 * save function
 *
 * @author        :   VIETDT - 2019/06/04 - create
 * @author        :
 */
 function save(){
 	try {
 		var data    =	getData(_obj);
 		var client_cd 	= $('#client_cd').val();
 		var client_br_cd= $('#client_br_cd').val();
 		var	allParams	=	{
 			'client_cd'		:	client_cd
 		,	'client_br_cd'	:	client_br_cd
 		};
 		$.ajax({
 			type: 'POST',
 			url: '/master/m004/save',
 			dataType: 'json',
 			loading: true,
 			data: JSON.stringify(data),
 			success: function (res) {
 				switch (res['status']) {
					// Success
					case '200':
					jMessage(2,function(){
						refer_client(allParams,function(){
 							$('#client_cd').focus();
 						});
					});
					break;
					// Data Validate
					case '201':
					jMessage(9,function(){
						// location.reload();
						refer_client(allParams,function(){
 							$('#client_cd').focus();
 						});
					});
					break;
					// SQL + PHP Exception
					case '202':
					jError(res['data'][0]['Message']);
					break;
					case '203':
					jError('Erorr');
					break;
					default:
					break;
				}
			}
		});
 	} catch (e) {
 		alert('Eror function save ' + e.message);
 	}
 }

/**
 * delete function
 *
 * @author        :    VIETDT - 2019/06/04 - create
 * @author        :
 */
 function del() {
 	try {
 		var data    =	getData(_obj);
 		var client_cd = $('#client_cd').val();
 		var client_br_cd = $('#client_br_cd').val();
 		var allParams = {
 			'client_cd'	:	client_cd
 		,	'client_br_cd' :	client_br_cd	
 		};
 		$.ajax({
 			type: 'POST',
 			url: '/master/m004/delete',
 			dataType: 'json',
 			loading: true,
 			data:  JSON.stringify(data),
 			success: function (res) {
 				switch (res['status']) {
 					case '200':
 					jMessage(4,function(){
 						refer_client(allParams,function(){
 							$('#company_cd').focus();
 						})
 					});
 					break;
 					case '201':
 					jMessage(9,function(){
 						$('#client_cd').focus();
 					});

 					break;
 					case '202':
 					jError(res['data'][0]['Message']);
 					break;
 					default:
 					break;
 				}
 			},
			// Ajax error
			error: function (res) {
			}
		});
 	} catch (e) {
 		alert('Eror function del ' + e.message);
 	}
 }

/**
 * function refer
 *
 * @author  :   ANS-ASIA VIETDT - 2019/06/04 - create
 * @author  :
 *
 */
 function refer_client(data,callback) {
 	try {
 		$.ajax({
 			type: 'POST',
 			url: '/master/m004/refer_client',
 			dataType: 'json',
 			// loading: true,
 			data: data,
 			async:false,
 			success: function (res) {

 				if (res.data[0][0]['client_cd'] !=''&&res.data[0][0]['client_cd'] != 0) {
 					var data = res.data[0][0];
 					fillData(data,_obj);
 					$('#htmlcompany_cd').html(res.company_cd);
 					var array_company	=	res.data[2];
					// $('.company_cd').each(function(){
					// 	for(var i = 0 ; i<array_company.length;i++){
					// 		var val =$(this).val();
					// 		if(val == array_company[i].company_cd){
					// 			$(this).prop('checked', true);
					// 		}
					// 	}
					// });
					// for(var i = 0 ; i<array_company.length;i++){
					// 	var company_cd =array_company[i].company_cd;
					// 	$('.company_cd[value='+company_cd+']').prop('checked', true);
					// }
					$('.company_cd').prop('checked',false);
					array_company.forEach(function(item, index, array) {
						$('.company_cd[value='+item.company_cd+']').prop('checked', true);
					});
					$('#registration_footer').html(res.createUpdate);

				}
				else {

					if(_mode == 0){
						clearData(_obj,['client_cd','client_br_cd']);
						$('#registration_footer').html(res.createUpdate);
					}else{
						clearData(_obj2);
					}
					
				}
				//
				$('.postal_code').trigger('blur');
				if(callback){
					callback();
				}
			},
			// Ajax error
			error: function (res) {
			}
		});
 	} catch (e) {
 		alert('Eror function del ' + e.message);
 	}
 }

/**
 * back function
 *
 * @author        :    VIETDT - 2019/06/04 - create
 * @author        :
 */
 function back() {

 	if (_is_from_search == '1') {
 		_back_data['search_flag'] = '1';
 		_back_data['message_search_condition'] = getHtmlCondition('#back-search-condition');
 		var objRefer = {
 			init_data: _back_data,
 			back_link: _back_data['back_link']
 		};
		//
		postParamToLink(_back_screen, 'detail', objRefer, _back_link);
	} else {
		location.href = '/master/m004l';
	}

}

/**
 * validate function
 *
 * @author        :    ANS-ASIA VIETDT - 2019/06/04 - create
 * @author        :
 */
 function validate() {
 	var _errors = 0;
 	if (!_validate($('.content'))) {
 		_errors++;
 	}
 	if (_errors > 0)
 		return false;

 	return true;
 }


