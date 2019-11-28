<?php
/**
 * TOSMAC Project
 *
 * M008Controller
 *
 * @copyright       :   ANS-ASIA
 * @author          :   VIETDT - 2019/07/05 - create
 * @author          :
 */

namespace Modules\Master\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use App\Helpers\Dao;
use Session;
use App\Helpers\SqlXml;

class M008Controller extends Controller
{
	protected $screen = 'M008';
	/**
	 * Show the form for editing the specified resource.
	 * @return Response
	 */
	public function getIndex(){
		$name_type  = '8';
		$number_cd  = '0';
		$data2 = Dao::call_stored_procedure('SPC_COM_M101_INQ1', array($name_type,$number_cd));
		$name_upr	= '3';
		$data3 = Dao::call_stored_procedure('SPC_M008_INQ1', array($name_upr));
		// dd($data3);
		return view('master::m008.index', initSession($this->screen))
		->with('data_session', initSession($this->screen, true))
		->with('data2',$data2)
		->with('data3',$data3);
	}

	/**
	 * function refer
	 *
	 * @author  :   ANS-ASIA VIETDT - 2019/07/05 - create
	 * @author  :
	 *
	 * @return type_of_return - description
	 */
	public function search(Request $request)
	{
		if($request->ajax()) {
			$params = $request->all();
			$params['user_id_login']=$request->session()->get('user_id');
			$data = Dao::call_stored_procedure('SPC_M008_FND1', $params);

			$w_search = view('master::m008.search')
				->with('data',$data)

			->render();
			$view = view('layouts._registration_footer')
			->with('createUpdate',isset($data[1][0])?$data[1][0]: array())->render();
			return response()->json([
				'data' => $w_search,
				'createUpdate'=>$view,
			]);
		}
	}

	/**
	 * save
	 *
	 * @author  :   VIETDT - 2019/07/05 - create
	 * @author  :
	 *
	 * @return type_of_return - description
	 */
	public function save(Request $request){
		try {
			if($request->ajax()) {
			$json                   =   json_encode($request->json()->all());
			$params['json']         =   $json;
			$params['upd_user_id']  =   $request->session()->get('user_id');
			$params["ip"]           =   $request->ip(); 
			$data = Dao::call_stored_procedure('SPC_M008_ACT1',$params);
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