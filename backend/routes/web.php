<?php

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
    $response = var_export(app('db')->select("SELECT * FROM Opponent"), true);

    return "Dit is de DEV branch <hr>" . $router->app->version() . $response;
});
