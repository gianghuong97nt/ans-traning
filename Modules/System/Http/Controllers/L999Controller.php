<?php
/**
 * TOSMAC Project
 *
 * M004L controller
 *
 * @copyright       :   ANS-ASIA
 * @author          :   tuantv - 2017/12/12- create
 * @author          :
 */
namespace Modules\System\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use App\Helpers\Dao;
use Carbon\Carbon;
use Session;
use Modules\Common\Http\Controllers\CommonController as common;
use App\Helpers\SqlXml;

class L999Controller extends Controller
{
    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index()
    {
        $date_fr = date('Y/m/d', strtotime('-7 days'));
        $date_to = date('Y/m/d');
        return view('system::l999.index')
            ->with('date_fr',$date_fr)
            ->with('date_to',$date_to);
    }
    /*
    * search l999
    *
    * @author  :   TUANTV - 2017/12/21 - create
    * @author  :
    *
    * @return type_of_return - description
    */
    public function postSearch(Request $request)
    {
        $param= $request->all();
        $param['company_cd'] = $request->session()->get('company_cd');
        $data = Dao::call_stored_procedure('SPC_L999_FND1', $param);
        return view('system::l999.search')
            ->with('data', $data)
            ->with('paging', $data[1][0])
            ->with('w_text', $data[2][0]);
    }
}