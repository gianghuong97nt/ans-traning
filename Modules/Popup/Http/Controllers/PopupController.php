<?php

namespace Modules\Popup\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Input;

class PopupController extends Controller
{
	/**
	 * display search
	 *
	 * @author      :   DuyTP 2017/06/15
	 * @author      :
	 * @param       :   null
	 * @return      :   null
	 * @access      :   public
	 * @see         :
	 */
	public function getSearchCity(Request $request)
	{
		$aParams = Input::all();
		$data['data']['btnid'] = isset($aParams['btnid'])?$aParams['btnid']:0;
		$data['data']['istable'] = isset($aParams['istable'])?$aParams['istable']:0;
		$data['data']['puredata'] = isset($aParams['puredata'])?$aParams['puredata']:0;
		$data['data']['multi'] = $request->multi;
		//var_dump($data);die;
		
		return view('popup::search.city', $data);
	}

}
