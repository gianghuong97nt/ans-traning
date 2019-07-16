<?php
namespace Modules\Common\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Dao,Input,Session;
use App\Helpers\Service;

class ExcelController extends CommonController{

    /**
     * common method execute service
     */
    private function callServiceExcel($store_name = '',$params = [],$screen = '',$file_name = ''){
        $serviceInstance = Service::getInstance();
        $result = $serviceInstance->callService('FNC_OUT_EXL',$store_name,$params,$screen,$file_name);
        return $result;
    }

    public function downloadExcel(Request $request){
        $realfile_name = $request->real_filename;
        $filename = $request->filename;

        $path = config('services.wcf_service.download_path').'/';
        $file = mb_convert_encoding($path.$realfile_name, "SJIS", "auto");
        // var_dump(is_readable($file));die;
        $headers = [
            //'Content-Type: application/pdf',
            'Content-type: application/force-download',
            'Content-type: application/download',
            'Content-type: application/octet-stream',
            'Content-Disposition:attachment; file_store_nm="'.$filename.'"',
            'Content-Description: File Transfer',
            'Content-Transfer-Encoding:binary',
            // 'Content-Length:'.filesize($file),
            'Expires: 0',
        ];
        return response()->download($file,$filename, $headers);
    }

    /**
     *  action post request service
     *  1 report as 1 action
     */
    public function exampleExcel(Request $request){
        try{
            $store_name = 'SPC_EXAMPLE_REPORT_RPT1';
            $params = $request->all();
            $screen = 'EXAMPLE';
            $file_name = 'example.xlsx';

            $result = $this->callServiceExcel($store_name,$params,$screen,$file_name);
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