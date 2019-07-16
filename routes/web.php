<?php
use App\Http\Middleware\checkLogin;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//Route::get('/', function () {
//    return view('login');
//});

Route::get('/', 'Auth\LoginController@getLogin');
Route::post('/login', 'Auth\LoginController@loginAction');
Route::post('/logout', 'Auth\LogoutController@index')->middleware('checkLogin');
Route::get('/test/popup', function () {
   return view('Test.test');
});