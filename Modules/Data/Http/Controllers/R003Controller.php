<?php
namespace Modules\Data\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use App\Helpers\Dao;
use Session;

class R003Controller extends Controller
{
    protected $screen = 'R003';

    public function index(Request $request)
    {
        $company_cd = $request->session()->get('company_cd');
        $company_nm = $request->session()->get('company_nm');
        return view('data::r003.index')
            ->with('company_cd',$company_cd)
            ->with('company_nm',$company_nm)
            ->with('data_session',initSession($this->screen,true));
    }
}
