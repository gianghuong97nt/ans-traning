<?php
/**
 * TOSMAC Project
 *
 * M001 controller
 *
 * @copyright       :   ANS-ASIA
 * @author          :   CHINHNB - 2017/12/19 - create
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

class M001Controller extends Controller
{
    protected $screen = 'M001';

    public function index(Request $request)
    {
        $company_cd = $request->all();
        $data = Dao::call_stored_procedure('SPC_M001_INQ1',$company_cd);
        if (isset($data[0][0]['company_cd']) && $data[0][0]['company_cd'] != ''){
            $mode = 'U';
        }else{
            $mode = 'A';
        }
        return view('master::m001.index',initSession($this->screen))
            ->with('data',$data)
            ->with('data_session',initSession($this->screen,true))
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

                $params['user_login']=$request->session()->get('user_id');
                $params['upd_prg'] = 'M001';
                $params['ip'] = $request->ip();
                $params['user_nm_login']=$request->session()->get('user_name');
                $params['company_cd_login'] = $request->session()->get('company_cd');

                $data = Dao::call_stored_procedure('SPC_M001_ACT1', $params);
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
                        'data' => $data[1],
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

    public function refer(Request $request){
        $company_cd = $request->all();
        $data = Dao::call_stored_procedure('SPC_M001_INQ1',$company_cd);
        if (isset($data[0][0]['company_cd']) && $data[0][0]['company_cd'] != ''){
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
                $params['company_cd'] = $request->company_cd;
                $params['user_id_login']=$request->session()->get('user_id');
                $params['upd_prg'] = 'S001';
                $params['ip'] = $request->ip();
                $params['company_cd_login'] = $request->session()->get('company_cd');
                //
                $data = Dao::call_stored_procedure('SPC_M001_ACT2', $params);
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
