<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\Question;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function create(Game $game)
    {
        if ($game->user_id !== auth()->id()) {
            abort(403);
        }

        return inertia('questions/create', [
            'game' => $game,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
   public function store(Request $request, Game $game)
    {
        if ($game->user_id !== auth()->id()) {
            abort(403);
        }

        $data = $request->validate([
            'question_text' => 'required|string|max:255',
            'choices' => 'required|array|min:2',
            'choices.*.choice_text' => 'required|string|max:255',
            'choices.*.is_correct' => 'required|boolean',
        ]);

        $question = $game->questions()->create([
            'question_text' => $data['question_text'],
        ]);

        foreach ($data['choices'] as $choice) {
            $question->choices()->create($choice);
        }

        return redirect()->back()->with('success', 'Question added!');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Question $question)
    {
        $question->load('choices', 'game');

        if ($question->game->user_id !== auth()->id()) {
            abort(403);
        }

        return inertia('questions/edit', [
            'question' => $question,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Question $question)
    {
        $question->load('game');

        if ($question->game->user_id !== auth()->id()) {
            abort(403);
        }

        $data = $request->validate([
            'question_text' => 'required|string|max:255',
            'choices' => 'required|array|min:2',
            'choices.*.id' => 'required|integer|exists:choices,id',
            'choices.*.choice_text' => 'required|string|max:255',
            'choices.*.is_correct' => 'required|boolean',
        ]);

        $question->update(['question_text' => $data['question_text']]);

        foreach ($data['choices'] as $choiceData) {
            $question->choices()->where('id', $choiceData['id'])->update([
                'choice_text' => $choiceData['choice_text'],
                'is_correct' => $choiceData['is_correct'],
            ]);
        }

        return redirect()->route('games.questions', $question->game->id)->with('success', 'Question updated.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Question $question)
    {
        $question->load('game');

        if ($question->game->user_id !== auth()->id()) {
            abort(403);
        }

        $question->delete();

        return redirect()->route('games.questions', $question->game->id)->with('success', 'Question deleted.');
    }
}
