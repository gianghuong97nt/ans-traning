<?php
use App\Http\Middleware\checkLogin;

Route::group(['middleware' => ['checkLoginReport','writeLog'],'prefix' => 'export', 'namespace' => 'Modules\Export\Http\Controllers'], function()
{
    //download excel
    Route::get('/excel/download','ExcelController@downloadExcel');

    //Sample export Excel
    Route::post('/exampleexcel','ExcelController@exampleExcel');
    //Export Excel L013
    Route::post('/l013excel','ExcelController@l013Excel');

    Route::post('/l013excelPaginate','ExcelController@l013ExcelPaginate');

    Route::post('/l013ExcelExport5','ExcelController@l013ExcelExport5');
    //PDF
    Route::post('/l013PDFExport','L013Controller@l013PDFExport');

    Route::post('/l013PDFExport2','L013Controller@l013PDFExport2');

    //Export R003
    Route::post('/r003ExcelExport','ExcelController@r003ExcelExport');
    //Export I006
    Route::post('/exportI006','ExcelController@exportI006');
    Route::post('/exportI006sheet','ExcelController@exportI006sheet');
    Route::post('/exportI006page','ExcelController@exportI006page');
    Route::post('/i006Pdf','I006PDFController@Export');
    Route::post('/i006Pdf2','I006PDFController@Export2');


    Route::post('/exportI008','ExcelController@exportI008');
    Route::post('/exportI008_plus','ExcelController@exportI008_plus');
    Route::post('/exportL007','ExcelController@exportL007');
    Route::post('/exportI008_SheetEx','ExcelController@exportI008_SheetEx');
    Route::post('/find_i008pdf','I008pdfController@Find_i008pdf');
    Route::post('/find_i008pdf_section','I008pdfController@Find_i008pdf_section');
    //Export R001
    Route::post('/exportR001','ExcelController@exportR001');


});