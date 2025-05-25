<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\GameApiController;
use App\Http\Controllers\API\QuestionApiController;
use App\Http\Controllers\API\ChoiceApiController;
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
        Route::post('/games/{game}/questions', [QuestionApiController::class, 'store']);
        Route::get('/questions/{question}/choices', [ChoiceApiController::class, 'index']);
        Route::post('/questions/{question}/choices', [ChoiceApiController::class, 'store']);
        Route::get('/choices/{choice}', [ChoiceApiController::class, 'show']);
        Route::put('/choices/{choice}', [ChoiceApiController::class, 'update']);
        Route::delete('/choices/{choice}', [ChoiceApiController::class, 'destroy']);
        Route::get('/games/{game}/questions', [QuestionApiController::class, 'index']);
        Route::get('/questions/{question}', [QuestionApiController::class, 'show']);
        Route::put('/questions/{question}', [QuestionApiController::class, 'update']);
        Route::delete('/questions/{question}', [QuestionApiController::class, 'destroy']);
    });
});
