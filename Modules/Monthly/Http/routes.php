<?php

Route::group(['middleware' => 'checkLogin', 'prefix' => 'monthly', 'namespace' => 'Modules\Monthly\Http\Controllers'], function()
{
//    Route::get('/', 'MonthlyController@index');


    Route::get('/i009', 'I009Controller@index');

    Route::post('/i009/search', 'I009Controller@postSearch');

    Route::post('/i009/save', 'I009Controller@save');

    Route::post('/i009/refer', 'I009Controller@refer');
});