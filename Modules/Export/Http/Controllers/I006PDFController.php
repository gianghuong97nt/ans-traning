<?php

namespace Modules\Export\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Dao,Input,Session;
use App\Helpers\Service;

class I006PDFController extends ExcelController{
    
    public function Export(Request $request){
        try{
            $store_name = 'SPC_I006_RPT4';
            $params = $request->all();
            $screen = 'I006';
            $create_date = date('YmdHis');
            $file_name = 'I006発注残一覧表'.$create_date;
            $result = $this->callServicePdf($store_name,$params,$screen,$file_name);
        }catch (\Exception $e){
            $result = array(
                'status'    => '202',
                'data'      => $e->getMessage(),
            );
        }
        $result['download_filename'] = $file_name;
        return response()->json($result);
    }

    public function Export2(Request $request){
        try{
            $store_name = 'SPC_I006_RPT5';
            $params = $request->all();
            $screen = 'I006_2Groud';
            $create_date = date('YmdHis');
            $file_name = 'I006発注残一覧表'.$create_date.'.pdf';
            $result = $this->callServicePdf($store_name,$params,$screen,$file_name);
        }catch (\Exception $e){
            $result = array(
                'status'    => '202',
                'data'      => $e->getMessage(),
            );
        }
        $result['download_filename'] = $file_name;
        return response()->json($result);
    }
    
}