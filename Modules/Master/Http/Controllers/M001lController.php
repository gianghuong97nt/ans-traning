<?php
/**
 * TOSMAC Project
 *
 * m001l controller
 *
 * @copyright       :   ANS-ASIA
 * @author          :   CHINHNB - 2017/12/18 - create
 * @author          :
 */

namespace Modules\Master\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use App\Helpers\Dao;
use Carbon\Carbon;
use Session;

class M001lController extends Controller
{
    protected $screen = 'M001L';

    public function index()
    {
        return view('master::m001l.index', initSession($this->screen))
            ->with('data_session', initSession($this->screen, true));
    }

    public function postSearch(Request $request)
    {
        if($request->ajax()) {
            $param = $request->all();
            $data  = Dao::call_stored_procedure('SPC_M001L_FND1', $param);
            return view('master::m001l.search')
                ->with('data', $data)
                ->with('paging', $data[1][0]);
        }
    }
}
