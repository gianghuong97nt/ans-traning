/**
 * TOSMAC PROJECT
 * user master-s001
 *
 * @copyright       :   ANS
 * @author          :   chinhnb - 2017/12/19 - create
 * @author          :
 */
 var _obj = {
 	'company_cd'		: {'type':'select' ,'attr': {'maxlength': '4' 	 , 'class': ''}}
 	, 'emp_cd'			: {'type':'text'   ,'attr': {'maxlength': '8' 	 , 'class': ''}}
 	, 'emp_nm'			: {'type': 'text'  ,'attr': {'maxlength': '20' 	 , 'class': ''}}
 	, 'emp_kn_nm'		: {'type': 'text'  ,'attr': {'maxlength': '30'	 , 'class': ''}}
 	, 'emp_ab_nm'		: {'type': 'text'  ,'attr': {'maxlength': '30'	 , 'class': ''}}
 	, 'emp_div'			: {'type':'select' ,'attr': {'maxlength': '2' 	 , 'class': ''}}
 	, 'section_cd'		: {'type': 'text'  ,'attr': {'maxlength': '10'	 , 'class': ''}}
 	, 'remarks'			: {'type': 'text'  ,'attr': {'maxlength': '100'	 , 'class': ''}}
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
 	referCompany();
 	$("#user_nm").focus();
 	try {
 		initItem(_obj);
 		if($('#mode').val() == 'U'){
 		}else{
 			$('#btn-delete').addClass('disable');
 		}

		// 
		//
		jTableFixedHeader();
	} catch (e) {
		alert('initialize: ' + e.message);
	}
}

/**
 * function initTrigger
 *
 * @author  :   chinhnb - 2017/12/18 - create
 * @author  :
 *
 */


/**
 * function initEvents
 *
 * @author  :   chinhnb - 2017/12/18 - create
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
		$(document).on('change', '#section_cd', function() {
			try {
				searchCD();
			} catch (e) {
				alert('Eror #btn-search ' + e.message);
			}
		});
		$(document).on('change', '#company_cd', function() {
			try {
				if(($("#company_cd").val() != '-1') && ($("#emp_cd").val() != '-1')) {
					referCompany();
				}
				// searchCD();
			} catch (e) {
				alert('Eror #btn-search ' + e.message);
			}
		});
		$(document).on('change', '#emp_cd', function() {
			try {
				if(($("#company_cd").val() != '-1') && ($("#emp_cd").val() != '-1')) {
					referCompany();
				}
				// searchCD();
			} catch (e) {
				alert('Eror #btn-search ' + e.message);
			}
		});
		//change m003l_id
		// $(document).on('change', '#m003l_id', function() {
		// 	try {
		// 		searchCD();
		// 	} catch (e) {
		// 		alert('Eror #btn-search ' + e.message);
		// 	}
		// });
	} catch (e) {
		alert('initEvents: ' + e.message);
	}
}

/**
 * search function
 *
 * @author        :    ANS-ASIA CHINHNB - 2017/12/18 - create
 * @author        :
 */
