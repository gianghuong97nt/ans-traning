<?php

namespace Modules\Common\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;

class ErrorController extends CommonController
{
    public function accessDeni(){
        return view('errors.401');
    }
}