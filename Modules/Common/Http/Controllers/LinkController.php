<?php

namespace Modules\Common\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Dao, Input, Session;

class LinkController extends CommonController
{
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
    public static function linksession()
    {
        $result = array();
        try {

            // 2016/07/27 - ANS768 - ADD_Begin
            $linkInfo = array();
            $from_screenId = Input::get('from_ScreenId');
            $to_screenId = Input::get('to_ScreenId');
            $parramObj = Input::get('param');

            // save to session
            session(['link-session.' . $from_screenId . '.from_ScreenId' => $from_screenId]);
            session(['link-session.' . $from_screenId . '.to_ScreenId' => $to_screenId]);
            session(['from_screen' => $from_screenId]);
            session(['to_screen' => $to_screenId]);

            foreach ($parramObj as $key => $value) {
                session(['link-session.' . $from_screenId . '.' . $key => $value]);
            }
//            print_r(session::get('link-session'));

            $result = array(
                'status' => 'OK',
                'data' => '',
            );
        } catch (\Exception $e) {
            $result = array(
                'status' => 'EX',
                'data' => '',
            );
        }
        return $result;
    }
}
