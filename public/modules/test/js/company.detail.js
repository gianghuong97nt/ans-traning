/**
 * ****************************************************************************
 * COMPANY
 *
 * 処理概要		:	
 * 作成日		:	2017/06/09
 * 作成者		:	DuyTP
 *
 * 更新日		:
 * 更新者		:
 * 更新内容		:
 *
 * @package		:	TEST
 * @copyright	:	Copyright (c) ANS
 * @version		:	1.0.0
 * ****************************************************************************
 */

$(document).ready(function () {
	initEvents();
});


/**
 * init Events
 * @author  :   DuyTP - 2017/06/09 - create
 * @param
 * @return
 */
function initEvents() {
	try {

		//init back
		$(document).on('click', '#btn-back', function () {
			location.href = '/test/search';
		});

 
	} catch (e) {
		alert('initEvents: ' + e.message);
	}
}

