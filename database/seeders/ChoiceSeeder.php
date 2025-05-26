<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Question;
use App\Models\Choice;
use Illuminate\Database\Seeder;

class ChoiceSeeder extends Seeder
{
    public function run(): void
    {
        $questions = Question::all();

        $questions->each(function ($question) {
            $correctIndex = rand(0, 3);

            for ($i = 0; $i < 4; $i++) {
                Choice::factory()->create([
                    'question_id' => $question->id,
                    'is_correct' => $i === $correctIndex,
                ]);
            }
        });
    }
}
