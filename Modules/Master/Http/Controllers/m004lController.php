<?php
/**
 * TOSMAC Project
 *
 * M004L controller
 *
 * @copyright       :   ANS-ASIA
 * @author          :   vietdt - 2019/05/30 - create
 * @author          :
 */
namespace Modules\Master\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use App\Helpers\Dao;
use Carbon\Carbon;
use Session;

class m004lController extends Controller
{
    protected $screen = 'M004l';
    /**
     * function index
     *
     * @author  :   vietdt - 2019/05/30 - create
     * @author  :   
     *
     * @return type_of_return - description
     */
    public function index(Request $request)
    {
    	$name_type  = '22';
        $number_cd  = '0';
        $data2 = Dao::call_stored_procedure('SPC_COM_M101_INQ1', array($name_type,$number_cd));

        return view('master::m004l.index', initSession($this->screen))
                ->with('data_session', initSession($this->screen, true))
                ->with('data2',$data2);
        }
    /**
     * function search
     *
     * @author  :   vietdt - 2019/05/30 - create
     * @author  :   
     *
     * @return type_of_return - description
     */
    public function postSearch(Request $request)
    {
        if($request->ajax()) {
            $param = $request->all();
            $param['company_cd'] = $request->session()->get('company_cd');
            $data  = Dao::call_stored_procedure('SPC_M004L_FND1', $param);
            return view('master::m004l.search')
                ->with('data', $data)
                ->with('paging', $data[1][0]);
        }
    }
}
