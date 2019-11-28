<?php
/**
 * 
 *
 * I006 controller
 *
 * @copyright       :   ANS-ASIA
 * @author          :   vietdt - 2019/05/30 - create
 * @author          :
 */
namespace Modules\Suplier\Http\Controllers;

use Illuminate\Http\Request;
// use Illuminate\Http\Response;
use Illuminate\Support\Facades\Response;
use Illuminate\Routing\Controller;
use App\Helpers\Dao;
use Excel;

class I006Controller extends Controller
{
    protected $screen = 'I006';
    /**
     * function index
     *
     * @author  :   vietdt - 2019/07/25 - create
     * @author  :   
     *
     * @return type_of_return - description
     */
    public function index(Request $request)
    {
        $data['company_cd'] = $request->session()->get('company_cd');
        $data['searchFlag'] = 1;
        return view('suplier::i006.index', initSession($this->screen))
        ->with('data_session', initSession($this->screen, true))
        ->with('data',$data);
    }
     /**
     * function referProjectdtlno
     *
     * @author  :   vietdt - 2019/07/25 - create
     * @author  :   
     *
     * @return type_of_return - description
     */
     public function referProjectdtlno(Request $request){
       if($request->ajax()) {
            $param = $request->all();
            $data = Dao::call_stored_procedure('SPC_I006_INQ3', $param);
                return view('suplier::i006.select')
                    ->with('data2', $data);


        }
    }
    /**
     * function referProject
     *
     * @author  :   vietdt - 2019/07/25 - create
     * @author  :   
     *
     * @return type_of_return - description
     */
    public function referProject(Request $request){
       if($request->ajax()) {
            $param = $request->all();
            $data = Dao::call_stored_procedure('SPC_I006_INQ1', $param);
            // dd($data);
            return view('suplier::i006.select')
            ->with('data2', $data);
           
        }
    }
    /**
     * function Search
     *
     * @author  :   vietdt - 2019/07/25 - create
     * @author  :   
     *
     * @return type_of_return - description
     */
    public function Search(Request $request)
      {
        if($request->ajax()) {
            $param = $request->all();
            // dd($param);
            $data  = Dao::call_stored_procedure('SPC_I006_FND1', $param);
            return view('suplier::i006.search')
            ->with('data', $data)
            ->with('paging', $data[1][0]);
        }
    }
    /**
     * function Save
     *
     * @author  :   vietdt - 2019/07/25 - create
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
                $params['upd_prg']      =   'I006';
                $params['ip']           =   $request->ip();
                $data = Dao::call_stored_procedure('SPC_I006_ACT1', $params);
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
     /**
     * function export
     *
     * @author  :   vietdt - 2019/07/25 - create
     * @author  :   
     *
     * @return  :   json
     */
    public function export(Request $request)
    {
        if($request->ajax()) 
        {
            $param = $request->all();
            $data  = Dao::call_stored_procedure('SPC_I006_RPT1', $param);
            $array = $data[0];
            header('Content-Type: application/csv');
            $filename =date("Ymd_His").'i006.csv';
            $file_url = $_SERVER["DOCUMENT_ROOT"].'\\download\\'.$filename;
            $f = fopen($file_url, 'w');
            $BOM = "\xEF\xBB\xBF";
            fwrite($f,$BOM);
            foreach ($array as $row) {
              fputs($f, implode($row, ',')."\n");
            }
            $result = array(
                    'status' => '200',
                    'fileNameSave' => '/download/'.$filename,
                );
            return response()->json($result);    
        }
    } 
    /**
     * function deleteFile
     *
     * @author  :   vietdt - 2019/07/25 - create
     * @author  :   
     *
     * @return  :   notReturn
     */
    public function deleteFile(Request $request)
      {
        if($request->ajax()) {
            $param = $request->all();
            $file_url = $_SERVER["DOCUMENT_ROOT"].$param['linkfile'];
            unlink($file_url);
        }
    }
    /**
     * function import
     *
     * @author  :   vietdt - 2019/07/25 - create
     * @author  :   
     *
     * @return result - description
     */
    public function import(Request $request)
    {
        try { 
            $file       = $request->file('file');
            ini_set('memory_limit', '-1');
                ini_set('post_max_size', '20M');
                ini_set('upload_max_filesize', '240M');
            $extension  = $file->getClientOriginalExtension();
            if ($extension == "csv") {
                
                $row = 0;
                $arrfile = file($file);
                $results = array();
                foreach ($arrfile as $key=> $row) {
                    $row        = preg_split('/,(?!(?:[^",]|[^"],[^"])+")/', trim($row));
                    $checkarray = array();
                    foreach ($row as $indexs => $value) {
                        $checkarray[$indexs] = $value;  
                    }
                    $results[$key] = $checkarray;
                }
                if(!empty($results)){
                   unset($results[0]); // xoa ban ghi dau tien
                }
                $csv = array();
                $json['data_json'] = array();
                $error = 0;
                if(!empty($results)){
                    foreach ($results as $key=> $result) {
                        $col_count = count($result);
                        if ($col_count == 16) {
                            $row = $key-1; 
                            $csv[$row]['id_row']                = $result[0];
                            $csv[$row]['company_cd']            = $result[1];
                            $csv[$row]['project_no']            = $result[2];
                            $csv[$row]['project_dtl_no']        = $result[3];
                            $csv[$row]['specification_row_no']  = $result[4];
                            $csv[$row]['order_dtl_no']          = $result[5];
                            $csv[$row]['detail_type_div_name']  = $result[6];
                            $csv[$row]['order_no']              = $result[7];
                            $csv[$row]['contents']              = $result[8];
                            $csv[$row]['order_qty']             = $result[9];
                            $csv[$row]['order_upr']             = $result[10];
                            $csv[$row]['order_amt']             = $result[11];
                            $csv[$row]['sales_amt']             = $result[12];
                            $csv[$row]['vendor']                = $result[13];
                            $csv[$row]['vendor_nm']             = $result[14];
                            $csv[$row]['profit']                = $result[15];
                        }else{
                             $error++;
                        }
                    }
                    if($error >0 ){
                        $result = array(
                                'status' => '204',
                                'noMsg' => '59',
                            );
                    }else{
                        $json['data_json'] = $csv;
                        $params['json']         =   json_encode($json);
                        if ($params['json'] !=false) {
                            $params['user_login']   =   $request->session()->get('user_id');
                            $params['upd_prg']      =   'I006';
                            $params['ip']           =   $request->ip();
                            $data = Dao::call_stored_procedure('SPC_I006_ACT2', $params);
                            if ($data[0][0]['Data'] == 'Exception' || $data[0][0]['Data'] == 'EXCEPTION') {
                                $result = array(
                                    'status' => '202',
                                    'data' => $data[0],
                                );
                            } else if ($data[0][0]['Data'] != '') {
                                    $array = $data[1];
                                    header('Content-Type: application/csv');
                                    $filename =date("Ymd_His").'i006_error.csv';
                                    $file_url = $_SERVER["DOCUMENT_ROOT"].'\\download\\'.$filename;
                                    $f = fopen($file_url, 'w');
                                    $BOM = "\xEF\xBB\xBF";
                                    fwrite($f,$BOM);
                                    foreach ($array as $row) {
                                      fputs($f, implode($row, ',')."\n");
                                    }
                                    $result = array(
                                        'status' => '201',
                                        'fileNameSave' => '/download/'.$filename,
                                    );
                            } else {
                                $result = array(
                                    'status' => '200',
                                    'data' => '',
                                );
                            }
                        }else{
                            $result = array(
                                'status' => '204',
                                'noMsg' => '59',
                            );
                        }
                    }
                }
            }else{
                 $result = array(
                    'status' => '204',
                    'noMsg' => '58',
                );
            }
        } catch (\Exception $e) {
            $result = array(
                'status' => '203',
                'noMsg' => '',
            );
        }
       return response()->json($result);
    }
}
