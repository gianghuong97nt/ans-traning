/**
 * TOSMAC PROJECT
 * user master-s001
 *
 * @copyright       :   ANS
 * @author          :   chinhnb - 2017/12/19 - create
 * @author          :
 */
 var _obj = {
 	'company_cd'					: {'type':'select' ,'attr': {'maxlength': '4' 	 , 'class': ''}}
 	, 'sales_recorded_date'			: {'type':'text'   ,'attr': {'maxlength': '7' 	 , 'class': ''}}
 	, 'section_nm'					: {'type':'text'   ,'attr': {'maxlength': '30' 	 , 'class': 'required'}}
 	, 'emp_nm'						: {'type':'text'   ,'attr': {'maxlength': '30'	 , 'class': 'required'}}
 	
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
 	$("#sales_recorded_date").focus();
 	try {
 		initItem(_obj);
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
		$(document).on('click', '#btn-csv2', function() {
			try {
				if(_validate()){
                jMessage(1, function(r){
                    if(r) {
                        exportL007();
                    }
                });
            }
			} catch (e) {
				alert('.btn-list' + e.message);
			}
		});
	} catch (e) {
		alert('initEvents: ' + e.message);
	}
}

//export excel
function exportL007()
{
    try {
        var data = {};
        data.company_cd = $('#company_cd').val();
        data.sales_recorded_date = $('#sales_recorded_date').val();
        if($('#sales_recorded_date').val() != ''){
            data.sales_recorded_date = $('#sales_recorded_date').val() + '/01';
        }
        data.section_nm = $('#section_nm').val();
        data.emp_nm = $('#emp_nm').val();
        $.ajax({
            type: 'POST',
            loading:true,
            url: '/export/exportL007',
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
 * search function
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