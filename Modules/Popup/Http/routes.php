<?php
use App\Http\Middleware\checkLogin;

Route::group(['middleware' => 'writeLog','prefix' => 'popup', 'namespace' => 'Modules\Popup\Http\Controllers'], function()
{
	Route::get('/', 'PopupController@index');
	Route::get('/search/l004', 'l004Controller@getIndex');
	/*Search Lecturer*/
	Route::get('/search/city','PopupController@getSearchCity');
	Route::get('/search/l002','l002Controller@getIndex');
	Route::get('/search/l003','l003Controller@getIndex');
	Route::get('/search/l001','l001Controller@getIndex');
	Route::post('/search/l001/search','l001Controller@postSearch');
	Route::get('/search/l005','l005Controller@getIndex');
	Route::get('/search/i002_1','i002_1Controller@getIndex');
	Route::get('/search/l007','l007Controller@getIndex');
	Route::get('/search/l008','l008Controller@getIndex');
	Route::get('/search/l009','l009Controller@getIndex');
	Route::get('/search/l010','l010Controller@getIndex');
	Route::get('/search/l011','l011Controller@getIndex');
	Route::get('/search/l012','l012Controller@getIndex');
	Route::get('/search/u001','U001Controller@getIndex');
	Route::get('/search/l013','l013Controller@getIndex');
	Route::get('/search/l014','l014Controller@getIndex');
	Route::get('/search/s001l','s001lController@getIndex');
	Route::get('/search/m006l','m006lController@getIndex');
	Route::get('/search/m005l','m005lController@getIndex');
	Route::get('/search/m003l','m003lController@getIndex');
	Route::get('/search/m004l','m004lController@getIndex');

	Route::get('/search/p001','p001Controller@getIndex');
	Route::get('/search/p001/refer','p001Controller@refer');
	Route::post('/search/p001/save','p001Controller@save');

	Route::get('/search/p002','p002Controller@getIndex');
	Route::get('/search/p002/refer','p002Controller@refer');
	Route::post('/search/p002/save','p002Controller@save');

	Route::get('/search/lm002','lm002Controller@getIndex');
	Route::get('/search/lm003','lm003Controller@getIndex');
	Route::get('/search/p001','p001Controller@getIndex');
	Route::get('/search/p002','p002Controller@getIndex');
	Route::get('/search/lm002','lm002Controller@getIndex');
	Route::get('/search/lm004','lm004Controller@getIndex');
	Route::get('/search/lm005','lm005Controller@getIndex');
	Route::post('/search/lm005/getdata ','lm005Controller@postSearch');
	Route::get('/search/lm006','lm006Controller@getIndex');
	Route::post('/search/lm006/getdata', 'lm006Controller@postSearch');
	Route::get('/search/lf009','lf009Controller@getIndex');
	Route::get('/search/lm101','lm101Controller@getIndex');
	Route::get('/search/lm001','lm001Controller@getIndex');
	Route::get('/search/ls003','ls003Controller@getIndex');
	Route::post('/search/lm002/getdata', 'lm002Controller@postSearch');
	Route::post('/search/lm001/getdata', 'lm001Controller@postSearch');
	Route::post('/search/lm003/getdata', 'lm003Controller@postSearch');
	Route::post('/search/lm004/getdata', 'lm004Controller@postSearch');
	Route::post('/search/ls003/getdata', 'ls003Controller@postSearch');
	Route::post('/search/lf009/getdata', 'lf009Controller@postSearch');
	Route::post('/search/lm101/getdata', 'lm101Controller@postSearch');
	Route::post('/search/i002_1/save', 'I002_1Controller@save');
	Route::post('/search/i002_1/refer', 'I002_1Controller@refer');
});

