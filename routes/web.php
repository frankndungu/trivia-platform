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
    Route::get('/games/{game}/questions/create', [QuestionController::class, 'create'])->name('questions.create');
    Route::post('/games/{game}/questions', [QuestionController::class, 'store'])->name('questions.store');
    Route::get('/questions/{question}/edit', [QuestionController::class, 'edit'])->name('questions.edit');
    Route::put('/questions/{question}', [QuestionController::class, 'update'])->name('questions.update');
    Route::delete('/questions/{question}', [QuestionController::class, 'destroy'])->name('questions.destroy');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
