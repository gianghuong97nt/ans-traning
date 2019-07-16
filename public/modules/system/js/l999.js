/**
 * TOSMAC PROJECT
 *  Screen - L999
 *
 * @copyright       :   ANS-ASIA
 * @author          :   tuantv - 2017/12/21 - create
 * @author          :
 */
var _obj = {
	  'prs_date_fr'			: {'type': 'tel', 'attr': {'maxlength': '10'	 , 'class': '', 'tabindex':'1'}}
	, 'prs_date_to'			: {'type': 'tel', 'attr': {'maxlength': '10'	 , 'class': '', 'tabindex':'2'}}
	, 'user_nm'			    : {'type': 'text', 'attr': {'maxlength': '30'	 , 'class': '', 'tabindex':'3'}}
	, 'prs_prg_nm'			: {'type': 'text', 'attr': {'maxlength': '50'	 , 'class': '', 'tabindex':'4'}}
	, 'prs_result'	    	: {'type': 'select', 'attr': {'maxlength': '2'	 , 'class': '', 'tabindex':'5'}}
};
$(document).ready(function () {
	try {
		initialize();
		initItem(_obj);
		initEvents();
		initTrigger();
	} catch (e) {
		alert('ready: ' + e.message);
	}
});

function initialize() {
	try {
		//retabindex();
		jTableFixedHeader();
	} catch (e) {
		alert('initialize: ' + e.message);
	}
}
function initTrigger() {
	try {
		if($('#searchFlag').val()=='1'){
			//
			var flag = $('#table-area').find('.searchDate').attr("flag");
			search($("#oldPageIndex").val(),flag,0);
		}
	} catch (e) {
		alert('iniTrigger' + e.message);
	}
}
function initEvents() {
	try {
		//$(".searchDate").cli
		$(document).on('click', '.searchDate', function() {
			try {
				var page = 1*$('.pagination-location li.active a').attr('page');
				var flag = $(this).attr("flag");
				//
				if(flag =='DESC'){
					search(page,'ASC',1);
				}else{
					search(page,'DESC',1);
				}
				//

			} catch (e) {
				alert('searchDate : ' + e.message);
			}
		});

		$(document).on('click', '.pagination-location li a', function () {
			try {
				var page = 1*$(this).attr('page');
				var flag = $('#table-area').find('.searchDate').attr("flag");
				//
				search(page,flag,0);
			} catch (e) {
				alert('.pagination li' + e.message);
			}
		});

		$(document).on('click', '#btn-search', function(e) {
			try {
				e.preventDefault();
				var flag = $('#table-area').find('.searchDate').attr("flag");
				//
				search(1,flag,0);
				//
			} catch (e) {
				alert('Eror #btn-search ' + e.message);
			}
		});

	} catch (e) {
		alert('initialize: ' + e.message);
	}
}

/**
 * search
 *
 * @author  :   tuantv - 2017/12/21- create
 * @author  :
 *
 */
function search(page,flag,option){
	var data = {};
	data = getData(_obj);
	var pageSize = 50;
	data['page_size'] = pageSize;
	data['page'] = page;
	data['flag'] = flag;
	//debugger;
	$.ajax({
		type: 'POST',
		url: '/system/l999/search',
		dataType: 'html',
		loading: true,
		data: data,
		success: function (res) {
			$("#result").empty();
			$("#result").append(res);
			tabIndex();
			jTableFixedHeader();
			//
		},
		// Ajax error
		error: function (res) {
		}
	});
}

/**
 * reset tabindex
 *
 * @author  :   tuantv - 2017/12/21- create
 * @author  :
 *
 */
function tabIndex(){
	$(".tabId ul").attr("tabindex","6");
	$(".searchDate").attr("tabindex","7");
	$(".tabIdFooter").attr("tabindex","8");

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