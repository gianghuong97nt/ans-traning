<?php

namespace Modules\Export\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Dao,Input,Session;
use App\Helpers\Service;

class I008pdfController extends ExcelController{
    
    public function Find_i008pdf(Request $request){
        try{
            $store_name = 'SPC_I008_RPT3';
            $params = $request->all();
            $screen = 'I008_PDFFind';
            $create_date = date('YmdHis');
            $file_name = 'I008予算設定'.$create_date;
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