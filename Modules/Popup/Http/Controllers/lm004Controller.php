<?php

namespace Modules\Popup\Http\Controllers;

use App\Helpers\Dao;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Input;

class lm004Controller extends Controller
{
    protected $detailScreen = 'LM004';
    /**
     * display search
     *
     * @author      :   VIETDT 2019/06/11
     * @author      :   LM004
     * @param       :   null
     * @return      :   null
     * @access      :   public
     * @see         :
     */
    //display popup with default data
    public function getIndex(Request $request)

    {
        $data['data']['searchFlag'] = 1;
        $name_type  = '22';
        $number_cd  = '0';

        $dataCombo = Dao::call_stored_procedure('SPC_COM_M101_INQ1', array($name_type,$number_cd));
        return view('popup::search.lm004', $data)
             ->with('dataCombo',$dataCombo);;
    }
    //search data into popup
    public function postSearch(Request $request)
    {
        if($request->ajax()) {
        $param = $request->all();
        $param['company_cd'] = $request->session()->get('company_cd');
        $data  = Dao::call_stored_procedure('SPC_M004L_FND1', $param);
        $popup =   '';
        return view('master::m004l.search')
            ->with('data', $data)
            ->with('popup', $popup)
            ->with('paging', $data[1][0]);
        }
    }

}