function del() {
    try {
        var data = {};
        data.company_cd = $("#company_cd").val();
        data.emp_cd 	= $('#emp_cd').val();
        //debugger;
        $.ajax({
            type: 'POST',
            url: '/master/m003/delete',
            dataType: 'json',
            loading: true,
            data: data,
            success: function (res) {
                switch (res['status']) {
                    case '200':
                        jMessage(4,function(){
                            window.location.href = "/master/m003";
                        });
                        break;
                    case '201':
                        jMessage(9,function(){
                            $('#company_cd').focus();
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
 * search function
 *
 * @author        :    ANS-ASIA CHINHNB - 2017/12/18 - create
 * @author        :
 */
 function back(){
 	if (_is_from_search == '1') {
 		_back_data['search_flag'] = '1';
 		_back_data['message_search_condition'] = getHtmlCondition('#back-search-condition');
 		var objRefer = {
 			init_data: _back_data,
 			back_link: _back_data['back_link']
 		};
 		
		postParamToLink(_back_screen, 'detail', objRefer, _back_link);
	} else {
		location.href = '/master/m003l';
	}
}
/**
 * search function
 *
 * @author        :    ANS-ASIA CHINHNB - 2017/12/18 - create
 * @author        :
 */
function referCompany() {
    try {
        var data = {};
        data.company_cd = $('#company_cd').val();
        data.emp_cd 	= $('#emp_cd').val();
        $.ajax({
            type: 'POST',
            url: '/master/m003/refer',
            dataType: 'json',
            // loading: true,
            data: data,
            success: function (res) {
                if (res.data[0][0]['company_cd'] != '' && res.data[0][0]['emp_cd'] != '') {
                    var data = res.data[0][0];
                    //
                    fillData(data,_obj);
                    $('#company_cd').attr('readonly', true);
                    $('#registration_footer').html(res.createUpdate);
                    $('#btn-delete').removeClass('disable');
                }else {
                    clearData(_obj,['company_cd','emp_cd']);
                    $('#btn-delete').addClass('disable');
                    $('#registration_footer').html(res.createUpdate);
                }
                //
                $('#mode').val(res.mode);
            }
        });
    } catch (e) {
        alert('Eror function save ' + e.message);
    }
}
/**
 * search function
 *
 * @author        :    ANS-ASIA CHINHNB - 2017/12/18 - create
 * @author        :
 */
function save(){
	try {
		var data = getData(_obj);
		console.log(data);
		$.ajax({
			type: 'POST',
			url: '/master/m003/save',
			dataType: 'json',
			loading: true,
			data: data,
			success: function (res) {
				switch (res['status']) {
					// Success
					case '200':
					jMessage(2,function(){
						referCompany();
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
 * search function
 *
 * @author        :    ANS-ASIA CHINHNB - 2017/12/18 - create
 * @author        :
 */
function searchCD(){
	try{
		var data = {};
		data.company_cd	=	$('#section_cd').val();
		//
		$.ajax({
			type: 'POST',
			url: '/master/m003l/searchCD',
			dataType: 'json',
			loading: true,
			data: data,
			success: function (res) {
				switch (res['status']) {
                    // Success
                    case '200':
                    $('#section_cd').val(res['data'][0].section_cd);
                    $('#display_company_nm').html(res['data'][0].section_nm);
                    break;
                    default:
                    break;
                }		
            },
		// Ajax error
		error: function (res) {
		}
	});
	}catch (e) {
		alert('#btn-search ' + e.message);
	}

}

/**
 * fnc_refer_link function
 *
 * @author        :    ANS-ASIA CHINHNB - 2017/12/18 - create
 * @author        :
 */
//  function fnc_refer_link(_user_id){
// 	try {
// 		var objRefer = {
// 			init_data : {
// 				'user_id' : _user_id
// 			},
// 			back_data : {
// 				'search_flag'				: '1'
// 			,	'message_search_condition'	: getHtmlCondition('.search-condition')
// 			,	'pageIndex'					: (($('.pagination:first li.active a').length > 0) ? $.trim($('.pagination:first li.active a').text()) : '1')
// 			},
// 			back_link : '/system/s001l',
// 			back_screen : __screen
// 		};
// 		postParamToLink('M003', 'detail', objRefer, '/master/m003');
// 	} catch (e) {
// 		alert('fnc_refer_link:' + e.message);
// 	}
// }

/**
 * validate function
 *
 * @author        :    ANS-ASIA CHINHNB - 2017/12/18 - create
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

// Fixed header
function jTableFixedHeader(){

	var _he = 0;
	var containerWrapTarget   = $('#result > .panel-heading'),
	scrolltableTarget     = $('.wmd-view-topscroll'),
	pagingTarget          = $('.w-pading-top > .w-pading-bottom');

	//
	$(".wmd-view-topscroll").scroll(function(){
		$(".wmd-view").scrollLeft($(".wmd-view-topscroll").scrollLeft());
	});

	$(".wmd-view").scroll(function(){
		$(".wmd-view-topscroll").scrollLeft($(".wmd-view").scrollLeft());
	});

	fixWidth();

	$(window).resize(function(){
		fixWidth();
	});

	function fixWidth() {
		var w = $('.wmd-view .table').outerWidth(true);
		if(w < 1144) {
			$('.scroll-div1').css({
				'overflow-x':'scroll',
				'display':'block',
			});
			_he = 157;
		} else {
			$('.scroll-div1').css({
				'overflow-x':'auto',
				'display':'none'
			});
			//
			_he = 139;
		}
		//
		$(".wmd-view-topscroll .scroll-div1").width(w);
	}
	//

	scrollFix();

	//
	if($('.header-menu').length > 0) {
		var offset = $('.header-menu').offset().top;
		var offsetTable = $('.fixed-header').offset().top;
		//alert(offset + '-' +offsetTable )
		if(offset > offsetTable)
		{
			$('.fixed-header thead tr th').css({
				'position':'relative',
				'background':'rgb(0, 103, 151)',
				'outline':'.5px solid #ddd',
				'z-index':'22',
				'top':((offset - offsetTable)+_he)+'px',
			});
			containerWrapTarget.css({
				'position':'relative',
				'background':'rgb(0, 103, 151)',
				'outline':'.5px solid #ddd',
				'z-index':'22',
				'top':((offset - offsetTable)+_he)+'px',
			});
			pagingTarget.css({
				'position':'relative',
				'background':'rgb(255, 255, 255)',
				//'outline':'.5px solid #ddd',
				'z-index':'22',
				'top':((offset - offsetTable)+_he)+'px',
			});
			scrolltableTarget.css({
				'position':'relative',
				'background':'rgb(0, 0, 0)',
				'z-index':'22',
				'top':((offset - offsetTable)+_he)+'px',
			});
		}
	}
	/**
 * search function
 *
 * @author        :    ANS-ASIA CHINHNB - 2017/12/18 - create
 * @author        :
 */
	function scrollFix() {
		$(window).scroll(function(){
			var offset = $('.page-content').offset().top;
			var offsetTable = $('.fixed-header').offset().top;
			var scrollTop = $(window).scrollTop();
			// alert((offsetTable - offset) + ' '+ scrollTop);
			// alert((scrollTop-(offsetTable - offset)));
			if(scrollTop > (offsetTable - offset-_he)) {
				if($('body').width() < 1253) {
					$('.fixed-header thead tr th').css({
						'position':'relative',
						'background':'rgb(0, 103, 151)',
						'z-index':'22',
						'outline':'.5px solid #ddd',
						'top':(scrollTop-(offsetTable - offset)+_he)+'px',
					});
					containerWrapTarget.css({
						'position':'relative',
						'background':'rgb(0, 103, 151)',
						'z-index':'22',
						'outline':'.5px solid #ddd',
						'top':(scrollTop-(offsetTable - offset)+_he)+'px',
					});
					pagingTarget.css({
						'position':'relative',
						'background':'rgb(255, 255, 255)',
						'z-index':'22',
						//'outline':'.5px solid #ddd',
						'top':(scrollTop-(offsetTable - offset)+_he)+'px',
					});
					scrolltableTarget.css({
						'position':'relative',
						'z-index':'22',
						'top':(scrollTop-(offsetTable - offset)+_he)+'px',
					});
				} else {
					$('.fixed-header thead tr th').css({
						'position':'relative',
						'background':'rgb(0, 103, 151)',
						'outline':'.5px solid #ddd',
						'z-index':'22',
						'top':(scrollTop-(offsetTable - offset)+_he)+'px',
					});
					containerWrapTarget.css({
						'position':'relative',
						'background':'rgb(0, 103, 151)',
						'outline':'.5px solid #ddd',
						'z-index':'22',
						'top':(scrollTop-(offsetTable - offset)+_he)+'px',
					});
					pagingTarget.css({
						'position':'relative',
						'background':'rgb(255, 255, 255)',
						//'outline':'.5px solid #ddd',
						'z-index':'22',
						'top':(scrollTop-(offsetTable - offset)+_he)+'px',
					});
					scrolltableTarget.css({
						'position':'relative',
						'z-index':'22',
						'top':(scrollTop-(offsetTable - offset)+_he)+'px',
					});
				}
			} else {
				$('.fixed-header thead tr th').css({
					'position':'relative',
					'top':(0)+'px'
				});
				containerWrapTarget.css({
					'position':'relative',
					'top':(0)+'px'
				});
				pagingTarget.css({
					'position':'relative',
					'top':(0)+'px'
				});
				scrolltableTarget.css({
					'position':'relative',
					'top':(0)+'px'
				});
			}
		})
	}
	

}