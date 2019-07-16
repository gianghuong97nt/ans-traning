<?php

namespace App\Http\Middleware;

use Closure;
use Session;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\Route;

class writeLog
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
        //Write log php - Chinhnb
        // $route_method = Route::getFacadeRoot()->current()->methods();
        // $file_name = date("Ymd");
        // $time = date("Y-m-d H:i:s");
        // $file_path = 'log/phplog' . DIRECTORY_SEPARATOR . $file_name . '.log';
        // file_put_contents( $file_path,"\n[". $time . "] ".$route_method[0]."> /" . Route::getFacadeRoot()->current()->uri()."\n",FILE_APPEND);
        //
        return $next($request);
    }
}