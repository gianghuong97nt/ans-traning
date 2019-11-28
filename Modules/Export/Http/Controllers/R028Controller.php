<?php

namespace Modules\Export\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Dao,Input,Session;
use App\Helpers\Service;

class R028Controller extends ExcelController{
    
    public function Export(Request $request){
        try{
            $store_name = 'SPC_R028_RPT1';
            $params = $request->all();
            $params['company_cd'] =$request->session()->get('company_cd');
            $params['user_id'] =$request->session()->get('user_id');
            $screen = 'R028';
            $create_date = date('YmdHis');
            $file_name = 'R028発注残一覧表'.$create_date;
            $result = $this->callServicePdf($store_name,$params,$screen,$file_name);
        }catch (\Exception $e){
            $result = array(
                'status'    => '202',
                'data'      => $e->getMessage(),
            );
        }
        // $result['download_filename'] = $file_name;
        return response()->json($result);
    }
    
}