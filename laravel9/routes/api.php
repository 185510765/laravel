<?php

use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::get('/User/getCaptcha', [UserController::class, 'getCaptcha'])->name('User.getCaptcha');

// // 显示路由 绑定
// // Route::namespace ('App\Http\Controllers\Api')->prefix('v1')->group(function () {
// Route::namespace ('App\Http\Controllers\Api')->prefix('v1')->group(function () {
//     // Route::get('/users', 'UserController@index')->name('users.index');

//     Route::get('/users', 'UserController@index')->name('users.index');
//     // Route::get('/users/{user}', 'UserController@show')->name('users.show');
//     Route::post('/users', 'UserController@store')->name('users.store');
//     Route::post('/login', 'UserController@login')->name('users.login');

//     Route::get('/getCaptcha', [UserController::class, 'getCaptcha'])->name('User.getCaptcha');
//     Route::get('/test', [TestController::class, 'index'])->name('User.index');
// });

// Route::namespace ('App\Http\Controllers\manager')->prefix('v1')->group(function () {
//     // Route::namespace ('App\Http\Controllers\manager')->group(function () {

//     Route::get('/getCaptcha', [UserController::class, 'getCaptcha'])->name('User.getCaptcha');
//     Route::get('/test', [TestController::class, 'index'])->name('User.index');
// });

// // 测试下显示路由是否还可以用
// // 隐式路由（单控制器）
// Route::any('/UserController/{action}', function ($action) {
//     $class = App::make(\App\Http\Controllers\UserController::class);
//     return $class->$action();
// });

// // 隐式路由 (所有) 可以 get post put
// Route::any('/{dir}/{module}/{action}', function ($dir, $module, $action) {
//     $class = App::make('App\\Http\\Controllers\\' . $dir . '\\' . $module . 'Controller');
//     return $class->$action();
// });
