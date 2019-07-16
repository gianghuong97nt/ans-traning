<?php

namespace App\Http\Middleware;

use Closure;
use Session;

class checkLoginPopup
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
        // not login
        if (Session::get('user_id')==NULL) {
            return redirect('/');
        }
        return $next($request);
    }
}