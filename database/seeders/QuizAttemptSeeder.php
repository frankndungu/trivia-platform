<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\QuizAttempt;
use App\Models\User;
use App\Models\Game;
use Illuminate\Database\Seeder;

class QuizAttemptSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::all();
        $games = Game::withCount('questions')->get();

        foreach ($users as $user) {
            $games->random(2)->each(function ($game) use ($user) {
                $score = rand(1, $game->questions_count);
                QuizAttempt::create([
                    'user_id' => $user->id,
                    'game_id' => $game->id,
                    'score' => $score,
                    'total' => $game->questions_count,
                ]);
            });
        }
    }
}

