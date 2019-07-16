<?php
/**
 * TOSMAC Project
 *
 * S001l controller
 *
 * @copyright       :   ANS-ASIA
 * @author          :   CHINHNB - 2017/12/18 - create
 * @author          :
 */

namespace Modules\System\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use App\Helpers\Dao;
use Carbon\Carbon;
use Session;

class S001lController extends Controller
{
    protected $screen = 'S001L';
    /**
     * function index
     *
     * @author  :   CHINHNB - 2017/12/18- create
     * @author  :   
     *
     * @return type_of_return - description
     */
    public function index(Request $request)
    {
    	$name_type  = '26';
        $number_cd  = '0';
        $data2 = Dao::call_stored_procedure('SPC_COM_M101_INQ1', array($name_type,$number_cd));
        return view('system::s001l.index', initSession($this->screen))
                ->with('data_session', initSession($this->screen, true))
                ->with('company_cd',$request->session()->get('company_cd'))
                ->with('company_nm',$request->session()->get('company_nm'))
                ->with('data2',$data2);
        }
    /**
     * function search
     *
     * @author  :   CHINHNB - 2017/12/18 - create
     * @author  :   
     *
     * @return type_of_return - description
     */
    public function postSearch(Request $request)
    {
        if($request->ajax()) {
            $param = $request->all();
            $data  = Dao::call_stored_procedure('SPC_S001L_FND1', $param);
            return view('system::s001l.search')
                ->with('data', $data)
                ->with('paging', $data[1][0]);
        }
    }
}
