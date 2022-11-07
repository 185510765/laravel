<?php

use App\Http\Controllers\game\RoleController;
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

// Route::middleware(['cors', 'auth:sanctum'])->group(function () {
Route::middleware(['cors'])->group(function () {
    Route::get('/Role/getRoleInitData', [RoleController::class, 'getRoleInitData']);
});
