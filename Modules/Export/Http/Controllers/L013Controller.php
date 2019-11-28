<?php

namespace Modules\Export\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Dao,Input,Session;
use App\Helpers\Service;

class L013Controller extends ExcelController{

    public function l013PDFExport(Request $request) {
        try{
            $store_name = 'SPC_L013_RPT4';
            $params = $request->all();
            $params['company_cd_login'] = $request->session()->get('company_cd');
            $screen = 'L013';
            $create_date = date('YmdHis');
            $file_name = 'L013弥生用仕入データ一覧照会'.$create_date.'.pdf';

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


    public function l013PDFExport2(Request $request) {
        try{
            $store_name = 'SPC_L013_RPT5';
            $params = $request->all();
            $screen = 'L0132';
            $create_date = date('YmdHis');
            $file_name = 'L013弥生用仕入データ一覧照会'.$create_date.'.pdf';

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