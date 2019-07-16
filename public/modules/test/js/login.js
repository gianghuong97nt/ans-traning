/**
 * ****************************************************************************
 * LOGIN
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

$(document).ready(function() {	
	initialize();
	initEvents();
	initItem(_obj);
});

/**
 * initialize
 *
 * @author		:	DuyTP – 2017/06/09 - create
 * @return		:	null
 * @access		:	public
 * @see			:	init
 */
function initialize() {
	$("#email").focus();
	$('#email').val("");
}

/**
 * initEvents
 *
 * @author		:	DuyTP – 2017/06/09 - create
 * @authr		:
 * @return		:	null
 * @access		:	public
 * @see			:	init
 */
function initEvents() {
	//button login
	$(document).on('click','#btn_login',function(){
		login();
	});

	//enter key
	$(document).on('keydown','#email,#password,#btn_login',function (event) {
	   if(event.keyCode == 13){
		   $('#btn_login').trigger('click');
	   }
	});
}

/**
 * login
 * 
 * @author      :   DuyTP - 2017/05/09 - create
 * @params      :   null
 * @return      :   null
 * @access      :   public
 * @see         :   
 */
function login() {
	try {
		location.href = '/system/db001';
	} catch (e) {
		alert('search' + e.message);
	}
}