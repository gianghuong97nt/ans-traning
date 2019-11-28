<?php

namespace Modules\Popup\Http\Controllers;

use App\Helpers\Dao;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Input;

class lm002Controller extends Controller
{
    protected $detailScreen = 'M002';
    /**
     * display search
     *
     * @author      :   QuyND 2017/12/15
     * @author      :   LM001
     * @param       :   null
     * @return      :   null
     * @access      :   public
     * @see         :
     */
    //display popup with default data
    public function getIndex(Request $request)
    {
        // $aParams                     = Input::all();
        // $data['data']['btnid']       = isset($aParams['btnid']) ? $aParams['btnid'] : 0;
        // $data['data']['istable']     = isset($aParams['istable']) ? $aParams['istable'] : 0;
        // $data['data']['puredata']    = isset($aParams['puredata']) ? $aParams['puredata'] : 0;
        // $data['data']['multi']       = $request->multi;
        // $data['data']['searchFlag'] = 1;
        // $data_screen                 = initSession($this->detailScreen, false);
        // $data_screen['data_session'] = initSession($this->detailScreen, true);
        // //var_dump($data);die;
        // dd($data);
        // return view('popup::search.lm002', , $data_screen);
        //var_dump($data);die;

        // return view('popup::search.lm002', $data, $data_screen);
        $data  = Dao::call_stored_procedure('SPC_LM003_FND02',['','50','1']);
        $aParams                     = Input::all();
        $data['data']['btnid']       = isset($aParams['btnid']) ? $aParams['btnid'] : 0;
        $data['data']['istable']     = isset($aParams['istable']) ? $aParams['istable'] : 0;
        $data['data']['puredata']    = isset($aParams['puredata']) ? $aParams['puredata'] : 0;
        $data['data']['multi']       = $request->multi;
        $data['data']['searchFlag']  = 1;
        $data_screen                 = initSession($this->detailScreen, false);
        $data_screen['data_session'] = initSession($this->detailScreen, true);
        $data_screen                 = initSession($this->detailScreen, false);
        $data_screen['data_session'] = initSession($this->detailScreen, true);
        // var_dump($data);die;

        return view('popup::search.lm002')
            ->with('data', $data);
    }
    //search data into popup
    public function postSearch(Request $request)
    {
        if($request->ajax()) {
        $param = $request->all();
        $data  = Dao::call_stored_procedure('SPC_LM003_FND02', $param);
        return view('popup::search.searchlm002')
            ->with('data', $data)
            ->with('paging', $data[1][0]);
        }
    }

}
