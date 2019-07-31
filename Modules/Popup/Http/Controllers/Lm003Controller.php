<?php
namespace Modules\Popup\Http\Controllers;

use App\Helpers\Dao;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Input;

class Lm003Controller extends Controller
{
    protected $detailScreen = 'LM003';
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
        $aParams                     = Input::all();
        $data['data']['btnid']       = isset($aParams['btnid']) ? $aParams['btnid'] : 0;
        $data['data']['istable']     = isset($aParams['istable']) ? $aParams['istable'] : 0;
        $data['data']['puredata']    = isset($aParams['puredata']) ? $aParams['puredata'] : 0;
        $data['data']['multi']       = $request->multi;
        $data['searchFlag']          = 1;
        $data_screen                 = initSession($this->detailScreen, false);
        $data_screen['data_session'] = initSession($this->detailScreen, true);

        $emp_divs    = Dao::call_stored_procedure('SPC_LM003_INQ1');
        return view('popup::search.lm003', $data, $data_screen)
            ->with('emp_divs',$emp_divs);
    }
    //search data into popup
    public function postSearch(Request $request)
    {
        if($request->ajax()) {
        $param = $request->all();
        $param['company_cd_login'] = $request->session()->get('company_cd');
        $data  = Dao::call_stored_procedure('SPC_LM003_FND2', $param);

        return view('popup::search.searchlm003')
            ->with('data', $data)
            ->with('searchFlag', 1)
            ->with('paging', $data[1][0]);
        }
    }
}
