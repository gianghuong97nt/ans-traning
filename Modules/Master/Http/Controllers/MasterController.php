<?php

namespace Modules\Master\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;

class MasterController extends Controller
{
    public function __construct()
    {
        //$this->middleware('my_auth');
    }

    /**
     * Show the application index.
     * @author tannq@ans-asia.com
     * @created at 2017-08-24 04:10:11
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $data['title'] = 'Master';
        return view('Master::index',$data);
    }

    /**
     * Show the application index.
     * @author tannq@ans-asia.com
     * @created at 2017-08-24 04:10:11
     * @return void
     */
    public function save(Request $request)
    {
        if($request->ajax())
        {
            //return request ajax
        }
        // return http request
    }
}
