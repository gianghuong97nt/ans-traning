<?php

namespace Modules\Common\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\View;
use App\Helpers\Dao;
use App;
use File;

class CommonController extends Controller
{
    public function __construct()
    {

    }

    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index()
    {

        return view('common::index');
    }

    /**
     * get all message with language
     *
     * @author      :   Binhnn     - 2017/11/23 - create
     * @author      :
     * @param       :   null
     * @access      :   public
     * @see         :
     */
//    public static function getMessages(){
//        //execute store procedure
//        global $_text;
//        global $_type;
//        global $_title;
//
//        if (!file_exists(public_path("/js/message/msg.js"))) {
//            touch(public_path("/js/message/msg.js"));
//        }
//
//         $data =Dao::call_stored_procedure('SPC_GET_MESSAGE_LST');
//         if (isset($data[0])){
//             foreach ($data[0] as $row){
//                 $_text[$row['message_no']] 	= htmlspecialchars_decode($row['message']);
//                 $_type[$row['message_no']] 	= $row['message_typ'];
//                 $_title[$row['message_no']] = $row['message_nm'];
//             }
//             //$this->view->msg = $_text;
//             $script  = "var _text = " . json_encode($_text, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP) . ";";
//             $script .= "var _type = " . json_encode($_type, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP) . ";";
//             $script .= "var _title = " . json_encode($_title, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP) . ";";
//             @file_put_contents(public_path("/js/message/msg.js"), $script);
//         }
//    }

    /**
     * get all message with language
     *
     * @author      :   vuongvt     - 2016/07/04 - create
     * @author      :
     * @param       :   null
     * @return      :   null
     * @access      :   public
     * @see         :
     */
    public static function getMessages()
    {
        //execute store procedure
        $data = Dao::call_stored_procedure('SPC_GET_MESSAGE_LST');
        if (isset($data[0])) {
            return $data[0];
        }

    }


    /**
     * get message and update into file msg.js
     *
     * @author      :   vuongvt      - 2016/07/04 - create
     * @author      :   kyvd         - 2016/07/15 - update write file js
     * @param       :   null
     * @return      :   null
     * @access      :   public
     * @see         :
     */
    public static function getLanguageMessage()
    {
        // language folder path
//		return \DB::table('s_user')->get();
        $lang_folder_path = base_path() . '/public/js/message/';

        // language folder path
        $translate_folder_path = base_path() . '/resources/lang/ja/';
        $translate_file_path = $translate_folder_path . 'translates.php';
        $translates_text = "<?php return [ 'messages'	=>	[";


        // get all languages from Database
        $lang_file_path = $lang_folder_path . 'msg' . '.js';
        $_text = [];
        $_type = [];
        $_title = [];
        $script = '';
        if (File::exists($lang_folder_path)) {
            $message_data = self::getMessages();
            if (!empty($message_data)) {
                foreach ($message_data as $row) {
                    $_text[$row['message_no']] = htmlspecialchars_decode($row['message']);
                    $_type[$row['message_no']] = $row['message_typ'];
                    $_title[$row['message_no']] = $row['message_nm'];

                    $translates_text = $translates_text . "'" . $row['message_no'] . "'" . "	=>" . "'" . htmlspecialchars_decode($row['message']) . "', ";

                    $script = "var _text = " . json_encode($_text, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP) . ";";
                    $script .= "var _type = " . json_encode($_type, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP) . ";";
                    $script .= "var _title = " . json_encode($_title, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP) . ";";
                }
            }
            $translates_text = $translates_text . "]," . " ];";
            $bytes_written = File::put($lang_file_path, $script);
            // write into file translates
            $translate_written = File::put($translate_file_path, $translates_text);
        }

        View::share('_text', $_text);
    }

    /**
     * refer name
     *
     * @author      :   DuyTP - 2017/07/25 - created
     * @author      :
     * @param       :   null
     * @return      :   null
     * @access      :   public
     * @see         :
     */
    public function referName(Request $request)
    {
        $allParams = $request->all();
        if ($allParams['key'] == 'M002') {
        /*Chinhnb- if this screen had item company_cd */
            if ($request->company_cd!=0) {
                $allParams['option1']=$request->company_cd;
            }
        }
        $data = Dao::call_stored_procedure('SPC_COMMON_REFER', $allParams);

        if (isset($data[0][0])) {
            return response()->json($data[0][0]);
        } else {
            return response()->json('');
        }

    }

    /**
     * do download
     *
     * @author      :   DuyTP - 2017/08/25 - created
     * @author      :
     * @param       :   path to file ( name includes )
     * @return      :   null
     * @access      :   public
     * @see         :
     */
    public function doDownload(Request $request)
    {
        $pathtofile = $request->pathtofile;

        // $file = $pathtofile;
        $file = mb_convert_encoding($pathtofile, "SJIS", "auto");

        return response()->download($file);
    }

    /**
     * get side menu bar data
     *
     * @author      :   QuyND - 2017/12/5 - created
     * @author      :
     * @param       :   path to file ( name includes )
     * @return      :   null
     * @access      :   public
     * @see         :
     */

    public static function getSideMenuBar($user_id)
    {
        $data = Dao::call_stored_procedure('SPC_S003_LST1', array($user_id));
        return $data;
    }

    /**
     * format time
     * @author    ANS-ASIA BINHNN
     * @param array
     * @return array
     */
    public static function format_DateTime($data = array(), $type = 'Y/m/d H:i', $keys = array())
    {
        if (!empty($data['cre_date'])) {
            $data['cre_date'] = $data['cre_date'] != '' ? date_format(date_create($data['cre_date']), 'Y/m/d H:i') : '';
        }
        if (!empty($data['upd_date'])) {
            $data['upd_date'] = $data['upd_date'] != '' ? date_format(date_create($data['upd_date']), 'Y/m/d H:i') : '';
        }

        foreach ($keys as $key) {
            if (!empty($data[$key])) {
                $data[$key] = date_format(date_create($data[$key]), $type);
            }
        }
        return $data;
    }
}
