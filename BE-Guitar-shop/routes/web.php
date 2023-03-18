<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

//Category
$router->group(['prefix' => 'category'], function () use ($router) {
    $router->post('create', 'CategoryController@store');
    $router->post('list', 'CategoryController@index');
    $router->post('{id}', 'CategoryController@show');
    $router->post('update/{id}', 'CategoryController@update');
    $router->delete('{id}', 'CategoryController@destroy');
});
//Product
$router->group(['prefix' => 'product'], function () use ($router) {
    $router->post('create', 'ProductController@store');
    $router->post('list', 'ProductController@index');
    $router->post('{id}', 'ProductController@show');
    $router->post('update/{id}', 'ProductController@update');
    $router->delete('{id}', 'ProductController@destroy');
});
//User
$router->group(['prefix' => 'user'], function () use ($router) {
    $router->post('register', 'UserController@register');
    $router->post('login', 'UserController@login');
    $router->post('list', 'UserController@index');
    $router->post('{id}', 'UserController@show');
    $router->post('update/{id}', 'UserController@update');
});
//Order
$router->group(['prefix' => 'order'], function () use ($router) {
    $router->post('', 'OrderController@index');
    $router->post('create', 'OrderController@create');
    $router->post('detail/create', 'OrderController@insert');
    $router->post('{id}', 'OrderController@show');
    $router->post('update/{id}', 'OrderController@update');
});