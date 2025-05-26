<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GameController;
use App\Http\Controllers\QuestionController;

use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('games', GameController::class);
    Route::get('/games/{game}/questions', [GameController::class, 'manageQuestions'])
    ->name('games.questions');
    Route::post('/games/{game}/questions', [QuestionController::class, 'store'])->name('questions.store');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
