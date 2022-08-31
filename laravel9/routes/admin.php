<?php

use App\Http\Controllers\admin\UserConTroller;
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

// admin 模块
// Route::namespace ('App\Http\Controllers\admin')->prefix('v1')->group(function () {
Route::namespace ('App\Http\Controllers\admin')->group(function () {
    Route::post('/User/getUserList', [UserConTroller::class, 'getUserList'])->name('SysUser.getUserList');
    Route::post('/User/getUser', [UserConTroller::class, 'getUser'])->name('SysUser.getUser');
    Route::post('/User/createUser', [UserConTroller::class, 'createUser'])->name('SysUser.createUser');
    Route::post('/User/delUser', [UserConTroller::class, 'delUser'])->name('SysUser.delUser');
    Route::post('/User/updateUser', [UserConTroller::class, 'updateUser'])->name('SysUser.updateUser');
    Route::post('/User/getUserPhone', [UserConTroller::class, 'getUserPhone'])->name('SysUser.getUserPhone');
    Route::post('/User/getUserAddress', [UserConTroller::class, 'getUserAddress'])->name('SysUser.getUserAddress');
    Route::post('/User/getUserInfo', [UserConTroller::class, 'getUserInfo'])->name('SysUser.getUserInfo');
});

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
