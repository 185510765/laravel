<?php

use App\Http\Controllers\manager\IndexController;
use App\Http\Controllers\manager\SysUserController;
use App\Http\Controllers\manager\UserMinerController;
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

// Route::group([
//     'middleware' => ['auth:sanctum'],
// ], function () {
//     Route::post('/logout', [AuthController::class, 'logout']);
// });

// Route::namespace ('App\Http\Controllers\manager')->middleware(['cors', 'auth:sanctum'])->group(function () {
Route::middleware(['cors', 'auth:sanctum'])->group(function () {
    Route::post('/SysUser/getCaptcha', [SysUserController::class, 'getCaptcha'])->name('SysUser.getCaptcha')->withoutMiddleware(['auth:sanctum']);
    Route::post('/SysUser/publicKey', [SysUserController::class, 'publicKey'])->name('SysUser.publicKey')->withoutMiddleware(['auth:sanctum']);
    Route::post('/SysUser/login', [SysUserController::class, 'login'])->name('SysUser.login')->withoutMiddleware(['auth:sanctum']);
    Route::post('/SysUser/register', [SysUserController::class, 'register'])->name('SysUser.register')->withoutMiddleware(['auth:sanctum']);
    Route::post('/SysUser/userInfo', [SysUserController::class, 'userInfo'])->name('SysUser.userInfo');
    Route::post('/SysUser/logout', [SysUserController::class, 'logout'])->name('SysUser.logout');

    Route::post('/UserMiner/getMinerList', [UserMinerController::class, 'getMinerList'])->name('UserMiner.getMinerList');
    Route::post('/UserMiner/getLevelMiner', [UserMinerController::class, 'getLevelMiner'])->name('UserMiner.getLevelMiner');
    Route::post('/UserMiner/changeLevel', [UserMinerController::class, 'changeLevel'])->name('UserMiner.changeLevel');
    Route::post('/UserMiner/delMiner', [UserMinerController::class, 'delMiner'])->name('UserMiner.delMiner');

    Route::post('/Index/getInitData', [IndexController::class, 'getInitData'])->name('Index.getInitData');
});
