/**
 * TOSMAC PROJECT
 * user master-s001
 *
 * @copyright       :   ANS
 * @author          :   chinhnb - 2017/12/19 - create
 * @author          :
*/
var _obj = {
	  'user_id_fr'		: {'type': 'text', 'attr': {'maxlength': '8'	 , 'class': ''}}
	, 'user_id_to'		: {'type': 'text', 'attr': {'maxlength': '8'	 , 'class': ''}}
	, 'user_nm'			: {'type': 'text', 'attr': {'maxlength': '30'	 , 'class': ''}}
	, 'user_div'		: {'type': 'text', 'attr': {'maxlength': '8'	 , 'class': ''}}
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
	try {
		initItem(_obj);
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
				var referrer = document.referrer;
				//
				if (referrer.indexOf("s001") >= 0){
					fnc_refer_link(0,0);
				}else{
					window.location.href = '/system/db001';
				}
			} catch (e) {
				alert('.btn-back' + e.message);
			}
		});
		//btn link_section
		$(document).on('click', '.link_section', function () {
			try{
				var user_id     = $(this).attr('user_id');
				//
				fnc_refer_link(user_id);
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

	} catch (e) {
		alert('initialize: ' + e.message);
	}
}

/**
 * search function
 *
 * @author        :    ANS-ASIA CHINHNB - 2017/12/18 - create
 * @author        :
 */
function search(_page){
	try{
		var data = {};
		var pageSize = 50;
		//
		data['user_id_fr']		= $('#user_id_fr').val();
		data['user_id_to']		= $('#user_id_to').val();
		data['user_nm']			= $('#user_nm').val();
		data['user_div']		= $('#user_div').val();
		data['page_size']		= pageSize;
		data['page']			= _page;
		//
		$.ajax({
		type: 'POST',
		url: '/system/s001l/search',
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

/**
 * fnc_refer_link function
 *
 * @author        :    ANS-ASIA CHINHNB - 2017/12/18 - create
 * @author        :
 */
function fnc_refer_link(_user_id){
	try {
		var objRefer = {
			init_data : {
				'user_id' : _user_id
			},
			back_data : {
				'search_flag'				: '1'
			,	'message_search_condition'	: getHtmlCondition('.search-condition')
			,	'pageIndex'					: (($('.pagination:first li.active a').length > 0) ? $.trim($('.pagination:first li.active a').text()) : '1')
			},
			back_link : '/system/s001l',
			back_screen : __screen
		};
		postParamToLink('S001', 'detail', objRefer, '/system/s001');
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