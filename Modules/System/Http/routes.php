<?php
use App\Http\Middleware\checkLogin;

Route::group(['middleware' => ['checkLogin','writeLog'], 'prefix' => 'system', 'namespace' => 'Modules\System\Http\Controllers'], function()
{
    Route::get('/db001', 'Db001Controller@index');
    Route::get('/db001/refer_bookmark', 'Db001Controller@refer_bookmark');
    Route::get('/', 'SystemController@index');
    //
    Route::get('s001', 's001Controller@index');
    Route::post('s001/refer_user', 's001Controller@refer_user');
    Route::post('s001/save', 's001Controller@save');
    Route::post('s001/update', 's001Controller@update');
    Route::post('s001/delete', 's001Controller@delete');
    //
    Route::get('s002', 'S002Controller@getIndex');
    Route::post('s002/search', 'S002Controller@search');
    Route::post('s002/save', 'S002Controller@save');
    //
    Route::get('/s001l', 's001lController@index');
    Route::post('/s001l/search', 's001lController@postSearch');
    //
    Route::get('/l999', 'L999Controller@index');
    Route::post('/l999/search', 'L999Controller@postSearch');
});
