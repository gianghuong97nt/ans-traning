<?php
use App\Http\Middleware\checkLogin;

Route::group(['middleware' => 'checkLogin', 'prefix' => 'common', 'namespace' => 'Modules\Common\Http\Controllers'], function () {
    Route::get('/', 'CommonController@index');
    Route::post('/link/linksession', 'LinkController@linksession');

    Route::post('/refername', 'CommonController@referName');
});
