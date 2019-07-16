<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use Session;
class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */
    public function handle($request, Closure $next, $guard = null)
    {
        if (Session::get('user_id')!=null) {
	        if($request->isXmlHttpRequest()){
		        return response()->json(['user has been login in other tab'],404);
	        }
            return redirect('/system/db001');
        }

        return $next($request);
    }
  
}
