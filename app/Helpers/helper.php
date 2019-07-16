<?php 

/**
  *-------------------------------------------------------------------------*
  * Helpers 
  * @created         :   2016/11/24
  * @author          :   tannq@ans-asia.com
  * @package         :   common
  * @copyright       :   Copyright (c) ANS-ASIA
  * @version         :   1.0.0
  *-------------------------------------------------------------------------*
  *
  */
use Carbon\Carbon;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Session;

/*
 * Add timestamp version 
 */
if(!function_exists('file_cached'))
{
	function file_cached($path, $bustQuery = false)
	{
		// Get the full path to the file.
		$realPath = public_path($path);

		if ( ! file_exists($realPath)) {
			throw new \LogicException("File not found at [{$realPath}]");
		}

		// Get the last updated timestamp of the file.
		$timestamp = filemtime($realPath);

		if ( ! $bustQuery) {
			// Get the extension of the file.
			$extension = pathinfo($realPath, PATHINFO_EXTENSION);

			// Strip the extension off of the path.
			$stripped = substr($path, 0, -(strlen($extension) + 1));

			// Put the timestamp between the filename and the extension.
			$path = implode('.', array($stripped, $timestamp, $extension));
		} else {
			// Append the timestamp to the path as a query string.
			$path  .= '?v=' . $timestamp;
		}

		return asset($path);
	}
}
/*
 * Call url file
 */
if(!function_exists('public_uri'))
{
	function public_url($url,$attributes=null)
	{
		if(file_exists($url))
		{
			$attr = '';
			if(!empty($attributes) && is_array($attributes))
			{
				foreach($attributes as $key=>$val)
				{
					$attr .= $key.'="'.$val.'" ';
				}
			}
			$attr = rtrim($attr);
			if(ends_with($url,'.css'))
			{
				return '<link rel="stylesheet" href="'.file_cached($url,true).'" type="text/css" '.$attr.'>';
			}
			elseif(ends_with($url,'.js'))
			{
				return '<script src="'.file_cached($url,true).'" type="text/javascript" charset="utf-8" '.$attr.'></script>';
			}
			else
			{
				return asset($url);
			}
		}
		$console = 'File:['.$url.'] not found';
		return "<script>console.log('".$console."')</script>";
	}
}

if(!function_exists('formatNumber')){
	function formatNumber($number='',$decimal=0){
		if($number=='')
			return $number;

		$number = 1*$number;
		if(($number - round($number))!=0){
			$number = number_format($number,$decimal,'.',',');
		}else{
			$number = number_format($number,0,'.',',');
		}
		return $number;
;	}
}

if(!function_exists('dodownload')){
	function dodownload($folderName = '', $allFiles = []) {
		$zip = new ZipArchive;
		$date = Carbon::now();
		$zipFolderName = $date->getTimestamp().'.zip';
		$path = public_path('/uploads/'.$folderName.'/');

		//encode path with japanese character for php to access
		$encoded_path = $path;

		//open zip file (no need to encode japanese character)
		// if ($zip->open($path.$zipFolderName, ZipArchive::CREATE | ZipArchive::OVERWRITE)) {
		if ($zip->open(public_path('/uploads/tmp/').$zipFolderName, ZipArchive::CREATE | ZipArchive::OVERWRITE)) {
			//add files to zip
			if (count($allFiles) == count($allFiles,COUNT_RECURSIVE)) {
				$allFiles = array($allFiles);
			}
			// var_dump($allFiles);die;
			foreach ($allFiles as $key => $value) {
				if (($allFiles[$key]['file_store_nm']) != '' && file_exists('wfio://'.$encoded_path.$allFiles[$key]['file_store_nm'])) {
					//does not work since fopen could not read japanese directories
					//---------------------------------------------------------------
					// //convert files to binary
					// $file = $encoded_path.$allFiles[$key]['file_store_nm'];
					// $handle = fopen($file, "r");
					// $contents = fread($handle, filesize($file));
					// fclose($handle);

					// // add binary contents to file then zip
					// $zip->addFromString($allFiles[$key]['file_display_nm'], $contents);
					//---------------------------------------------------------------


					//workaround
					//1. copy does not work
					//2. move to tmp folder then move back
					rename('wfio://'.$encoded_path.$allFiles[$key]['file_store_nm'], 'wfio://'.public_path('/uploads/tmp/').$allFiles[$key]['file_store_nm']);
					$zip->addFile(public_path('/uploads/tmp/').$allFiles[$key]['file_store_nm'], mb_convert_encoding($allFiles[$key]['file_display_nm'],"SJIS-win", "UTF-8"));
				}
			}
			//close
			$zip->close();

			//move back to original folder
			foreach ($allFiles as $key => $value) {
				if (($allFiles[$key]['file_store_nm']) != '' && File::exists(public_path('/uploads/tmp/').$allFiles[$key]['file_store_nm'])) {
					rename('wfio://'.public_path('/uploads/tmp/').$allFiles[$key]['file_store_nm'], 'wfio://'.$encoded_path.$allFiles[$key]['file_store_nm']);
				}
			}

		}
		
		//download zip file
		// $zipFile = $encoded_path.$zipFolderName;
		$zipFile = public_path('/uploads/tmp/').$zipFolderName;

		if(file_exists('wfio://'.$zipFile))
		{	
			echo '/common/dodownload?folderName='.$folderName.'&zipFolderName='.$zipFolderName;
		} else {
			echo '202';
		}
	}
}

