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
class Button {

	//register button
	protected static $button_val = array(
		'btn-save'								=>		array('id'=>'btn-save',						'class'=>'btn','icon'=>'fa fa-save',			'label'=>'保存',		 'data_popup'=>'tooltip', 'color' => 'text-primary'),
		'btn-search'							 =>   array('id'=>'btn-search',						  'class'=>'btn','icon'=>'fa fa-search',		  'label'=>'検索',		 'data_popup'=>'tooltip', 'color' => 'text-primary'),
		'btn-back'							   =>   array('id'=>'btn-back',							'class'=>'btn','icon'=>'fa fa-mail-reply',	  'label'=>'戻る',		 'data_popup'=>'tooltip', 'color' => 'text-danger' ),
		'btn-add-new'							=>   array('id'=>'btn-add-new',						 'class'=>'btn','icon'=>'fa fa-plus',			'label'=>'新規追加',	 'data_popup'=>'tooltip', 'color' => 'text-primary'),
		'btn-edit'							   =>   array('id'=>'btn-edit',							'class'=>'btn','icon'=>'fa fa-pencil',		  'label'=>'編集',		 'data_popup'=>'tooltip', 'color' => 'text-primary'),  
		'btn-delete'							 =>   array('id'=>'btn-delete',						  'class'=>'btn','icon'=>'fa fa-trash-o',		 'label'=>'削除',		 'data_popup'=>'tooltip', 'color' => 'text-danger' ),
		'btn-csv'								=>   array('id'=>'btn-csv',							 'class'=>'btn','icon'=>'icon-file-text2',	   'label'=>'CSV',		  'data_popup'=>'tooltip', 'color' => 'text-primary'),
		'btn-csv2'								=>   array('id'=>'btn-csv2',							 'class'=>'btn','icon'=>'icon-file-text2',	   'label'=>'ビュー',		  'data_popup'=>'tooltip', 'color' => 'text-primary'),
		'btn-send'							   =>   array('id'=>'btn-send',							'class'=>'btn','icon'=>'fa fa-send',			'label'=>'送信',		 'data_popup'=>'tooltip', 'color' => 'text-primary'),
		'btn-print'							  =>   array('id'=>'btn-print',						   'class'=>'btn','icon'=>'fa fa-print',		   'label'=>'印刷',		 'data_popup'=>'tooltip', 'color' => 'text-primary'),
		'btn-export'							 =>   array('id'=>'btn-export',						  'class'=>'btn','icon'=>'fa fa-print',		   'label'=>'出力',		 'data_popup'=>'tooltip', 'color' => 'text-primary'),   
		'btn-export3'							 =>   array('id'=>'btn-export3',						  'class'=>'btn','icon'=>'fa fa-print',		   'label'=>'出力3',		 'data_popup'=>'tooltip', 'color' => 'text-primary'),
		'btn-export2'							 =>   array('id'=>'btn-export2',						  'class'=>'btn','icon'=>'fa fa-print',		   'label'=>'出力2',		 'data_popup'=>'tooltip', 'color' => 'text-primary'),
		'btn-export4'							 =>   array('id'=>'btn-export4',						  'class'=>'btn','icon'=>'fa fa-print',		   'label'=>'page br',		 'data_popup'=>'tooltip', 'color' => 'text-primary'),
		'btn-export5'							 =>   array('id'=>'btn-export5',						  'class'=>'btn','icon'=>'fa fa-print',		   'label'=>'SHEET',		 'data_popup'=>'tooltip', 'color' => 'text-primary'),
		'btn-export6'							 =>   array('id'=>'btn-export6',						  'class'=>'btn','icon'=>'fa fa-print',		   'label'=>'PDF',		 'data_popup'=>'tooltip', 'color' => 'text-primary'),
		'btn-export7'							 =>   array('id'=>'btn-export7',						  'class'=>'btn','icon'=>'fa fa-print',		   'label'=>'PDF2',		 'data_popup'=>'tooltip', 'color' => 'text-primary'),
		'btn-cancel'							 =>   array('id'=>'btn-cancel',						  'class'=>'btn','icon'=>'fa fa-trash-o',		 'label'=>'〆解除',	   'data_popup'=>'tooltip', 'color' => 'text-danger' ),
		'btn-confirm'							=>   array('id'=>'btn-confirm',						 'class'=>'btn','icon'=>'fa fa-check',		   'label'=>'確認',		 'data_popup'=>'tooltip', 'color' => 'text-primary'),
		'btn-import'							 =>   array('id'=>'btn-import-csv',					  'class'=>'btn','icon'=>'fa fa-download',		'label'=>'取込',		 'data_popup'=>'tooltip', 'color' => 'text-primary'),
		'btn-flow-change'						=>   array('id'=>'btn-flow-change',					 'class'=>'btn','icon'=>'fa fa-refresh',		 'label'=>'フロー更新',   'data_popup'=>'tooltip', 'color' => 'text-primary'),
		'btn-del-estimate'						=>   array('id'=>'btn-del-estimate',					 'class'=>'btn','icon'=>'fa fa-trash-o',		 'label'=>'伝票取消',   'data_popup'=>'tooltip', 'color' => 'text-primary'),
		'btn-approve-estimate'						=>   array('id'=>'btn-approve-estimate',					 'class'=>'btn','icon'=>'fa fa-check',		 'label'=>'伝票承認',   'data_popup'=>'tooltip', 'color' => 'text-primary'),
		'btn-I008pdf'						=>   array('id'=>'btn-approve-estimate',					 'class'=>'btn','icon'=>'fa fa-check',		 'label'=>'Fill-PDF',   'data_popup'=>'tooltip', 'color' => 'text-primary'),
		'btn-del-approve'						=>   array('id'=>'btn-del-approve',					 'class'=>'btn','icon'=>'fa fa-trash-o',		 'label'=>'伝票承認取消',   'data_popup'=>'tooltip', 'color' => 'text-primary'),
		'btn-generate'								=>		array('id'=>'btn-generate',						'class'=>'btn','icon'=>'fa fa-save',			'label'=>'世代更新',		 'data_popup'=>'tooltip', 'color' => 'text-primary'),
		'btn-basic'								=>		array('id'=>'btn-basic',						'class'=>'btn','icon'=>'fa fa-save',			'label'=>'基本',		 'data_popup'=>'tooltip', 'color' => 'text-primary'),
		'btn-planning'								=>		array('id'=>'btn-planning',						'class'=>'btn','icon'=>'fa fa-save',			'label'=>'企画',		 'data_popup'=>'tooltip', 'color' => 'text-primary'),
		'btn-item'								=>		array('id'=>'btn-item',						'class'=>'btn','icon'=>'fa fa-save',			'label'=>'アイテム',		 'data_popup'=>'tooltip', 'color' => 'text-primary'),
		'btn-delivery'								=>		array('id'=>'btn-delivery',						'class'=>'btn','icon'=>'fa fa-truck',			'label'=>'配送',		 'data_popup'=>'tooltip', 'color' => 'text-primary'),
		'btn-order'								=>		array('id'=>'btn-order',						'class'=>'btn','icon'=>'	fa fa-send-o',			'label'=>'発注',		 'data_popup'=>'tooltip', 'color' => 'text-primary'),
		'btn-add-new-row'							=>   array('id'=>'add-btn',						 'class'=>'btn','icon'=>'fa fa-plus',			'label'=>'行追加',	 'data_popup'=>'tooltip', 'color' => 'text-primary'),
		'btn-save-row'								=>		array('id'=>'save-btn',						'class'=>'btn','icon'=>'fa fa-save',			'label'=>'保存',		 'data_popup'=>'tooltip', 'color' => 'text-primary'),
		'btn-preview'								=>		array('id'=>'btn-preview',						'class'=>'btn','icon'=>'fa fa-search',			'label'=>'プレビュー',		 'data_popup'=>'tooltip', 'color' => 'text-primary'),
		'btn-bill'								=>		array('id'=>'btn-bill',						'class'=>'btn','icon'=>'fa fa-file-text-o',			'label'=>'ビュー',		 'data_popup'=>'tooltip', 'color' => 'text-primary'),
		'btn-done'								=>		array('id'=>'btn-done',						'class'=>'btn','icon'=>'fa fa-flag-checkered',			'label'=>'終了',		 'data_popup'=>'tooltip', 'color' => 'text-primary'),
		'btn-excel'							  =>   array('id'=>'btn-excel',						   'class'=>'btn','icon'=>'fa fa-print',		   'label'=>'EXCEL',		 'data_popup'=>'tooltip', 'color' => 'text-primary'),
		'btn-update'						=>   array('id'=>'btn-update',					 'class'=>'btn','icon'=>'fa fa-refresh',		 'label'=>'更新',   'data_popup'=>'tooltip', 'color' => 'text-primary'),
		'btn-cancel'						=>   array('id'=>'btn-cancel',					 'class'=>'btn','icon'=>'fa fa-times-circle',		 'label'=>'取消',   'data_popup'=>'tooltip', 'color' => 'text-primary'),
		'btn-execute'						=>   array('id'=>'btn-cancel',					 'class'=>'btn','icon'=>'fa fa-hourglass-start',		 'label'=>'実行',   'data_popup'=>'tooltip', 'color' => 'text-primary'),
		'btn-registration'						=>   array('id'=>'btn-registration',					 'class'=>'btn','icon'=>'fa fa-paint-brush',		 'label'=>'登録',   'data_popup'=>'tooltip', 'color' => 'text-primary'),
		'btn-registration2'						=>   array('id'=>'btn-registration2',					 'class'=>'btn','icon'=>'fa fa-paint-brush',		 'label'=>'PDF_2',   'data_popup'=>'tooltip', 'color' => 'text-primary'),
		'btn-refresh'						=>   array('id'=>'btn-refresh',					 'class'=>'btn','icon'=>'fa fa-refresh',		 'label'=>'クリア',   'data_popup'=>'tooltip', 'color' => 'text-primary'),
		'btn-project'						=>   array('id'=>'btn-project',					 'class'=>'btn','icon'=>'fa fa-file-powerpoint-o',		 'label'=>'案件',   'data_popup'=>'tooltip', 'color' => 'text-primary'),
		'btn-list'						=>   array('id'=>'btn-list',					 'class'=>'btn','icon'=>'fa fa-list-alt',		 'label'=>'一覧',   'data_popup'=>'tooltip', 'color' => 'text-primary'),
		'btn-order-accept'						=>   array('id'=>'btn-order-accept',					 'class'=>'btn','icon'=>'	fa fa-check-square-o',		 'label'=>'受注確定',   'data_popup'=>'tooltip', 'color' => 'text-primary'),
		'btn-upgrade'						=>   array('id'=>'btn-upgrade',					 'class'=>'btn','icon'=>'	fa fa-retweet',		 'label'=>'改版',   'data_popup'=>'tooltip', 'color' => 'text-primary',),
		'btn-config'						=>   array('id'=>'btn-config',				'class'=>'btn','icon'=>'fa fa-bookmark-o',		  'label'=>'機能ブックマーク',	 'data_popup'=>'tooltip', 'color' => 'text-primary','tabindex'=>'11'),
		'btn-change-pass'					=>   array('id'=>'btn-change-pass', 	  	'class'=>'btn','icon'=>'fa fa-key',		  'label'=>'パスワード変更',		 'data_popup'=>'tooltip', 'color' => 'text-primary','tabindex'=>'12'),
	);


