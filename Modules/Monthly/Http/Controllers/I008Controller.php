<?php
namespace Modules\Monthly\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use App\Helpers\Dao;
use Illuminate\Support\Facades\Auth;
use Session;

class I008Controller extends Controller
{
    protected $screen = 'I008';

    public function index(Request $request)
    {
        $company_cd = $request->session()->get('company_cd');
        $company_nm = $request->session()->get('company_nm');
        return view('monthly::i008.index',initSession($this->screen))
            ->with('company_cd',$company_cd)
            ->with('company_nm',$company_nm)
            ->with('data_session',initSession($this->screen,true));
    }

    public function save(Request $request){
        try {
            if($request->ajax()) {
                $params['json'] = json_encode($request->all());
                // dd($params['json']);
                $params['user_login']=$request->session()->get('user_id');
                $params['upd_prg'] = 'I008';
                $params['ip'] = $request->ip();
                $params['company_cd_login'] = $request->session()->get('company_cd');
                $data = Dao::call_stored_procedure('SPC_I008_ACT1', $params);
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
    public function searchResult(Request $request)
    {
        if($request->ajax()) {
            $company_cd  = $request->company_cd;
            $section_cd  = $request->section_cd;
            $emp_cd      = $request->emp_cd;
            $estimate_ym = $request->estimate_ym;
            $param = Array (
                'company_cd'        =>  $company_cd??''
            ,   'section_cd'        =>  $section_cd??''
            ,   'emp_cd'            =>  $emp_cd??''
            ,   'estimate_ym'       =>  $estimate_ym??''
            );
            $data  = Dao::call_stored_procedure('SPC_I008_FND1', $param);
           return view('monthly::i008.search',initSession($this->screen))
            ->with('data',$data)
            ->with('data_session',initSession($this->screen,true));
        }
    }
    public function searchSum(Request $request)
    {
        if($request->ajax()) {
            $company_cd  = $request->company_cd;
            $section_cd  = $request->section_cd;
            $emp_cd      = $request->emp_cd;
            $estimate_ym = $request->estimate_ym;
            $param = Array (
                'company_cd'        =>  $company_cd??''
            ,   'section_cd'        =>  $section_cd??''
            ,   'emp_cd'            =>  $emp_cd??''
            ,   'estimate_ym'       =>  $estimate_ym??''
            );
            $result  = Dao::call_stored_procedure('SPC_I008_FND2', $param);
            return response()->json($result);
        }
    }

}