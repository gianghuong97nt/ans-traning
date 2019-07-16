<?php

namespace Modules\Monthly\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use App\Helpers\Dao;

class I009Controller extends Controller
{
    protected $screen = 'I009';

    public function index()
    {
        return view('monthly::i009.index', initSession($this->screen))
            ->with('data_session', initSession($this->screen, true));
    }

    public function postSearch(Request $request)
    {
        if($request->ajax()) {
            $param = $request->all();
            $param['company_cd_login'] = $request->session()->get('company_cd');
            $data  = Dao::call_stored_procedure('SPC_I009_FND1', $param);
            return view('monthly::i009.search')
                ->with('data', $data);
        }
    }

    public function save(Request $request){
        try {
            if($request->ajax()) {
                $params['json'] = json_encode($request->all());
                $params['user_login']=$request->session()->get('user_id');
                $params['upd_prg'] = 'I009';
                $params['ip'] = $request->ip();
                $params['user_nm_login']=$request->session()->get('user_name');
                $params['company_cd_login'] = $request->session()->get('company_cd');
                $data = Dao::call_stored_procedure('SPC_I009_ACT1', $params);
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

    public function refer(Request $request){
        $param = $request->all();
        $data = $data  = Dao::call_stored_procedure('SPC_I009_INQ1', $param);
        if ($data[0][0]['emp_cd'] == 'no result') {
            $result = array(
                'status' => 'no result',
                'emp_cd' => '',
                'emp_nm' => '',
            );
        } else {
            $result = array(
                'status' => 'ok',
                'emp_cd' => $data[0][0]['emp_cd'],
                'emp_nm' => $data[0][0]['emp_nm'],
            );
        }
        return response()->json($result);
    }
}
