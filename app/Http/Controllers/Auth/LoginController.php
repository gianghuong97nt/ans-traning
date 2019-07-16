<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Http\Session;
use Auth;
use App\Helpers\Dao;
use Modules\Common\Http\Controllers\CommonController as common;
use Cookie;
use Response;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest', ['except' => 'logout']);
    }

    public function getLogin(Request $request)
    {
        //common::getMessages();
        common::getLanguageMessage();
        return view('login');
    }
    public function loginAction(Request $request){
        try {
            $localIP = getHostByName(getHostName());
            $params = $request->all();
            unset($params['remember_me']);
            //set cookie user_id
            $params['upd_ip'] = $localIP;
            //
            //
            $data = Dao::call_stored_procedure('SPC_LOGIN_ACT1', $params);

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
                    try{
                        $remember_me=$request->remember_me;
                        $year = time() + 31536000;
                        if ($remember_me=='true') {
                            setcookie('remember_me',$remember_me,$year);
                            setcookie('user_id',$params['user_id'],$year);
                            setcookie('password',$params['password'],$year);
                        }
                        else{
                            setcookie('remember_me',NULL,$year);
                            setcookie('user_id','',$year);
                            setcookie('password','',$year);
                        }
                           } catch (\Exception $e) {
                    }
                    $user_info['user_id']=$params['user_id'];
                    $data_info = Dao::call_stored_procedure('SPC_LOGIN_INQ1',  $user_info);
                    $request->session()->put('user_id',$data_info[0][0]['user_id']);
                    $request->session()->put('user_name',$data_info[0][0]['user_nm']);
                    $request->session()->put('company_cd',$data_info[0][0]['company_cd']);
                    $request->session()->put('company_nm',$data_info[0][0]['company_nm']);
                    $request->session()->put('emp_cd',$data_info[0][0]['emp_cd']);
                    $sidebar_data=common::getSideMenuBar($data_info[0][0]['user_id']);
                    $request->session()->put('sidebar_data', $sidebar_data[0]);
                    $result = array(
                    'status' => '200',
                    'data' => '',
                );
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