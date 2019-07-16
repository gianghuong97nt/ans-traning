<?php

namespace App\Http\Middleware;

use Closure;
use Session;
use Illuminate\Support\Facades\View;

class checkLoginReport
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {

        if (Session::get('user_id')==NULL) {
	        if($request->isXmlHttpRequest()){
		        return response()->json(array('login'=>"timeout"),404);
	        }
	        return redirect()->guest('/');
//            return redirect('/');
        }
        return $next($request);
    }

}