<?php
namespace Modules\Popup\Http\Controllers;

use App\Helpers\Dao;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Input;

class Lm005Controller extends Controller
{
    protected $detailScreen = 'LM005';

    //display popup with default data
    public function getIndex(Request $request)
    {
        $aParams                     = Input::all();
        $data['data']['btnid']       = isset($aParams['btnid']) ? $aParams['btnid'] : 0;
        $data['data']['istable']     = isset($aParams['istable']) ? $aParams['istable'] : 0;
        $data['data']['puredata']    = isset($aParams['puredata']) ? $aParams['puredata'] : 0;
        $data['data']['multi']       = $request->multi;
        $data_screen                 = initSession($this->detailScreen, false);
        $data_screen['data_session'] = initSession($this->detailScreen, true);

        $vendor_divs    = Dao::call_stored_procedure('SPC_LM005_INQ1');
        return view('popup::search.lm005', $data, $data_screen)
            ->with('vendor_divs',$vendor_divs);
    }
    //search data into popup
    public function postSearch(Request $request)
    {
        if($request->ajax()) {
            $param = $request->all();
            $param['company_cd_login'] = $request->session()->get('company_cd');
            $data  = Dao::call_stored_procedure('SPC_LM005_FND2', $param);
            return view('popup::search.searchlm005')
                ->with('data', $data)
                ->with('paging', $data[1][0]);
        }
    }
}
