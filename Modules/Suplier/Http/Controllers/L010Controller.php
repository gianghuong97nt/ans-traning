<?php
/**
 * 
 *
 * L010 controller
 *
 * @copyright       :   ANS-ASIA
 * @author          :   VietDT - 2019/08/13 - create
 * @author          :
 */
namespace Modules\Suplier\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use App\Helpers\Dao;

class L010Controller extends Controller
{
    protected $screen = 'L010';
    /**
     * function index
     *
     * @author  :   VietDT - 2019/08/13 - create
     * @author  :   
     *
     * @return type_of_return - description
     */
    public function index(Request $request)
    {

        $data = $request->session()->get('company_cd');
        return view('suplier::l010.index', initSession($this->screen))
        ->with('data_session', initSession($this->screen, true))
        ->with('data',$data);
    }
    /**
     * function Search
     *
     * @author  :   VietDT - 2019/08/13 - create
     * @author  :   
     *
     * @return type_of_return - description
     */
    public function Search(Request $request)
    {
        if($request->ajax()) {
            $param = $request->all();
            $data  = Dao::call_stored_procedure('SPC_L010_FND1', $param);
            return view('suplier::l010.search')
            ->with('data', $data) 
            ->with('data1', $data[1]);   

        }
    }
     /**
     * function Save
     *
     * @author  :   VietDT - 2019/08/15 - create
     * @author  :   
     *
     * @return type_of_return - description
     */
     public function Save(Request $request){
        try { 
            if($request->ajax()) {
                $json                   =   json_encode($request->json()->all());
                $params['json']         =   $json;
                $params['user_login']   =   $request->session()->get('user_id');
                $params['upd_prg']      =   'L010';
                $params['ip']           =   $request->ip();
                $data = Dao::call_stored_procedure('SPC_L010_ACT1', $params);
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


}
