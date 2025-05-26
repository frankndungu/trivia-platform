<?php

use Illuminate\Support\Facades\Route;
use App\Models\QuizAttempt;
use App\Http\Controllers\GameController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\LeaderboardController;
use App\Http\Controllers\InvitationController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {

    // Dashboard with quiz history
    Route::get('/dashboard', function () {
        $attempts = QuizAttempt::with('game')
            ->where('user_id', auth()->id())
            ->latest()
            ->get();

        return Inertia::render('dashboard', [
            'attempts' => $attempts,
        ]);
    })->name('dashboard');

    // Game management
    Route::resource('games', GameController::class);
    Route::get('/games/{game}/questions', [GameController::class, 'manageQuestions'])->name('games.questions');

    // Question management
    Route::get('/games/{game}/questions/create', [QuestionController::class, 'create'])->name('questions.create');
    Route::post('/games/{game}/questions', [QuestionController::class, 'store'])->name('questions.store');
    Route::get('/questions/{question}/edit', [QuestionController::class, 'edit'])->name('questions.edit');
    Route::put('/questions/{question}', [QuestionController::class, 'update'])->name('questions.update');
    Route::delete('/questions/{question}', [QuestionController::class, 'destroy'])->name('questions.destroy');

    // Invitations
    Route::get('/games/{game}/invite', [InvitationController::class, 'create'])->name('invitations.create');
    Route::post('/games/{game}/invite', [InvitationController::class, 'store'])->name('invitations.store');

    // Gameplay
    Route::get('/play', [GameController::class, 'available'])->name('games.available');
    Route::get('/play/{game}', [GameController::class, 'play'])->name('games.play');
    Route::post('/play/{game}', [GameController::class, 'submit'])->name('games.submit');

    // Leaderboard
    Route::get('/leaderboard', [LeaderboardController::class, 'index'])->name('leaderboard');
});

// Public: Accept invitations
Route::get('/invitation/{token}', [InvitationController::class, 'accept'])->name('invitations.accept');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
