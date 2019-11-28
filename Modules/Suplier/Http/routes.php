<?php

Route::group(['middleware' => 'checkLogin', 'prefix' => 'suplier', 'namespace' => 'Modules\Suplier\Http\Controllers'], function()
{
//    Route::get('/', 'MonthlyController@index');
	//i006
    Route::get('/i006', 'I006Controller@index');
    Route::post('i006/referProject', 'I006Controller@referProject');
    Route::post('i006/referProjectdtlno', 'I006Controller@referProjectdtlno');
    Route::post('i006/referVendor', 'I006Controller@referVendor');
    Route::post('i006/search', 'I006Controller@Search');
    Route::post('i006/save', 'I006Controller@Save');
    Route::post('i006/Export', 'I006Controller@export');
    Route::post('i006/deleteFile', 'I006Controller@deleteFile');
    Route::post('i006/import', 'I006Controller@import');
    //l010
    Route::get('/l010', 'L010Controller@index');
    Route::post('l010/search', 'L010Controller@Search');
    Route::post('l010/save', 'L010Controller@Save');
    
});