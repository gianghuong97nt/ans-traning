/**
 * TOSMAC PROJECT
 * user master-s001
 *
 * @copyright       :   ANS
 * @author          :   chinhnb - 2017/12/19 - create
 * @author          :
*/
var _obj = {
	  'employee_id'		: {'type': 'select','attr': {'maxlength': '8'	 , 'class': ''}}
	, 'employee_nm'		: {'type': 'text', 	'attr': {'maxlength': '25'	 , 'class': ''}}
	, 'employee_type'	: {'type': 'select','attr': {'maxlength': '30'	 , 'class': ''}}
	, 'company_cd'		: {'type': 'text', 	'attr': {'maxlength': '8'	 , 'class': ''}}
};
$(document).ready(function () {
	try {
		initialize();
		initEvents();
		initTrigger();
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
	$("#emp_nm").focus();
	try {
		initItem(_obj);
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
function initTrigger() {
	try {
		if ($('#searchFlag').val() == '1') {
			var _page = 1 * $('#oldPageIndex').val();
			search(_page);
		}
	} catch (e) {
		alert('iniTrigger' + e.message);
	}
}

/**
 * function initEvents
 *
 * @author  :   chinhnb - 2017/12/18 - create
 * @author  :
 *
 */
function initEvents() {
	try {
		//btn back
		$(document).on('click', '#btn-back', function() {
			try {
				// var referrer = document.referrer;
				// //
				// if (referrer.indexOf("s001") >= 0){
				// 	fnc_refer_link(0,0);
				// }else{
					window.location.href = '/master/m003';
				// }
			} catch (e) {
				alert('.btn-back' + e.message);
			}
		});
		//btn link_section
		$(document).on('click', '.link_section', function () {
			try{
				var company_cd   = $(this).attr('company_cd');
				var emp_cd  	 = $(this).attr('emp_cd');
			
				var employee =	{
					'company_cd'		: company_cd 
				,	'emp_cd'			: emp_cd 
				// ,	'mode'				: mode
				};
				fnc_refer_link(employee);
			} catch (e) {
				alert('link_section:' + e.message);
			}
		});
		//btn search
		$(document).on('click', '#btn-search', function() {
			try {
				if (validate(_obj)) {
					search(1);
				}
			} catch (e) {
				alert('Eror #btn-search ' + e.message);
			}
		});
		$(document).on('change', '#section_cd', function() {
			try {
				searchCD();
			} catch (e) {
				alert('Eror #btn-search ' + e.message);
			}
		});

		// pagging click event
		$(document).on('click', '.pagination-location li a', function () {
			try {
				var page = $(this).attr('page');
				if (validate(_obj)) {
					search(parseInt(page, 10));
				}
			} catch (e) {
				alert('.pagination li' + e.message);
			}
		});
		//edit click even

	} catch (e) {
		alert('initialize: ' + e.message);
	}
}

/**
 * search function
 *
 * @author        :    ANS-ASIA  - 2017/12/18 - create
 * @author        :
 */
function search(_page){
	try{
		var data = {};
		var pageSize = 50;
		//
		data['company_cd']		= $('#company_cd').val();
		data['emp_nm']			= $('#emp_nm').val();
		data['emp_div']			= $('#emp_div').val();
		data['section_cd']		= $('#section_cd').val();
		data['page_size']		= pageSize;
		data['page']			= _page;
		//
		console.log(data);
		$.ajax({
		type: 'POST',
		url: '/master/m003l/search',
		dataType: 'html',
		loading: true,
		data: data,
		success: function (res) {
			$("#result").empty();
			$("#result").append(res);
			//
			jTableFixedHeader();
		},
		// Ajax error
		error: function (res) {
		}
	});
	}catch (e) {
		alert('#btn-search ' + e.message);
	}

}
function searchCD(){
	try{
		var data = {};
		data.section_cd	=	$('#section_cd').val();
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
                     	$('#display_section_nm').html(res['data'][0].section_nm);
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
 * @author        :    ANS-ASIA  - 2017/12/18 - create
 * @author        :
 */
function fnc_refer_link(employee){
	try {
		var objRefer = {
			init_data : employee
			,
			back_data : {
				'search_flag'				: '1'
			,	'message_search_condition'	: getHtmlCondition('.search-condition')
			,	'pageIndex'					: (($('.pagination:first li.active a').length > 0) ? $.trim($('.pagination:first li.active a').text()) : '1')
			},
			back_link : '/master/m003l',
			back_screen : __screen
		};
		postParamToLink('M003', 'detail', objRefer, '/master/m003');
	} catch (e) {
		alert('fnc_refer_link:' + e.message);
	}
}

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