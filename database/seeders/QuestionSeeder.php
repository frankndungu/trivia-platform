<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Game;
use App\Models\Question;
use Illuminate\Database\Seeder;

class QuestionSeeder extends Seeder
{
    public function run(): void
    {
        $games = Game::all();

        $games->each(function ($game) {
            Question::factory(5)->create([
                'game_id' => $game->id,
            ]);
        });
    }
}
