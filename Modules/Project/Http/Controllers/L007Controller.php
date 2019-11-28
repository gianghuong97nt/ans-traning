<?php
/**
 * TOSMAC Project
 *
 * S001l controller
 *
 * @copyright       :   ANS-ASIA
 * @author          :   nghianm - 2017/12/18 - create
 * @author          :
 */

namespace Modules\Project\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use App\Helpers\Dao;
use Carbon\Carbon;
use Session;

class L007Controller extends Controller
{
    protected $screen = 'L007';
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

        if(Session::has('link-session.'.$this->screen)) {
            $screenSession  = Session::get('link-session.'.$this->screen);
            if (isset($screenSession['init_data']['company_cd'])) {
                $company_cd = $screenSession['init_data']['company_cd'];
                $emp_cd = $screenSession['init_data']['emp_cd'];
            }
        } 
        $param = array();
        $data = Dao::call_stored_procedure('SPC_L007_INQ1',$param);
        return $view = view('project::l007.index', initSession($this->screen))
        ->with('data_session', initSession($this->screen, true))
        ->with('data',$data[0]);
 
    }
}
