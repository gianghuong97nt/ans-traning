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

namespace Modules\Master\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use App\Helpers\Dao;
use Carbon\Carbon;
use Session;

class M003lController extends Controller
{
    protected $screen = 'M003L';
    /**
     * function index
     *
     * @author  :   CHINHNB - 2017/12/18- create
     * @author  :   
     *
     * @return type_of_return - description
     */
    public function index()
    {
        $data  = Dao::call_stored_procedure('SPC_M003L_INQ1');
        return $view = view('master::m003l.index', initSession($this->screen))
            ->with('data_session', initSession($this->screen, true))
            ->with('data',$data);
    }
    /**
     * function search
     *
     * @author  :   CHINHNB - 2017/12/18 - create
     * @author  :   
     *
     * @return type_of_return - description
     */
    public function postSearchCD(Request $request)
    {
        
        if($request->ajax()) {
            $param = $request->all();
            $data   = Dao::call_stored_procedure('SPC_M003L_INQ2',$param);
            $result = array(
                    'status' => '200',
                    'data' => array($data[0][0]),
                );
            }      
        return response()->json($result);
    }

    public function postSearch(Request $request)
    {
        if($request->ajax()) {
            $param = $request->all();
            $data  = Dao::call_stored_procedure('SPC_M003L_FND1', $param);
             
            return view('master::m003l.search')
            ->with('data', $data)
            ->with('paging', $data[1][0]);
        }
    }
}
