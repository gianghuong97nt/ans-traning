<?php

namespace Modules\Export\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Dao,Input,Session;
use App\Helpers\Service;
use SQLXML;

class ExcelController extends ExportController{

    /**
     * common method execute service
     */
    protected function callServiceExcel($store_name = '',$params = [],$screen = '',$file_name = '',$split_version = 0){
        $serviceInstance = Service::getInstance();
        $result = $serviceInstance->callService('FNC_OUT_EXL',$store_name,$params,$screen,$file_name,$split_version);
        return $result;
    }

	protected function callServiceCSV($store_name = '',$params = [],$screen = '',$file_name = ''){
		$serviceInstance = Service::getInstance();
		$result = $serviceInstance->callService('FNC_OUT_CSV',$store_name,$params,$screen,$file_name,0);
		return $result;
	}

    protected function callServiceExcelMutil($store_name = '',$params = [],$screen = '',$file_name = ''){
        $serviceInstance = Service::getInstance();
        $result = $serviceInstance->callServiceMutil('FNC_OUT_EXL',$store_name,$params,$screen,$file_name);
        return $result;
    }

    protected function callServicePdf($store_name = '',$params = [],$screen = '',$file_name = ''){
        $serviceInstance = Service::getInstance();
        $result = $serviceInstance->callService('FNC_WEB_PDF',$store_name,$params,$screen,$file_name);
        return $result;
    }

