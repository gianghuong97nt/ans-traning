<?php

namespace Modules\Master\Http\Controllers;

use Illuminate\Http\Request;
//use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use App\Helpers\Dao;
use Carbon\Carbon;
use App\Helpers\Paging;

class HomepageController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index()
    {
        return view('master::homepage.index');
    }

}
