<?php

use App\Http\Controllers\game\RoleEquipmentController;
use App\Http\Controllers\game\UserController;
use App\Http\Controllers\game\UserRoleController;
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

Route::middleware(['cors', 'auth:sanctum'])->group(function () {
// Route::middleware(['cors'])->group(function () {
    Route::post('/User/login', [UserController::class, 'login'])->withoutMiddleware(['auth:sanctum']);
    Route::get('/User/getUserInfo', [UserController::class, 'getUserInfo']);

    Route::get('/UserRole/getRoleInfo', [UserRoleController::class, 'getRoleInfo']);

    Route::get('/RoleEquipment/getRoleEquipmentList', [RoleEquipmentController::class, 'getRoleEquipmentList']);
});
