<?php
/**
 * TOSMAC Project
 *
 * S002Controller
 *
 * @copyright       :   ANS-ASIA
 * @author          :   BINHNN - 2017/12/22 - create
 * @author          :
 */

namespace Modules\System\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use App\Helpers\Dao;
use Session;
use App\Helpers\SqlXml;

class S002Controller extends Controller
{
	/**
	 * Show the form for editing the specified resource.
	 * @return Response
	 */
	public function getIndex(){
		$CMB = Dao::call_stored_procedure('SPC_S002_INQ1');
		//
		return view('system::s002.index')
			->with('CMB',$CMB);
	}

	/**
	 * function refer
	 *
	 * @author  :   ANS-ASIA BINHNN - 2017/12/26 - create
	 * @author  :
	 *
	 * @return type_of_return - description
	 */
	public function search(Request $request)
	{
		if($request->ajax()) {
			$params = $request->all();
			$data = Dao::call_stored_procedure('SPC_S002_INQ2', $params);
			//
			if (isset($data[0][0]['S002_prg_id']) && $data[0][0]['S002_prg_id'] != ''){
				$mode = 'U';
			}else{
				$mode = 'A';
			}
			$w_search = view('system::s002.search')->with('data',$data[0])->render();
			$view = view('layouts._registration_footer')
				->with('createUpdate',isset($data[1][0])?$data[1][0]: array())->render();
			//
			return response()->json([
				'data' => $w_search,
				'mode' => $mode,
				'createUpdate'=>$view,
				'data_chk'=>$data[2]
			]);
		}
	}

	/**
	 * save
	 *
	 * @author  :   ANS-ASIA BINHNN - 2017/12/26 - create
	 * @author  :
	 *
	 * @return type_of_return - description
	 */
	public function save(Request $request){
		try {
			if($request->ajax()) {
				$user_div 	= $request->user_div;
				$mode 		= $request->mode;
				$company_cd = $request->session()->get('company_cd');
				$ip 		= $request->ip();
				$user_id 	= $request->session()->get('user_id');
				//
				$xml = new SqlXml();
				$result_xml = $xml->xml($request->rows);

				//
				$param = [
					$user_div,
					$mode,
					$result_xml,
					$company_cd,
					$ip,
					$user_id
				];
				$data = Dao::call_stored_procedure('SPC_S002_ACT1',$param);
				if ($data[0][0]['Data'] == 'Exception' || $data[0][0]['Data'] == 'EXCEPTION') {
					$result = array(
						'status' => '202',
						'data' => $data[0],
					);
				} else if ($data[0][0]['Data'] != '') {
					$result = array(
						'status' => '201',
						'data' => $data[0]
					);
				} else {
					$result = array(
						'status' => '200',
						'data' => $data[0]
					);
				}
			}
		} catch (\Exception $e) {

			$result = array(
				'status' => '203',
				'data' => '',
			);
		}
		return response()->json($result);
	}
}