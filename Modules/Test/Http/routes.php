<?php
use App\Http\Middleware\checkLogin;
Route::group(['middleware' => ['checkLogin','writeLog'], 'prefix' => 'test', 'namespace' => 'Modules\Test\Http\Controllers'], function()
{
    Route::get('/', 'TestController@index');
    Route::get('/demo', 'demoController@index');
});
