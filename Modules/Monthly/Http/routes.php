<?php

Route::group(['middleware' => 'checkLogin', 'prefix' => 'monthly', 'namespace' => 'Modules\Monthly\Http\Controllers'], function()
{
//    Route::get('/', 'MonthlyController@index');


    Route::get('/i009', 'I009Controller@index');

    Route::post('/i009/search', 'I009Controller@postSearch');

    Route::post('/i009/save', 'I009Controller@save');

    Route::post('/i009/refer', 'I009Controller@refer');

    //i008
    Route::get('/i008', 'I008Controller@index');

    Route::post('/i008/result', 'I008Controller@searchResult');
    Route::post('/i008/sum', 'I008Controller@searchSum');
    Route::post('/i008/save', 'I008Controller@save');

    // Route::post('/i009/refer', 'I009Controller@refer');
});