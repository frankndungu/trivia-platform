<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\GameApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('v1')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/games', [GameApiController::class, 'store']);
        Route::get('/games', [GameApiController::class, 'index']);
        Route::get('/games/{game}', [GameApiController::class, 'show']);
        Route::put('/games/{game}', [GameApiController::class, 'update']);
        Route::delete('/games/{game}', [GameApiController::class, 'destroy']);
    });
});
