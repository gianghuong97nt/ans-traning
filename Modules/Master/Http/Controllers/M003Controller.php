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

class M003Controller extends Controller
{
    protected $screen = 'M003';
    /**
     * function index
     *
     * @author  :   CHINHNB - 2017/12/18- create
     * @author  :   
     *
     * @return type_of_return - description
     */
    public function index(request $request)
    {
        $id = $request->id;
        $param = Array (
            'id'        =>  $id??$request->session()->get('company_cd')
        );
        $data = Dao::call_stored_procedure('SPC_M003_INQ1',$param);
        return $view = view('master::m003.index', initSession($this->screen))
            ->with('data_session', initSession($this->screen, true))
            ->with('data_company',$data[1])
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
