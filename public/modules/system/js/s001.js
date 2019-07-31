/**
 * TOSMAC PROJECT
 * user master-s001
 *
 * @copyright       :   ANS
 * @author          :   chinhnb - 2017/12/19 - create
 * @author          :
*/
 var _obj = {
	  'user_id'			: {'type': 'text', 'attr': {'maxlength': '8',   'class': 'required'				, 'tabindex': '1'}}
	, 'company_cd'		: {'type': 'text', 'attr': {'maxlength': '4',   'class': 'required numeric'	, 'tabindex': '2'}}
	, 'emp_cd'			: {'type': 'text', 'attr': {'maxlength': '8',   'class': 'required numeric'	, 'tabindex': '3'}}
	, 'password'			: {'type': 'text', 'attr': {'maxlength': '10',  'class': 'required'				, 'tabindex': '5'}}
	, 'user_nm'			: {'type': 'text', 'attr': {'maxlength': '30',  'class': ''						, 'tabindex': '7'}}
	, 'user_kn_nm'		: {'type': 'text', 'attr': {'maxlength': '30',  'class': ''						, 'tabindex': '8'}}
	, 'user_ab_nm'		: {'type': 'text', 'attr': {'maxlength': '20',  'class': ''						, 'tabindex': '9'}}
	, 'last_login_date'	: {'type': 'text', 'attr': {'maxlength': '30',  'class': ''						, 'tabindex': ''}}
	, 'user_div'			: {'type': 'select', 'attr': {'maxlength': '1',   'class': 'required'			, 'tabindex': '10'}}
	, 'remarks'			: {'type': 'text', 'attr': {'maxlength': '100', 'class': ''						, 'tabindex': '11'}}
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
 * @author  :   chinhnb - 2017/12/18 - create
 * @author  :
 *
 */
function initialize() {
	try {
		initItem(_obj);
		if ($('#emp_cd').val()!='') {
			$('#emp_cd').trigger('change');
		}
		if ($('#user_id').val()=='') {
			$('#btn-delete').addClass('disable');
		}
		if ($('#user_id').val()!='') {
			$('#user_id').trigger('change');
			$('#user_id').prop('readonly',true);
			$('#company_cd').focus();
		}
		else{
			$('#user_id').focus();
		}
		//auto refer katakana
		$.fn.autoKana('#user_nm', '#user_kn_nm', {
			katakana: true  //true：カタカナ、false：ひらがな（デフォルト）
		});
	} catch (e) {
		alert('initialize: ' + e.message);
	}
}
/**
 * function initEvents
 *
 * @author  :   chinhnb - 2017/12/19 - create
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
							del();
						}
					}
				});
			} catch (e) {
				alert('.btn-delete' + e.message);
			}
		});
		//save button
		$(document).on('click', '#btn-save', function() {
			try {
				jMessage(1, function(r){
					if(r) {
						if (validate(_obj)) {
							save();
						}
					}
				});
			} catch (e) {
				alert('#btn-save ' + e.message);
			}
		});
		//user_id  refer data
		$(document).on('change','#user_id',function(){
			try{
				var user_id = $("#user_id").val();
				if (user_id!='') {
					refer_user(user_id,function(){
						$('#company_cd').focus();
					});

				}
			}catch (e){
				alert('change user_id: ' + e.message);
			}
		});
	} catch (e) {
		alert('initEvents: ' + e.message);
	}
}

/**
 * save function
 *
 * @author        :    ANS-CHINHNB - 2017/12/11 - create
 * @author        :
 */
function save(){
	try {
		var data = getData(_obj);
		var user_id = $('#user_id').val();
		$.ajax({
			type: 'POST',
			url: '/system/s001/save',
			dataType: 'json',
			loading: true,
			data: data,
			success: function (res) {
				switch (res['status']) {
					// Success
					case '200':
						jMessage(2,function(){
							refer_user(user_id,function(){
								$('#company_cd').focus();
							});

							// $('#registration_footer').html(res['createUpdate']);
							// $('#emp_cd').focus();
							$('#user_id').attr('readonly',true);
						});
						break;
					// Data Validate
					case '201':
						if (typeof res['data'] != 'undefined') {
							_showError(res['data']);
						}
						// if (res['data'][0]['Code'] == 34) {
						// 	jMessage(34,function(){
						// 		$('#user_id').focus();
						// 	});
						// }else{
						// 	jMessage(9,function(){
						// 		$('#user_id').focus();
						// 	});
						// }
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
 * @author        :    ANS-ASIA CHINHNB - 2017/12/11 - create
 * @author        :
 */
function del() {
	try {
		var data = {};
		var user_id = $("#user_id").val();
		data.user_id = user_id;
		//debugger;
		$.ajax({
			type: 'POST',
			url: '/system/s001/delete',
			dataType: 'json',
			loading: true,
			data: data,
			success: function (res) {
				switch (res['status']) {
					case '200':
							jMessage(4,function(){
								 location.href = "/system/s001";
							});
						break;
					case '201':
						jMessage(9,function(){
							$('#user_id').focus();
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
 * @author  :   ANS-ASIA CHINHNB - 2017/12/13 - create
 * @author  :
 *
 */
function refer_user(_user_id, callback) {
	try {
		var data = {};
		data['user_id'] = _user_id;
		//
		$.ajax({
			type: 'POST',
			url: '/system/s001/refer_user',
			dataType: 'json',
			loading: true,
			data: data,
			success: function (res) {
				if (res.data[0][0]['user_id'] != '' && res.data[0][0]['emp_cd'] != '') {
					var data = res.data[0][0];
					//
					fillData(data,_obj);
					$('#display_emp_nm').text(res.data[0][0]['emp_nm']);
					$('#display_company_nm').text(res.data[0][0]['company_nm']);
					$('#registration_footer').html(res.createUpdate);
					$('#btn-delete').removeClass('disable');
				}else {
					clearData(_obj,['user_id']);
					//`
					$('#display_emp_nm').text('');
					$('#display_company_nm').text('');
					$('#btn-delete').addClass('disable');
					$('#registration_footer').html(res.createUpdate);
				}
				//
				$('#mode').val(res.mode);
				if (callback != undefined) {
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
 * @author        :    ANS-CHINHNB - 2017/12/19 - create
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
		location.href = '/system/s001l';
	}

}

/**
 * validate function
 *
 * @author        :    ANS-ASIA CHINHNB - 2017/12/19 - create
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


