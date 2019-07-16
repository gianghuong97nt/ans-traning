<?php

namespace App\Http\Controllers\Auth;

use App\Helpers\Dao;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;

class LogoutController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index(Request $request)
    {
        $url        = $request->input('url');
        $urlArray   = explode("/", $url);
        $url        = $urlArray[count($urlArray) - 1];
        $company_cd = $request->session()->get('company_cd');
        $user_id    = $request->session()->get('user_id');
        $ip         = getHostByName(getHostName());
        $request->session()->flush();
        $data = Dao::call_stored_procedure('SPC_LOGOUT_ACT1', array($company_cd, $user_id, $url,$ip));
        if ($data[0][0]['Data'] == 'Exception' || $data[0][0]['Data'] == 'EXCEPTION') {
            $result = array(
                'status' => '202',
                'data'   => $data[0],
            );
        } else if ($data[0][0]['Data'] != '') {
            $result = array(
                'status' => '201',
                'data'   => array($data[0]),
            );
        } else {
            $result = array(
                'status' => '200',
                'data'   => '',
            );
        }
        return response()->json($result);
        
//        $request->session()->flush();

    }

    /**
     * Show the form for creating a new resource.
     * @return Response
     */

}
