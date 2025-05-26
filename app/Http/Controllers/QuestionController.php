<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\Question;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
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
     * Display the specified resource.
     */
    public function show(Question $question)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Question $question)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Question $question)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Question $question)
    {
        //
    }
}
