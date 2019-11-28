<?php
/**
 * TOSMAC Project
 *
 * R001 controller
 *
 * @copyright       :   ANS-ASIA
 * @author          :   VIETDT - 2019/05/31 - create
 * @author          :
 */

namespace Modules\Master\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use App\Helpers\Dao;
use Carbon\Carbon;
use Session;
use Modules\Common\Http\Controllers\CommonController as common;

class R001Controller extends Controller
{
    protected $screen = 'R001';
    /**
     *  index
     * @author  :   ANS-ASIA VIETDT - 2019/05/31 - create
     * @author  :   
     *
     * @return type_of_return - description
     */

    public function index(Request $request)
    {
        $name_type  = '8';
        $number_cd  = '0';
        $data2 = Dao::call_stored_procedure('SPC_COM_M101_INQ1', array($name_type,$number_cd));
        return view('master::r001.index', initSession($this->screen))
                ->with('data_session', initSession($this->screen, true))
                ->with('data2',$data2);
    }

    /**
     * function referProject
     *
     * @author  :   vietdt - 2019/07/25 - create
     * @author  :   
     *
     * @return type_of_return - description
     */
    public function referProject(Request $request){
       if($request->ajax()) {
            $param = $request->all();
            $data = Dao::call_stored_procedure('SPC_I006_INQ1', $param);
            return view('master::r001.select')
            ->with('data3', $data);
           
        }
    }
}
