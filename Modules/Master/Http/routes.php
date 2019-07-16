<?php
use App\Http\Middleware\checkLogin;

Route::group(['middleware' => 'checkLogin', 'prefix' => 'master', 'namespace' => 'Modules\Master\Http\Controllers'], function () {
    Route::get('/homepage', 'HomepageController@index');
    Route::get('/', 'MasterController@index');
   
    //M001 - ANS-ASIA TUANTV
    Route::get('/m001', 'M001Controller@index');
    Route::post('/m001/save', 'M001Controller@save');
    Route::post('/m001/refer', 'M001Controller@refer');
    Route::post('/m001/delete', 'M001Controller@delete');
    //M001L
    Route::get('/m001l', 'm001lController@index');
    /*Route::get('/m001l', 'm001lController@getSearch');*/
    Route::post('/m001l/search', 'm001lController@postSearch');

    //M002 - ANS-ASIA BINHNN
    Route::get('/m002', 'm002Controller@index');
    Route::get('/m002', 'm002Controller@index');
    Route::post('/m002/save', 'M002Controller@save');
    Route::post('/m002/delete', 'M002Controller@delete');
    Route::post('/m002/refer', 'M002Controller@refer');
    //M002L - ANS-ASIA BINHNN
    Route::get('/m002l', 'm002lController@index');
    Route::post('/m002l/search', 'M002lController@postSearch');

    //M003
    Route::get('/m003', 'M003Controller@index');
    Route::post('/m003/save', 'M003Controller@save');
    Route::post('/m003/delete', 'M003Controller@delete');
    Route::post('/m003/refer', 'M003Controller@refer');
    Route::post('/m003/chksection', 'M003Controller@chksection');
    //M003L
    Route::get('/m003l', 'M003lController@index');
    Route::post('/m003l/search', 'M003lController@postSearch');
    Route::post('/m003l/searchCD', 'M003lController@postSearchCD');

    //M004
    Route::get('/m004', 'm004Controller@index');
    //M004L - ANS-ASIA TUANTV
    Route::get('/m004l', 'M004lController@index');
    Route::post('/m004l/search', 'm004lController@postSearch');
    //M005
    Route::get('/m005', 'm005Controller@index');
    Route::post('/m005/save', 'm005Controller@save');
    Route::post('/m005/refer', 'm005Controller@refer');
    //M005L
    Route::get('/m005l', 'm005lController@index');
    Route::post('/m005l', 'm005lController@postSearch');
  
    //M006
    Route::get('/m006', 'm006Controller@index');
    Route::post('/m006/save', 'm006Controller@save');
    Route::post('/m006/delete', 'm006Controller@delete');
    Route::post('/m006/refer', 'M006Controller@refer');
    //M006L
    Route::get('/m006l', 'm006lController@index');
    Route::post('/m006l/search', 'm006lController@postSearch');
   
    //M008
    Route::get('/m008', 'm008Controller@getIndex');
    
    //M010
    Route::get('/m010', 'm010Controller@index');

    //M101
    Route::get('/m101', 'm101Controller@index');

    //M004L - ANS-ASIA TUANTV
    Route::get('/lm004', 'LM004Controller@index');
    Route::post('/lm004/search', 'LM004Controller@postSearch');





});
