<?php

Route::group(['middleware' => 'checkLogin', 'prefix' => 'data', 'namespace' => 'Modules\Data\Http\Controllers'], function()
{
    Route::get('/l013', 'L013Controller@index');

    Route::post('/l013/search', 'L013Controller@postSearch');

    Route::post('/l013/export', 'L013Controller@exportData');

    Route::post('/l013/uploadFile', 'L013Controller@uploadFile');

    Route::post('/l013/import', 'L013Controller@importData');

    /**
     * Route for export R003
     */
    Route::get('/r003', 'R003Controller@index');

});
