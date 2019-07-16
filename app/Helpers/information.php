<?php
	/**
	*-------------------------------------------------------------------------*
	* Souei
	* Helpers button
	*
	* 処理概要/process overview  :
	* 作成日/create date		 :   2016/10/28
	* 作成者/creater			 :   vuongvt – vuongvt@ans-asia.com
	*
	* @package				  :   MASTER
	* @copyright				:   Copyright (c) ANS-ASIA
	* @version				  :   1.0.0
	*-------------------------------------------------------------------------*
	* DESCRIPTION
	*
	*
	*
	*
	*/
namespace App\Helpers;
use Form,Lang;
class Information {

	//register button
	protected static $information_val = array(
		'registation_info'								=>		array('id'=>'registation_info',						'class'=>'btn','label_type'=>'登録:','label_userid'=>'userID：','label_name'=>'username','label_time'=>'time'),
		'update_info'								=>		array('id'=>'update_info',						'class'=>'btn','label_type'=>'更新:','label_userid'=>'userID：','label_name'=>'username','label_time'=>'time'),
	);
	/**
	* show button right
	* -----------------------------------------------
	* @author	  :   vuongvt	 - 2016/06/28 - create
	* @updater	 :   vulq - 2016/10/04 
	* @param	   :   null
	* @return	  :   null
	* @access	  :   public
	* @see		 :   remark
	*/
	public static function information_right(array $array) {


		echo '<ul class="nav navbar-nav bot-info" style="float:right">';
		foreach ($array as $key => $value) {
			if(array_key_exists($value,self::$information_val))
			{
				echo '<li tabindex="0" class="'.self::$information_val[$value]['id'].'" style="width:350px">';
				echo '<label class="lb-type">'.self::$information_val[$value]['label_type'].'</label>';
				echo '<label class="lb-userid"></label>';
				echo '<label class="lb-username"></label>';
				echo '<label　class="lb-time"></label>';
				echo '</li>';
			}
		}
		echo '</ul>';

	}

	
}