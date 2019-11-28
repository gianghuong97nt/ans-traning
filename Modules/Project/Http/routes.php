<?php

Route::group(['middleware' => 'checkLogin', 'prefix' => 'project', 'namespace' => 'Modules\Project\Http\Controllers'], function()
{
    Route::get('/l007', 'L007Controller@index');
});