    public function downloadExcel(Request $request){
        $realfile_name = $request->real_filename;
        $filename = urldecode($request->filename);
        $path = config('services.wcf_service.download_path').'/';
        $file = mb_convert_encoding($path.$realfile_name, "SJIS", "auto");
//        $filename = mb_convert_encoding($filename,'SJIS','UTF-8');
        // var_dump(is_readable($file));die;
        $headers = [
            //'Content-Type: application/pdf',
            'Content-type: application/force-download',
            'Content-type: application/download',
            'Content-type: application/octet-stream',
            'Content-type: charset=UTF-8',
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
            $store_name = 'SPC_M001_RPT1';
            $params = $request->all();
            $screen = 'EXAMPLE';
            $file_name = 'GiangTT.xlsx';
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

    public function l013Excel(Request $request){
        try{
            $store_name = 'SPC_L013_RPT1';
            $params = $request->all();
            $params['company_cd_login'] = $request->session()->get('company_cd');
            $screen = 'L013';
            $file_name = '弥生用仕入データ一覧照会.xlsx';

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

    public function l013ExcelPaginate (Request $request) {
        try{
            $store_name = 'SPC_L013_RPT2';
            $params = $request->all();
            $params['company_cd_login'] = $request->session()->get('company_cd');
            $screen = 'L013Paginate';
            $file_name = '弥生用仕入データ一覧照会.xlsx';

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

    public function l013ExcelExport5(Request $request) {
        try{
            $store_name = 'SPC_L013_RPT3';
            $params = $request->all();
            $params['company_cd_login'] = $request->session()->get('company_cd');
            $screen = 'L013Export5';
            $file_name = '弥生用仕入データ一覧照会.xlsx';

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

    public function r003ExcelExport(Request $request) {
        try{
            $store_name = 'SPC_R003_RPT1';
            $params = $request->all();
            $screen = 'R003';
            $file_name = '加工書.xlsx';
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

    public function exportI008(Request $request){
        try{
            $store_name = 'SPC_I008_RPT1';
            $params = $request->all();
            $screen = 'I008';
            $file_name = '予算設定'.date('YmdHis').'.xlsx';

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
    public function exportL007(Request $request){
        try{
            $store_name = 'SPC_L007_RPT1';
            $params = $request->all();
            $screen = 'L007';
            $file_name = 'R012先行仕入リスト'.date('YmdHis').'.xlsx';

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
    public function exportI008_plus(Request $request){
        try{
            $store_name = 'SPC_I008_RPT2';
            $params = $request->all();
            $screen = 'I008_plus';
            $file_name = 'Plus'.date('YmdHis').'.xlsx';

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
    public function exportI008_SheetEx(Request $request){
        try{
            $store_name = 'SPC_I008_RPT2';
            $params = $request->all();
            $screen = 'I008_sheet';
            $file_name = 'Sheet予算設定'.date('YmdHis').'.xlsx';

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
    public function R003Excel(Request $request){
        try{
            $store_name = 'SPC_R003_RPT1';
            $params = $request->all();
            $screen = 'R003';
            $file_name = 'R003加工書（ヘッダ・アッセンブリ）'.date('YmdHis').'.xlsx';

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



    // /**
    //  *  Author: Chinhnb
    //  *  R001 report
    //  */

    // public function ExportR001(Request $request){
    //     try{
    //         $store_name = 'SPC_R001_RPT1';
    //         $params = $request->all();
    //         //
    //         $split_version = $params['split_version'];
    //         //
    //         $screen = 'R001';
    //         $file_name = 'R001見積書（鑑）'.date('YmdHis').'.xlsx';
    //         //
    //         unset($params['split_version']);
    //         //
    //         $result = $this->callServiceExcel($store_name,$params,$screen,$file_name,$split_version);
    //     }catch (\Exception $e){
    //         $result = array(
    //             'status'    => '202',
    //             'data'      => $e->getMessage(),
    //         );
    //     }
    //     $result['download_filename'] = $file_name;
    //     return response()->json($result);
    // }

    /**
     *  Author: ANS-BINHNN - 2018/01/11 - create
     *  R002 report
     */

    public function ExportR002(Request $request){
        try{
            $params = $request->all();
            //
            $client_cd = $params['client_cd'];
            $split_version = $params['split_version'];
            //
            if($client_cd == '' || $client_cd == '0'){
                $screen = 'R002A';
                $store_name = 'SPC_R002A_RPT1';
                $file_name = 'R002見積書A（明細）'.date('YmdHis').'.xlsx';
            }else{
                $screen = 'R002B';
                $store_name = 'SPC_R002B_RPT1';
                $file_name = 'R002見積書B（明細）'.date('YmdHis').'.xlsx';
            }
            unset($params['client_cd']);
            unset($params['split_version']);
            //
            $result = $this->callServiceExcel($store_name,$params,$screen,$file_name,$split_version);
        }catch (\Exception $e){
            $result = array(
                'status'    => '202',
                'data'      => $e->getMessage(),
            );
        }
        $result['download_filename'] = $file_name;
        return response()->json($result);
    }

    /**
     * Report R004 - Process Instruction
     *
     * @author  :   TUANTV - 2017/01/08 - create
     * @author  :
     *
     * @return type_of_return - description
     */

    public function ExportR004(Request $request){
        try{
            $store_name = 'SPC_R004_RPT1';
            $params = [];
            $params['company_cd'] = $request->company_cd;
            $params['project_no'] = $request->project_no;
            $screen = 'R004';
            $create_date = date('YmdHis');
            $file_name = urlencode('R004加工書（加工指示）').$create_date.'.xlsx';
            $result = $this->callServiceExcelMutil($store_name,$params,$screen,$file_name);

        }catch (\Exception $e){
            $result = array(
                'status'    => '202',
                'data'      => $e->getMessage(),
            );
        }
        //$result['download_filename'] = $file_name;
        return response()->json($result);

    }

	/**
	 * Report R008 -
	 *
	 * @author  :   HungNV - 2017/01/08 - create
	 * @author  :
	 *
	 * @return type_of_return - description
	 */

	public function ExportR008(Request $request){
		try{
			$store_name = 'SPC_R008_RPT1';
			//$params = $request->all();
			$params = [];
			$params['company_cd'] = $request->company_cd;
			$params['project_no'] = $request->project_no;
			$params['row_no'] = $request->row_no;
			$screen = 'R008';
			$create_date = date('YmdHis');
			$file_name = urlencode('R008出荷チェックリスト').$create_date.'.xlsx';

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

    /**
     *  Author: ANS-BINHNN - 2018/01/13 - create
     *  R005 report
     */

    public function ExportR005(Request $request){
        try{
            $store_name = 'SPC_R005_RPT1';
            $params = $request->all();
            $screen = 'R005';
            //
            $file_name = 'R005原価表'.date('YmdHis').'.xlsx';
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

    /**
     * Report R004 - Regisster Form
     *
     * @author  :   TUANTV - 2017/01/08 - create
     * @author  :
     *
     * @return type_of_return - description
     */

    public function ExportR009(Request $request){
        try{
            $store_name = 'SPC_R009_RPT1';
            //$params = $request->all();
            $params = [];
            $params['company_cd'] = $request->company_cd;
            $params['project_no'] = $request->project_no;
            $params['row_no'] = $request->row_no;
            $screen = 'R009';
            $create_date = date('YmdHis');
            $file_name = urlencode('R009業務依頼書').$create_date.'.xlsx';

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

    // /**
    //  * Report R011 - 受注残一覧表
    //  *
    //  * @author  :  Chinhnb - 2017/01/12 - create
    //  * @author  :
    //  *
    //  * @return type_of_return - description
    //  */
    public function ExportR011(Request $request){
        try{
            $store_name = 'SPC_R011_RPT1';
            $company_cd = array('company_cd' => $request->session()->get('company_cd') ) ;
            $params=[];
            $params = $request->all();
            $params = $company_cd + $params;
            $screen = 'R011';
            //$file_name = urlencode('R011受注残一覧表').date('YmdHis').'.pdf';
            $result = $this->callServiceExcel($store_name,$params,$screen,'');
        }catch (\Exception $e){
            $result = array(
                'status'    => '202',
                'data'      => $e->getMessage(),
            );
        }
        //$result['download_filename'] = $file_name;
        return response()->json($result);
    }

    /**
     * Report ExportR010 - Regisster Form
     *
     * @author  :   TUANTV - 2017/01/08 - create
     * @author  :
     *
     * @return type_of_return - description
     */
    public function ExportR010(Request $request){
        try{
            $store_name = 'SPC_R010_RPT1';
            $params = $request->all();
            $params['company_cd_u'] =$request->session()->get('company_cd');
            $screen = 'R010';
            $file_name = '';
            $create_date = date('YmdHis');
            if($params['tb_combo'] ==1) {
                $file_name = ('R010受注案件表（部課別）').$create_date;
                $store_name = 'SPC_R010_RPT1';
            }
            if($params['tb_combo'] ==2) {
                $file_name = ('R010受注案件表（担当者別）').$create_date;
                $store_name = 'SPC_R010_RPT2';
            }
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

    public function ExportR012(Request $request){
        try{
            $store_name = 'SPC_R012_RPT1';
            //$params = $request->all();
            $params = [];
            $params['company_cd'] = $request->company_cd;
            $params['sales_recorded_date'] = $request->sales_recorded_date;
            $params['section_nm'] = $request->section_nm;
            $params['emp_nm'] = $request->emp_nm;
            $screen = 'R012';
            $create_date = date('YmdHis');
            // 部署別(作表区分 = 1)
            $file_name = urlencode('R012_先行仕入リスト').$create_date.'.xlsx';


            
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

    /**
     *  Author: Chinhnb
     *  R026 puschase
     */

    public function ExportR026(Request $request){
        try{
            $store_name = 'SPC_R026_RPT1';
            $params = $request->all();
            $screen = 'R026';
            $file_name = 'R026仕入明細表'.date('YmdHis').'.xlsx';
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

    /**
     *  Author: Chinhnb
     *  R030
     */

    public function ExportR030(Request $request){
        try{
            $store_name = 'SPC_R030_RPT1';
            $params = $request->all();
            $params['company_cd_u'] =$request->session()->get('company_cd');
            $screen = 'R030';
            $create_date = date('YmdHis');
            $file_name = 'R030請求書(買掛)'.$create_date;
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

    /**
     *  Author: Chinhnb
     *  R031
     *
     */
     public function ExportR031(Request $request){
         try{
             $store_name = 'SPC_R031_RPT1';
             $params = $request->all();
             $params['company_cd_u'] = $request->session()->get('company_cd');
             $screen = 'R031';
             $create_date = date('YmdHis');
             $file_name = 'R031支払明細書'.$create_date;
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

    /**
     *  Author: Chinhnb
     *  R031
     *
     */
    public function ExportR030_R031(Request $request){
        try{
            $store_name = 'SPC_R030_RPT1';
            $params = $request->all();
            $params['company_cd_u'] = $request->session()->get('company_cd');
            $screen = 'R030_31';
            $create_date = date('YmdHis');
            $file_name = 'R030_R031支払明細書'.$create_date;
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

	public function ExportR017(Request $request){
		try{
			$store_name = 'SPC_R017_RPT1';
			//$params = $request->all();
			$params = [];
			$params['company_cd'] = $request->session()->get('company_cd');
			$params['slip_no'] = $request->slip_no;
			$params['user_cd']=$request->session()->get('user_id');
			$params['user_ip']=$request->ip();
			$screen = 'R017';
			$create_date = date('YmdHis');
			// 部署別(作表区分 = 1)
			$file_name = urlencode('R017請求書').$create_date.'.xlsx';



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

    /**
     *  Author: Chinhnb
     *  R029
     *
     */
    public function ExportR029(Request $request){
        try{
            $store_name = 'SPC_R029_RPT1';
            $params = $request->all();
            $screen = 'R029';
            $file_name = 'R029入庫リスト'.date('YmdHis').'.xlsx';
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

    /**
     *  Author: QuyND
     *  R029
     *
     */
    public function ExportR025(Request $request){
        try{
            $project_no=$request->input('project_no');
            $store_name = 'SPC_R025_RPT1';
            $params = $request->all();
            $screen = 'R025';
            $file_name = 'R025用紙発注書No'.$project_no.'_'.date('YmdHis').'.xlsx';
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

    /**
     * Report R018 - Logistic purchase order form
     *
     * @author  :   TUANTV - 2017/01/31 - create
     * @author  :
     *
     * @return type_of_return - description
     */

    public function ExportR018(Request $request){
        try{
            $project_no=$request->input('project_no');
            $store_name = 'SPC_R018_RPT1';
            $params = [];
            $params['company_cd'] = $request->session()->get('company_cd');
            $params['project_no'] = $request->project_no;
            $params['project_detail_no'] = $request->project_detail_no;
            $params['vendor_cd'] = $request->vendor_cd;
            $params['vendor_branch_cd'] = $request->vendor_branch_cd;
            $params['specification_row_no'] = $request->specification_row_no;

            $screen = 'R018';
            $file_name = 'R018ロジ発注書No'.$project_no.'_'.date('YmdHis').'.xlsx';
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

    /**
     *  Author: QuyND
     *  R006
     *
     */
    public function ExportR006(Request $request){
        try{
            $project_no=$request->input('project_no');
            $store_name = 'SPC_R006_RPT1';
            $params = $request->all();
            $screen = 'R006';
            $file_name = 'R006_型図指示書No'.$project_no.'_'.date('YmdHis').'.xlsx';
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

    /**
     * Report R007 - Carton label order form
     *
     * @author  :   TUANTV - 2017/02/02 - create
     * @author  :
     *
     * @return type_of_return - description
     */
    public function ExportR007(Request $request){
        try{
            $store_name = 'SPC_R007_RPT1';
            $params = [];
            /*$params['company_cd'] = $request->session()->get('company_cd');
            $params['project_no'] = $request->project_no;
            $params['project_detail_no'] = $request->project_detail_no;*/

            $params['company_cd'] = 100;
            $params['project_no'] = 0;
            //$params['project_detail_no'] = 0;

            $screen = 'R007';
            $create_date = date('YmdHis');
            $file_name = urlencode('R007取説カートンラベル発注書').$create_date.'.xlsx';
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

    /**
     *  Author: QuyND
     *  R024
     *
     */
    public function ExportR024(Request $request){
        try{
            $project_no=$request->input('project_no');
            $store_name = 'SPC_R024_RPT1';
            $params = $request->all();
            $params['user_id']=Session::get('user_id');
            $screen = 'R024';
            $file_name = 'R024_発注指示書No'.$project_no.'_'.date('YmdHis').'.xlsx';
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

    /**
     * Report L004 - Sales Achievement Output
     *
     * @author  :   TUANTV - 2018/02/09 - create
     * @author  :
     *
     * @return type_of_return - description
     */

    public function ExportL004(Request $request){
        try{
            $conditions = [];
            $params = [];
            $params['company_cd']  = Session::get('company_cd');
           // $params['company_cd'] = 200;
            $params['year_month_f'] = $request->year_month_f;
            $params['year_month_t'] = $request->year_month_t;
            $conditions['type_div'] = $request->type_div;
            $conditions['classify'] = $request->classify;

            $create_date = date('YmdHis');
            $file_name = '';
            $case = [$conditions['type_div'],$conditions['classify']];
            switch ($case) {
                case array("1","1"):
                    $store_name = 'SPC_R013_RPT1';
                    $screen = 'R013';
                    $file_name = urlencode('R013売上成績書（暫定）').$create_date.'.xlsx';
                break;
                case array("1","2"):
                    $store_name = 'SPC_R014_RPT1';
                    $screen = 'R014';
                    $file_name = urlencode('R014売上成績書（確定）').$create_date.'.xlsx';
                break;
                case array("2","1"):
                    $store_name = 'SPC_R015_RPT1';
                    $screen = 'R015';
                    unset($params['classify']);
                    unset($params['type_div']);
                    $file_name = urlencode('R015工程部門別成績書暫定').$create_date.'.xlsx';
                break;
                case array("2","2"):
                    $store_name = 'SPC_R016_RPT1';
                    $screen = 'R016';
                    unset($params['classify']);
                    unset($params['type_div']);
                    $file_name = urlencode('R016工程部門別成績書確定').$create_date.'.xlsx';
                break;
                default:
                    echo '';
            }
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

    /**
     * Report L011 - Monthly Document Output
     *
     * @author  :   TUANTV - 2018/02/09 - create
     * @author  :
     *
     * @return type_of_return - description
     */

    public function ExportL011(Request $request){
        try{
            $params = [];
            $params['company_cd'] = $request->session()->get('company_cd');
            $params['type_div'] = $request->type_div;
            $params['sales_recorded_date_f'] = $request->sales_recorded_date_f;
            $params['sales_recorded_date_t'] = $request->sales_recorded_date_t;
            $params['project_no'] = $request->project_no;
            $create_date = date('YmdHis');
            $file_name = '';
            switch ($params['type_div']) {
                case 1:
                    $store_name = 'SPC_R032_RPT1';
                    $screen = 'R032';
					unset($params['type_div']);
					unset($params['project_no']);
	                $file_name = urlencode('R032売上予算実績一覧(営業)').$create_date.'.xlsx';
                    break;
                case 2:
                    $store_name = 'SPC_R033_RPT1';
                    $screen = 'R033';
                    unset($params['type_div']);
                    unset($params['project_no']);
                    $file_name = urlencode('R033売上予算実績一覧(生産)').$create_date.'.xlsx';
                    break;
                case 3:
                    $store_name = 'SPC_R034_RPT1';
                    $screen = 'R034';
                    unset($params['type_div']);
                    $file_name = urlencode('案件部署別利益率一覧(原価)').$create_date.'.xlsx';
                    break;
                default:
                    echo '';
            }
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

    public function ExportL013(Request $request){
        try{

            $xml = new SQLXML();
            $rows_xml = $xml->xml($request->rows);
            //
            $params = array();
            $params['company_cd']   = $request->session()->get('company_cd');
            $params['rows_xml']     = $rows_xml;
            $params['user_id']      = $request->session()->get('user_id');;
            $params['user_ip']      = $request->ip();;
            //
            $create_date = date('YmdHis');
            $file_name = urlencode('R035仕入データ').$create_date.".csv";
            $store_name = 'SPC_R035_RPT1';
            $screen = 'R035';
            $result = $this->callServiceCSV($store_name,$params,$screen,$file_name);
        }catch (\Exception $e){
            $result = array(
                'status'    => '202',
                'data'      => $e->getMessage(),
            );
        }
        $result['download_filename'] = $file_name;
        return response()->json($result);
    }

	public function ExportL014(Request $request){
		try{

			$xml = new SQLXML();
			$slip_no_xml = $xml->xml($request->data);
			$user = $request->session()->get('user_id');
			$user_ip = $request->ip();
			$params = array();
			$params[]=$request->session()->get('company_cd');
			$params[]=$slip_no_xml;
			$params[]=$user;
			$params[]=$user_ip;
			$create_date = date('YmdHis');
			$file_name = urlencode('R036売上データ').$create_date.".csv";
			$store_name = 'SPC_R036_RPT1';
			$screen = 'R036';
			$result = $this->callServiceCSV($store_name,$params,$screen,$file_name);
		}catch (\Exception $e){
			$result = array(
				'status'    => '202',
				'data'      => $e->getMessage(),
			);
		}
		$result['download_filename'] = $file_name;
		return response()->json($result);
	}

    /**
     *  Author: BinhNN
     *  R019
     *
     */
    public function ExportR019(Request $request){
        try{
            //
            $params = $request->all();
            //
            $screen = 'R019';
            $store_name = 'SPC_R019_RPT1';
            $file_name = 'R019受注確認書No'.$params['project_no'].'_'.date('YmdHis').'.xlsx';
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

        /**
     *  Author: VIETDT
     *  I006
     *
     */
    public function exportI006(Request $request){
        try{
            $store_name = 'SPC_I006_RPT2';
            $params = $request->all();
            $screen = 'I006';
            $file_name = 'I006_1.xlsx';
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
    public function exportI006page(Request $request){
        try{
            $store_name = 'SPC_I006_RPT3';
            $params = $request->all();
            $screen = 'I006Page';
            $file_name = 'I006_1.xlsx';
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
    public function exportI006sheet(Request $request){
        try{
            $store_name = 'SPC_I006_RPT3';
            $params = $request->all();
            $screen = 'I006Sheet';
            $file_name = 'I006_1.xlsx';
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
    /**
     *  Author: VIETDT
     *  R001
     *
     */
    public function exportR001(Request $request){
        try{
            $store_name = 'SPC_R001_RPT1';
            $params = $request->all();
            $screen = 'R001';
            $file_name = 'R001.xlsx';
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