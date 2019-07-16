<?php
/**
 * TOSMAC Project
 *
 * S001 controller
 *
 * @copyright       :   ANS-ASIA
 * @author          :   CHINHNB - 2017/12/19 - create
 * @author          :
 */

namespace Modules\System\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use App\Helpers\Dao;
use Carbon\Carbon;
use Session;
use Modules\Common\Http\Controllers\CommonController as common;

class S001Controller extends Controller
{
    protected $screen = 'S001';
    /**
     *
     * @author  :   ANS-ASIA CHINHNB - 2017/11/29 - create
     * @author  :   
     *
     * @return type_of_return - description
     */

    public function index(Request $request)
    {
        $user_id = '';
        $name_type  = '26';
        $number_cd  = '0';
        if(Session::has('link-session.'.$this->screen)) {
            $screenSession  = Session::get('link-session.'.$this->screen);
            if (isset($screenSession['init_data']['user_id'])) {
                $user_id = $screenSession['init_data']['user_id'];
            }
        }
        $allParams = array($user_id);
        $data = Dao::call_stored_procedure('SPC_S001_INQ1',$allParams);
        $data2 = Dao::call_stored_procedure('SPC_COM_M101_INQ1', array($name_type,$number_cd));
        //

        if (isset($data[0][0]['user_id']) && $data[0][0]['user_id'] != ''){
            $mode = 'U';
        }else{
            $mode = 'A';
        }
        //
        $emp_cd  = isset($data[0][0]['emp_cd'])?$data[0][0]['emp_cd']:0;
        $emp_nm = isset($data[0][0]['emp_nm'])?$data[0][0]['emp_nm']:'';
        $company_cd  = isset($data[0][0]['company_cd'])?$data[0][0]['company_cd']:0;
        $company_nm = isset($data[0][0]['company_nm'])?$data[0][0]['company_nm']:'';        
        return view('system::S001.index',initSession($this->screen))
            ->with('data',$data)
            ->with('emp_cd',$emp_cd)
            ->with('emp_nm',$emp_nm)
            ->with('company_cd',$company_cd)
            ->with('company_nm_2',$company_nm)
            ->with('data_session',initSession($this->screen,true))
            ->with('user_id',$request->session()->get('user_id'))
            ->with('company_nm',$request->session()->get('company_nm'))
            ->with('data2',$data2)
            ->with('mode',$mode)
            ->with('createUpdate', $data[0][0]);
    }

    /**
     * save
     *
     * @author  :   chinhnb - 2017/11/29 - create
     * @author  :
     *
     * @return type_of_return - description
     */
    public function save(Request $request){
        try {
            if($request->ajax()) {
            	$params = $request->all();
                unset($params['last_login_date']);
                $params['user_id_login']=$request->session()->get('user_id');
                $params['upd_prg'] = 'S001';
                $params['ip'] = $request->ip();
                $params['user_nm_login']=$request->session()->get('user_name');
                $params['company_cd_login'] = $request->session()->get('company_cd');

                //
         		$data = Dao::call_stored_procedure('SPC_S001_ACT1', $params);
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
                        // $view = view('layouts._registration_footer')
                        // ->with('createUpdate', common::format_DateTime(isset($data[1][0])?$data[1][0]: array()))->render();
                        $result = array(
                            'status' => '200',
                            'data' => '',
                            // 'createUpdate'=>$view,
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
     * delete
     *
     * @author  :   chinhnb - 2017/11/29 - create
     * @author  :
     *
     * @return type_of_return - description
     */
    public function delete(Request $request){
        try {
            if($request->ajax()) {
                $params['user_id'] = $request->user_id;
                $params['user_id_login']=$request->session()->get('user_id');
                $params['upd_prg'] = 'S001';
                $params['ip'] = $request->ip();
                $params['company_cd_login'] = $request->session()->get('company_cd');
                //
                $data = Dao::call_stored_procedure('SPC_S001_ACT2', $params);
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
     /**
     * function refer_user
     *
     * @author  :   ANS-ASIA CHINHNB - 2017/12/08 - modife
     * @author  :
     *
     * @return type_of_return - description
     */
    public function refer_user(Request $request)
    {
        if($request->ajax()) {
            $params = $request->all();
            $data = Dao::call_stored_procedure('SPC_S001_INQ1', $params);
            //
            if (isset($data[0][0]['user_id']) && $data[0][0]['user_id'] != ''){
                $mode = 'U';
            }else{
                $mode = 'A';
            }
            $temp  = isset($data[0][0]['emp_cd'])?$data[0][0]['emp_cd']:0;
            $value = isset($data[0][0]['emp_nm'])?$data[0][0]['emp_nm']:'';
            $view = view('layouts._registration_footer')
                ->with('createUpdate',isset($data[0][0])?$data[0][0]: array())->render();
            //
            return response()->json([
                'data' => $data,
                'mode' => $mode,
                'temp' => $temp,
                'value'=> $value,
                'createUpdate'=>$view
            ]);
        }
    }
}
