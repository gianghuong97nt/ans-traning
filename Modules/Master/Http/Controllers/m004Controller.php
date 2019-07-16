<?php
/**
 * TOSMAC Project
 *
 * M004 controller
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

class M004Controller extends Controller
{
    protected $screen = 'M004';
    /**
     *  index
     * @author  :   ANS-ASIA VIETDT - 2019/05/31 - create
     * @author  :   
     *
     * @return type_of_return - description
     */

    public function index(Request $request)
    {
        $client_cd      = '';
        $client_br_cd   = '';
        if(Session::has('link-session.'.$this->screen)) {
            $screenSession  = Session::get('link-session.'.$this->screen);
            if (isset($screenSession['init_data']['client_cd'])) {
                $client_cd = $screenSession['init_data']['client_cd'];
                $client_br_cd = $screenSession['init_data']['client_br_cd'];
            }
        } 
        $allParams = array($client_cd,$client_br_cd);
        $data = Dao::call_stored_procedure('SPC_M004_INQ1',$allParams);
        $dataCombo = Dao::call_stored_procedure('SPC_M004_INQ2',$allParams);
        return view('master::m004.index',initSession($this->screen))
            ->with('data',$data)
            ->with('data_session',initSession($this->screen,true))
            ->with('dataCombo',$dataCombo)
            ->with('createUpdate', $data[0][0])
            ->with('company_cd', $data[1]);
    }

    /**
     * save
     *
     * @author  :   ANS-ASIA VIETDT - 2019/05/31 - create
     * @author  :
     *
     * @return type_of_return - description
     */
    public function save(Request $request){
        try {
            if($request->ajax()) {    
            	$json                   =   json_encode($request->json()->all());
                $params['json']         =   $json;
                $params['user_id_login']=$request->session()->get('user_id');
                $params['upd_prg'] = 'M004';
                $params['ip'] = $request->ip();
         		$data = Dao::call_stored_procedure('SPC_M004_ACT1', $params);

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
                            'data' => $data,

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
     * @author  :    ANS-ASIA VIETDT - 2019/05/31 - create
     * @author  :
     *
     * @return type_of_return - description
     */
    public function delete(Request $request){
        try {
            if($request->ajax()) {
                $json = json_encode($request->json()->all());
                $params['json'] = $json;
                $params['user_id_login']=$request->session()->get('user_id');
                $params['upd_prg'] = 'M004';
                $params['ip'] = $request->ip();
                $data = Dao::call_stored_procedure('SPC_M004_ACT2', $params);
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
     * function refer_client
     *
     * @author  :    ANS-ASIA VIETDT - 2019/05/31 - create
     * @author  :
     *
     * @return type_of_return - description
     */
    public function refer_client(Request $request)
    {
        if($request->ajax()) {
            $params = $request->all();
            $data = Dao::call_stored_procedure('SPC_M004_INQ1', $params);
            $view = view('layouts._registration_footer')
              ->with('createUpdate',isset($data[0][0])?$data[0][0]: array())->render();
            $view2 = view('master::m004.company_cd')
            ->with('company_cd',isset($data[1])?$data[1]: array())->render();
              
            return response()->json([
                'data' => $data,
                'createUpdate'=>$view,
                'company_cd'   =>$view2,

            ]);
        }
    }
}
