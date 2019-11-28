<?php
namespace Modules\Data\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use App\Helpers\Dao;
use Session;

class L013Controller extends Controller
{
    protected $screen = 'L013';

    public function index(Request $request)
    {
        $company_cd = $request->session()->get('company_cd');
        return view('data::l013.index')
            ->with('company_cd',$company_cd)
            ->with('last_month',date('Y/m', strtotime('last month')))
            ->with('data_session',initSession($this->screen,true));
    }

    public function postSearch(Request $request)
    {
        if($request->ajax()) {
            $param = $request->all();
            $param['company_cd_login'] = $request->session()->get('company_cd');
            $data  = Dao::call_stored_procedure('SPC_L013_FND1', $param);
            return view('data::l013.search')
                ->with('data', $data);
        }
    }

    public function exportData(Request $request) {
        if($request->ajax()) {
            $param = $request->all();
            $param['company_cd_login'] = $request->session()->get('company_cd');
            $data  = Dao::call_stored_procedure('SPC_L013_FND2', $param);

            // If Data is null then return result is not data;

            if($data[0][0]['company_cd'] == '') {
                $result = array(
                    'result' => 'not data'
                );
                return response()->json($result);
            }

            $filename = "L013_" . date("Ymdhis") . ".csv";
            $fp = fopen($_SERVER["DOCUMENT_ROOT"].'\\download\\'.$filename, 'w');
            fputs( $fp, "\xEF\xBB\xBF" );
            $header = array('会社CD', '伝票No', '案件枝NO','仕様行NO', '明細行NO', '変換','仕入日','仕入先', '内容', '数量', '単価', '仕入金額');
            fputcsv($fp,$header);
            foreach ( $data[0] as $rows ) {
                fputcsv($fp, $rows);
            }
            fclose($fp);
            $result = array(
                'filename' => $filename
            );
            return response()->json($result);
        }
    }

    public function importData(Request $request) {
        $filename = $request->file;
        $file = fopen($_SERVER["DOCUMENT_ROOT"].'\\uploads\\'.$filename, 'r');
        $globalArr = [];
        while (($line = fgetcsv($file)) !== FALSE) {
            $globalArr[] = $line;
        }
    }

    public function uploadFile(Request $request) {
        $file = $request->file('file');
        $result = [];
        //Check file is csv or is not csv
        $mimes = array('application/vnd.ms-excel','text/plain','text/csv','text/tsv');
        // if file is not csv then message error
        if(!in_array($_FILES['file']['type'],$mimes)){
            $result['error'] = 'error scv';
            return response()->json($result);
        }
        $globalArr = file($file);
        $json = [];
        //get each array to json
        for ($i = 1 ; $i < count($globalArr)-1 ; $i++){
            $globalArr[$i] = rtrim($globalArr[$i], "\n");
            $array = explode(",",$globalArr[$i]);
            if(count($array) == 12) {
                $item['company_cd'] = $array[0];
                $item['project_no'] = $array[1];
                $item['row_no'] = $array[2];
                $item['specification_row_no'] = $array[3];
                $item['order_dtl_no'] = $array[4];
                $item['item_nm'] = $array[8];
                $item['cost_qty'] = $array[9];
                $item['cost_upr'] = $array[10];
                $item['cost_amt'] = $array[11];
                $json[] = $item;
            }else {
                // if file is wrong format then message error
                $result['error'] = 'error column';
                return response()->json($result);
            }
        }
        $params['json'] =   json_encode($json);
        $params['user_login']=$request->session()->get('user_id');
        $params['upd_prg'] = 'L013';
        $params['ip'] = $request->ip();
        $params['company_cd_login'] = $request->session()->get('company_cd');
        $data  = Dao::call_stored_procedure('SPC_L013_ACT1', $params);

        if(isset($data[0][0]['company_cd']) && $data[0][0]['company_cd'] != '') {
            $filename = "L013_Error_" . date("Ymdhis") . ".csv";
            $fp = fopen($_SERVER["DOCUMENT_ROOT"].'\\download\\'.$filename, 'w');
            fputs( $fp, "\xEF\xBB\xBF" );
            $header = array('会社CD', '伝票No', '案件枝NO','仕様行NO', '明細行NO', '内容', '数量', '単価', '仕入金額','message');
            fputcsv($fp,$header);
            foreach ( $data[0] as $rows ) {
                fputcsv($fp, $rows);
            }
            fclose($fp);
            $result['filename'] = $filename;
        } else {
            $result['filename'] = '';
        }
        return response()->json($result);
    }
}
