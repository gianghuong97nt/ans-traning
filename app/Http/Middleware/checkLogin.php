<?php

namespace App\Http\Middleware;

use Closure;
use Session;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\Route;

class checkLogin
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
        $method = $request->method();
        $route = $request->path();
        $permission_by_url = [];
        // not login

        if (Session::get('user_id')==NULL) {
	        if($request->isXmlHttpRequest()){
		        return response()->json(array('login'=>"timeout"),404);
	        }
	        return redirect()->guest('/');
//            return redirect('/');
        }else{
            $side_bar_data = Session::get('sidebar_data');
            $permission_by_url = $this->getPermission($side_bar_data);
            //loged in but not have any permission
            if($side_bar_data==NULL){
                return redirect('/');
            }else{
                if($method == 'GET'){
                    $hasError = false;
                    $route = '/'.$route;

                    if(isset($permission_by_url[$route])){
                        if($permission_by_url[$route]['avail_typ']!='1'){
                            $hasError = true;
                        }
                    }else{
                        $hasError = true;
                    }

                    if($hasError){
                        return redirect('common/accessdeni');
                    }
                }
            }
        }
        View::share('route', $route);
        View::share('permission', $permission_by_url);
        return $next($request);
    }

    private function getPermission($permission){
        $permission_by_url = [];
        foreach ($permission as $item){
            if(isset($item['prg_id'])) {
                if($item['prg_id']!='' && $item['prg_url']!=''){
                    $permission_by_url[$item['prg_url']] = [
                        'avail_mnu_typ' => isset($item['avail_mnu_typ'])?$item['avail_mnu_typ']:'0'
                        ,   'avail_upd_typ' => isset($item['avail_upd_typ'])?$item['avail_upd_typ']:'0'
                        ,   'avail_del_typ' => isset($item['avail_del_typ'])?$item['avail_del_typ']:'0'
                        ,   'avail_out_typ' => isset($item['avail_out_typ'])?$item['avail_out_typ']:'0'
                        ,   'avail_typ' => isset($item['avail_typ'])?$item['avail_typ']:'0'
                    ];
                }
            }

        }
        return $permission_by_url;
    }
}