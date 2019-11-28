<?php

namespace Modules\Popup\Http\Controllers;

use App\Helpers\Dao;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Input;

class l001Controller extends Controller
{
    protected $detailScreen = 'l001';
    /**
     * display search
     *
     * @author      :   VIETDT 2019/08/06
     * @author      :   LM001
     * @param       :   null
     * @return      :   null
     * @access      :   public
     * @see         :
     */
    //display popup with default data
    public function getIndex(Request $request)
    {
        $aParams                     = Input::all();
        $data['data']['btnid']       = isset($aParams['btnid']) ? $aParams['btnid'] : 0;
        $data['data']['istable']     = isset($aParams['istable']) ? $aParams['istable'] : 0;
        $data['data']['puredata']    = isset($aParams['puredata']) ? $aParams['puredata'] : 0;
        $data['data']['company_cd']    = isset($aParams['company_cd']) ? $aParams['company_cd'] : 0;
        $data['data']['multi']       = $request->multi;
        $data['data']['searchFlag'] = 1;
        $data_screen                 = initSession($this->detailScreen, false);
        $data_screen['data_session'] = initSession($this->detailScreen, true);
        $data2   = Dao::call_stored_procedure('SPC_L001_INQ1');
        return view('popup::search.l001', $data, $data_screen)
            ->with('data2',$data2);
    }
      /**
     * function postSearch
     *
     * @author  :   vietdt - 2019/07/25 - create
     * @author  :   
     *
     * @return type_of_return - description
     */
    public function postSearch(Request $request)
    {
        if($request->ajax()) {
            $param = $request->all();
            $data  = Dao::call_stored_procedure('SPC_L001_FND1', $param);
            return view('popup::search.searchl001')
                ->with('data', $data)
                ->with('paging', $data[1][0]);
        }
    }

     /**
     * function referClient
     *
     * @author  :   vietdt - 2019/07/25 - create
     * @author  :   
     *
     * @return type_of_return - description
     */
    public function referClient(Request $request){
       if($request->ajax()) {
            $param = $request->all();
            $param['company_cd'] = $request->session()->get('company_cd');
             dd($param);
            $data = Dao::call_stored_procedure('SPC_L001_INQ2', $param);
            return response()->json($data);
           
        }
    }

}
