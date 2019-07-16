<?php

namespace Modules\System\Http\Controllers;

use Illuminate\Http\Request;
//use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use App\Helpers\Dao;
use Carbon\Carbon;
use App\Helpers\Paging;


class Db001Controller extends Controller
{
    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index(Request $request)
    {
        $user_id = $request->session()->get('user_id');
        $new_data = [];
        $data = Dao::call_stored_procedure('SPC_DB001_INQ1',array($user_id));
        foreach($data[0] as $row){
             if($row['setting_order']!='')
                 $new_data[$row['setting_order']] = $row;
        }
        return view('system::db001.index')->with('data',$new_data);
    }

    public function refer_bookmark(Request $request) {
        $data = $request->all();
        $content = view('system::db001.refer_bookmark')
            ->with('data',$data)->render();
        $res = [
            'content' =>$content
        ];
        return response()->json($res);
    }

}