	/**
	* show button left
	* -----------------------------------------------
	* @author	  :   vuongvt	 - 2016/06/28 - create
	* @param	   :   null
	* @return	  :   null
	* @access	  :   public
	* @see		 :   remark
	*/
	public static function button_left(array $array) {
		echo '<ul class="nav navbar-nav" style="">';
		foreach ($array as $key => $value) {
			if(array_key_exists($value,self::$button_val))
			{
				if($key==0||$key==1){
					$btn_lang_tootip = 'tooltip.'.self::$button_val[$value]['id'];
					echo '<li tabindex="0" class="hide-item-menu '.'cl-'.self::$button_val[$value]['id'].'" id="'. self::$button_val[$value]['id'].'">';
					echo '<a class="btn btn-link">';
					echo '<i class="menu-icon '. self::$button_val[$value]['icon']. ' ' . self::$button_val[$value]['color']. ' ">'.'</i><span class="menu-text ' . self::$button_val[$value]['color']. ' ">';
					echo ' ' . self::$button_val[$value]['label'];
					echo '</span></a></li>';
				}else{
					$btn_lang_tootip = 'tooltip.'.self::$button_val[$value]['id'];
					echo '<li tabindex="0" class="collapse in menu-collapse '.'cl-'.self::$button_val[$value]['id'].'" id="'. self::$button_val[$value]['id'].'">';
					echo '<a class="btn btn-link">';
					echo '<i class="menu-icon '. self::$button_val[$value]['icon']. ' ' . self::$button_val[$value]['color']. ' ">'.'</i><span class="menu-text ' . self::$button_val[$value]['color']. ' ">';
					echo ' ' . self::$button_val[$value]['label'];
					echo '</span></a></li>';
				}
			}
		}
		if(count($array)>2){
			echo '<li><a class="hide-item-menu btn-collapse-menu" data-toggle="collapse" data-target=".hide-menu"><i class="fa fa-ellipsis-v"></i></a></li>';
		}
		
		echo '</ul>';
	}

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
	public static function button_right(array $array) {


		echo '<ul class="nav navbar-nav" style="float:right">';
		foreach ($array as $key => $value) {
			if(array_key_exists($value,self::$button_val))
			{
				$btn_lang_tootip = 'tooltip.'.self::$button_val[$value]['id'];

				echo '<li tabindex="0" class="'.'cl-'.self::$button_val[$value]['id'].'" id="'.self::$button_val[$value]['id'].'" data-original-title="'.self::$button_val[$value]['label'].'" data-popup="'.self::$button_val[$value]['data_popup'].'">';

				if($value=="btn-close"){
					//add link back vulq 2016-10-04
					$url_old = \URL::previous();
					if (strpos($url_old,'maintenance')) {
						$url_old = \Request::url();
					}
					//end
					echo '<a href="javascript:void(0)" link="'.$url_old.'" class="btn btn-link">';
				}
				else{
					echo '<a class="btn btn-link">';
				}

				 echo '<i class="'. self::$button_val[$value]['icon']. ' ' . self::$button_val[$value]['color']. ' ">'.'</i><span class="' . self::$button_val[$value]['color']. ' ">';
				echo ' ' . self::$button_val[$value]['label'];
				echo '</span></a></li>';

			}
		}
		echo '</ul>';

	}

	/**
	 * show button left
	 * -----------------------------------------------
	 * @author	  :   mịnhpt	 - 2017/04/17 - create
	 * @param	   :   null
	 * @return	  :   null
	 * @access	  :   public
	 * @see		 :   remark
	 */
	public static function button_search($inline) {
		if($inline)
		{
			echo '<div class="form-group">';
			echo '<div class="col-md-12 text-right">';
			echo '<button type="button" class="btn btn-primary" id="btn-search"><i class="icon-search4"> 検索 </i></button>';
			echo '</div>';
			echo '</div>';
		}
		else
		{
			echo '<div class="col-md-1 pull-right text-right" >';
			echo '<button type="button" class="btn btn-primary" id="btn-search"><i class="icon-search4"> 検索 </i></button>';
			echo '</div>';
		}

	}

	public  static function button_bottom(array $array)
	{
		foreach ($array as $key => $value) {
			if(array_key_exists($value,self::$button_val))
			{
				echo '<button class="btn btn-primary" id="'.self::$button_val[$value]['id'].'"><i class="'. self::$button_val[$value]['icon']. '"></i>'.' ' . self::$button_val[$value]['label'].'</button>';
			}
		}
	}

}