<?php

use App\Http\Controllers\manager\SysUserController;
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

// // Route::namespace ('App\Http\Controllers\manager')->prefix('v1')->group(function () {
// Route::namespace ('App\Http\Controllers\manager')->group(function () {
//     Route::get('/SysUser/getCaptcha', [SysUserController::class, 'getCaptcha'])->name('SysUser.getCaptcha');
//     Route::post('/SysUser/getList', [SysUserController::class, 'getList'])->name('SysUser.getList');
// });

Route::namespace ('App\Http\Controllers\manager')->middleware('cors')->group(function () {
    Route::post('/SysUser/getCaptcha', [SysUserController::class, 'getCaptcha'])->name('SysUser.getCaptcha');
    Route::post('/SysUser/getList', [SysUserController::class, 'getList'])->name('SysUser.getList');
    Route::post('/SysUser/publicKey', [SysUserController::class, 'publicKey'])->name('SysUser.publicKey');
    Route::post('/SysUser/login', [SysUserController::class, 'login'])->name('SysUser.login');

    // Route::get('/profile', function () {
    //     //
    // })->withoutMiddleware([EnsureTokenIsValid::class]);
});
