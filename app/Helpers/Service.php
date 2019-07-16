<?php
/**
 * Created by PhpStorm.
 * User: BinhNN
 * Date: 2017/11/23
 * Time: 13:36
 */

namespace App\Helpers;


use SoapClient;

class Service
{

	protected $client;
	private static $instance = null;
	protected $filename;
	protected $status;
	protected $param;

	public function __construct()
	{

		$this->setClient();
		$this->param = new \stdClass();
	}


	public static function getInstance()
	{
		if (self::$instance == null) {
			self::$instance = new Service();
		}
		return self::$instance;
	}

	/**
	 * PHP 5
	 * @author      : GiangNT
	 * @copyright   : Copyright (c) ANS-ASIA
	 * @package     : Export
	 * setClient
	 */
	private function setClient()
	{
		try {
			$this->client = new SoapClient(config('services.wcf_service.host'), array("trace" => 1, "exceptions" => 1));
		} catch (\Exception $e) {
			echo $e->getMessage();
		}
	}

	/** call wcf service
	 * @param $service_method service name
	 * @param $store_name name of store
	 * @param $store_param list param to run store procedure
	 * @param $screen   screen name
	 * @param $file_name export file name
	 * @return array
	 */
	public function callService($service_method, $store_name, $store_param, $screen, $file_name)
	{

		$result = array();

		try {
			$sql = $this->getSql($store_name, $store_param);
			$this->param->P1 = array($screen);
			$this->param->P2 = array($sql);
			$this->param->P3 = array($file_name);
			$service_result = $this->client->{$service_method}($this->param);
			$result['status'] = config('services.wcf_service.status.OK');

			if ($this->getFilename($service_result)) {
				$result['filename'] = $this->filename;;
			} else {
				$result['status'] = $this->getStatus();
			}
		} catch (\Exception $e) {
			$result['status'] = config('services.wcf_service.status.EX');
			$result['Exception'] = $e->getMessage();
		}

		return $result;
	}

	/**
	 * PHP 5
	 * @author      : GiangNT
	 * @copyright   : Copyright (c) ANS-ASIA
	 * @package     : Exports
	 * @return      : path to file
	 * getSql
	 */
	public function getStatus()
	{
		return $this->status;
	}


	/**
	 * PHP 5
	 * @author      : GiangNT
	 * @copyright   : Copyright (c) ANS-ASIA
	 * @package     : Exports
	 * @return      : file name form soap
	 */
	public function getFilename($result)
	{
		if ($this->checkSOAP($result)) {
			return $this->filename;
		}
		return "";
	}

	/**
	 * PHP 5
	 * @author      : GiangNT
	 * @copyright   : Copyright (c) ANS-ASIA
	 * @package     : Exports
	 * @return      : path to file
	 * check result from soap
	 */
	private function checkSOAP($result)
	{
		try {
			if (is_soap_fault($result)) {
				// trigger_error("SOAP Fault: (faultcode: {$result->faultcode}, faultstring: {$result->faultstring})", E_USER_ERROR);
				throw new \Exception("Line: " . __LINE__, 1);
			}
			$respon = get_object_vars($result);

			if (!is_array($respon)) {
				throw new \Exception("Line: " . __LINE__, 1);
			}

			$array_value = array_values($respon);
			$str_json = preg_replace("/\\\+/", "\\\\\\", $array_value[0]);
			$parse_respon = json_decode($str_json);

			if (!is_object($parse_respon)) {
				throw new \Exception("Line: " . __LINE__, 1);
			}
			$parse_respon = get_object_vars($parse_respon);
			if (isset($parse_respon['status']) && $parse_respon['status'] == 203) {
				$this->status = config('services.wcf_service.status.EPT');
				return false;
			}
			if (isset($parse_respon['status']) && $parse_respon['status'] == 205) {
				$this->status = config('services.wcf_service.status.SCS');
				return false;
			}
			if (isset($parse_respon['status']) && $parse_respon['status'] == 209) {
				$this->status = config('services.wcf_service.status.NODATA');
				return false;
			}

			if (isset($parse_respon['status']) && $parse_respon['status'] == 200 && isset($parse_respon['filename'])) {
				if (!file_exists(mb_convert_encoding($parse_respon['filename'], 'SJIS', 'utf-8'))
					|| !file_exists(config('services.wcf_service.download_path') . DIRECTORY_SEPARATOR . mb_convert_encoding(basename($parse_respon['filename']), 'SJIS', 'utf-8'))
				) {
					throw new \Exception("Line: " . __LINE__, 1);
				}
				$this->filename = basename($parse_respon['filename']);
			} else {
				throw new \Exception("Line: " . __LINE__, 1);
			}
			return true;
		} catch (\Exception $e) {
			// echo $e->getMessage(); die;
			$this->status = config('services.wcf_service.status.NG');
			return false;
		}
	}

	private function getSql($SPC, $param = null, $showSQL = false)
	{
		$sql = $SPC;
		$paramString = ' ';

		$sqlInjection = array("'");
		if (isset($param) && is_array($param)) {
			foreach ($param as $key => $value) {
				$param[$key] = str_replace('\'', '\'\'', $value);
				// remove character ' to sql injection
				$param[$key] = str_replace($sqlInjection, "", $param[$key]);
// 				$param[$key] = $this->_quote($value);
			}
			$paramString = implode("' , N'", $param);
			$paramString = " N'" . $paramString . "'";
		}
		$sql .= $paramString;
		if ($showSQL) {
			var_dump('EXEC ' . $sql);
		}

		// Write Log in server PHP
		$this->writeLog('EXEC ' . $sql);
		// End wirte Log
		return $sql;
	}

	private function writeLog($query)
	{
		$log_path = public_path('log');
		if (!file_exists($log_path)) {
			if (!mkdir($log_path, 0777, true)) {
				die("Failed to create folder $log_path");
			}
		}
		$file_name = date("Ymd");
		$time = date("Y-m-d H:i:s");
		$file_path = 'log' . DIRECTORY_SEPARATOR . $file_name . '.log';
		file_put_contents($file_path, $time . ' ' . $query . PHP_EOL, FILE_APPEND);
	}
}