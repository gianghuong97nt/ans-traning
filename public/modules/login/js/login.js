/**
 * TOSMAC PROJECT
 *
 * @copyright       :   ANS
 * @author          :   chinhnb - 2017/12/04 - create
 * @author          :
*/
var _obj = {
	  'user_id'		: {'type': 'text', 'attr': {'maxlength': '12',  'class': ''	, 'tabindex': '1'}}
	, 'password'		: {'type': 'text', 'attr': {'maxlength': '12',  'class': ''	, 'tabindex': '2'}}
	, 'remember_me'	: {'type': 'checkbox', 'attr': {'maxlength': '',  'class': ''	, 'tabindex': '3'}}
	
};

$(document).ready(function () {
	try {
		initialize();
		initEvents();
	} catch (e) {
		alert('ready: ' + e.message);
	}

});

function initialize() {
	try {
		initItem(_obj);
	} catch (e) {
		alert('initialize: ' + e.message);
	}
}

function initEvents() {
	try {
		$('body').keypress(function(e){
				if (e.keyCode == 13)
			{
  				if (validate(_obj)) {
					login();
				}
			}
		});
		$(document).on('click', '#btn_login', function() {
			try {
				if (validate(_obj)) {
					login();
				}
			} catch (e) {
				alert('.btn_login' + e.message);
			}
		});

	} catch (e) {
		alert('initEvents: ' + e.message);
	}

}

function validate() {
	var _errors = 0;
	if (!_validate($('body'))) {
		_errors++;
	}

	if (_errors > 0)
		return false;

	return true;
}

function login(){
	try {
		$arr =window.location.href.split('/');
		$path = $arr[$arr.length-1];
		var data = getData(_obj);
		data['upd_prg']=$path;
		$.ajax({
			type: 'POST',
			url: '/login',
			dataType: 'json',
			loading: true,
			data: data,
			success: function (res) {
				switch (res['status']) {
					// Success
					case '200':
						location.href='/system/db001';
						break;
					// Data Validate
					case '201':
						if (typeof res['data'][0] != 'undefined') {
							$('.login-input').addClass('required');
							login_error();
						}
						break;
					// SQL + PHP Exception
					case '202':
						$('.login-input').addClass('required');
						login_error();
						break;
					case '203':
						$('.login-input').addClass('required');
						login_error();
						break;
					default:
						break;
				}
			}
		});
	} catch (e) {
		alert('login:' + e.message);
	}
}
//tooltip login error
function login_error(element) {
    if (!element) {
        element = $('body');
    }
    var error = 0;
    try {
        _clearErrors();
        element.find('.login-input:enabled:not([readonly])').each(function () {
            $(this).errorStyle('IDとパスワードを確認してください。');
            error++;
        });

    } catch (e) {
        alert('_validate: ' + e.toString());
    }
    if (error > 0) {
        return false;
    } else {
        return true;
    }
}
