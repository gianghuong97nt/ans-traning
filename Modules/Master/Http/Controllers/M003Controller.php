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
        $company_cd     = '';
        $emp_cd         = '';
        $mode           = 0;
        if(Session::has('link-session.'.$this->screen)) {
            $screenSession  = Session::get('link-session.'.$this->screen);
            if (isset($screenSession['init_data']['company_cd'])) {
                $company_cd = $screenSession['init_data']['company_cd'];
                $emp_cd = $screenSession['init_data']['emp_cd'];
            }
        } 
        $param = array($company_cd,$emp_cd);
        $data = Dao::call_stored_procedure('SPC_M003_INQ1',$param);
        if (isset($data[0][0]['emp_cd']) && $data[0][0]['emp_cd'] != ""){
            $mode = 'U';
        }else{
            $mode = 'A';
        }
        return $view = view('master::m003.index', initSession($this->screen))
        ->with('data_session', initSession($this->screen, true))
        ->with('data_company',$data[1])
        ->with('data_emp_cd',$data[2])
        ->with('emp_cd',$emp_cd)
        ->with('mode',$mode)
        ->with('company_cd',$company_cd)
        ->with('nametype',$data[0][0]['name'])
        ->with('createUpdate', $data[0][0])
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
    public function refer(Request $request){
        $company_cd = $request->company_cd;
        $emp_cd = $request->emp_cd;
        $param = array($company_cd,$emp_cd);
        $data = Dao::call_stored_procedure('SPC_M003_INQ2',$param);
        if (isset($data[0][0]['emp_cd']) && $data[0][0]['emp_cd'] != ''){
            $mode = 'U';
        }else{
            $mode = 'A';
        }
        $view = view('layouts._registration_footer')
        ->with('createUpdate',isset($data[0][0])?$data[0][0]: array())->render();
        //
        return response()->json([
            'data' => $data,
            'mode' => $mode,
            'createUpdate'=>$view
        ]);
//        return response()->json($data);
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
     /**
     * function search
     *
     * @author  :   CHINHNB - 2017/12/18 - create
     * @author  :   
     *
     * @return type_of_return - description
     */
    public function save(Request $request){
        try {
            if($request->ajax()) {
                $params = $request->all();
                $params['user_login']=$request->session()->get('user_id');
                $params['upd_prg'] = 'M003';
                $params['ip'] = $request->ip();
                $params['user_nm_login']=$request->session()->get('user_name');
                $params['company_cd_login'] = $request->session()->get('company_cd');

                $data = Dao::call_stored_procedure('SPC_M003_ACT1', $params);
                if ($data[0][0]['Data'] == 'Exception' || $data[0][0]['Data'] == 'EXCEPTION') {
                    $result = array(
                        'status' => '202',
                        'data' => $data[0],
                    );
                } else if ($data[0][0]['Data'] != '') {
                    $result = array(
                        'status' => '201',
                        'data' => $data[0],
                    );
                } else {
                 $result = array(
                    'status' => '200',
                    'data' => '',
                );
             }

         }
        } catch (\Exception $e) {
        $result = array(
            'status' => '203',
            'data' => '',
        );
        }
        return response()->json($result);
    }


/**
     * function search
     *
     * @author  :   CHINHNB - 2017/12/18 - create
     * @author  :   
     *
     * @return type_of_return - description
*/
    public function delete(Request $request){

            try {
                if($request->ajax()) {
                    $params['company_cd'] = $request->company_cd;
                    $params['emp_cd'] = $request->emp_cd;
                    $params['user_id_login']=$request->session()->get('user_id');
                    $params['upd_prg'] = 'S001';
                    $params['ip'] = $request->ip();
                    $params['company_cd_login'] = $request->session()->get('company_cd');
                    //
                    $data = Dao::call_stored_procedure('SPC_M003_ACT2', $params);
                    //
                    if ($data[0][0]['Data'] == 'Exception' || $data[0][0]['Data'] == 'EXCEPTION') {
                        $result = array(
                            'status' => '202',
                            'data' => $data[0],
                        );
                    } else if ($data[0][0]['Data'] != '') {
                        $result = array(
                            'status' => '201',
                            'data' => array($data[0]),
                        );
                    } else {
                        $result = array(
                            'status' => '200',
                            'data' => '',
                        );
                    }
                }
            } catch (\Exception $e) {
                $result = array(
                    'status' => '203',
                    'data' => '',
                );
            }
            return response()->json($result);
    }
}