if(!function_exists('initSession')){
	function initSession($screen,$clear_session = false){
		$screenSession = null;
		$searchFlag = 0;
		$oldConditionSearchHtml = null;
		$back_link = '/master/m001';
		$back_screen = '';
		$back_data = ['back_link'=>'/toppage'];
		$oldPageIndex = 1;
		$oldPageSize = null;
		$search_html = '';
		$is_from_search = '0';
		if(session::has('link-session.'.$screen)) {
			$screenSession  = session::get('link-session.'.$screen);
			if (isset($screenSession['init_data']['search_flag'])){
				$searchFlag = $screenSession['init_data']['search_flag'];
			}
			if (isset($screenSession['init_data']['message_search_condition'])) {
				$oldConditionSearchHtml = $screenSession['init_data']['message_search_condition'];
			}
			if(isset($screenSession['back_data']['search_flag'])){
				$is_from_search = $screenSession['back_data']['search_flag'];
			}
			if(isset($screenSession['back_data']['message_search_condition'])){
				$search_html = $screenSession['back_data']['message_search_condition'];
			}
			if (isset($screenSession['init_data']['pageSize'])) {
				$oldPageSize = $screenSession['init_data']['pageSize'];
			}
			if (isset($screenSession['init_data']['pageIndex'])) {
				$oldPageIndex = $screenSession['init_data']['pageIndex'];
			}
			if(isset($screenSession['back_link'])){
				$back_link = $screenSession['back_link'];
			}
			if(isset($screenSession['back_screen'])){
				$back_screen = $screenSession['back_screen'];
			}
			if(isset($screenSession['back_data'])){
				$back_data = $screenSession['back_data'];
				if($is_from_search == '1')
					unset($back_data['message_search_condition']);
			}
			if($clear_session)
				session::forget('link-session.'.$screen);
		}

		return (
		[
			'searchFlag' => $searchFlag
			,	'oldConditionSearchHtml' => $oldConditionSearchHtml
			,	'is_from_search' => $is_from_search
			,	'search_html' => $search_html
			,	'oldPageSize' => $oldPageSize
			,	'oldPageIndex' => $oldPageIndex
			,	'back_link' => $back_link
			,	'back_screen' => $back_screen
			,	'back_data' => json_encode($back_data)
			,	'screen' => $screen
		]
		);
	}
}

//if(!function_exists('viewSession')){
//	function viewSession(){
//		$html = '';
//		$html .= '<script type="text/javascript">';
//		$html .= "var __screen = '{{$screen}}';";
//		$html .= 'var _back_link = '{{$back_link}}';
//		$html .= 'var _back_screen = '{{$back_screen}}';
//		$html .= 'var _is_from_search = '{{$is_from_search}}';
//		$html .= 'var _back_data = htmlEntities('{{$back_data}}');
//		$html .= '_back_data = JSON.parse(_back_data);
//		$html .= '</script>';
//		return $html;
//	}
//}

