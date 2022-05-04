<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});


Route::get('{key}/server', ['as' => 'zoap.server.wsdl', 'uses' => '\Viewflex\Zoap\ZoapController@server']);
Route::post('{key}/server', ['as' => 'zoap.server', 'uses' => '\Viewflex\Zoap\ZoapController@server']);

