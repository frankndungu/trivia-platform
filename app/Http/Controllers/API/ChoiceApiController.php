<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Choice;
use App\Models\Question;
use Illuminate\Http\Request;

class ChoiceApiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Question $question)
    {
        if ($question->game->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $data = $request->validate([
            'choices' => 'required|array|min:2',
            'choices.*.choice_text' => 'required|string|max:255',
            'choices.*.is_correct' => 'required|boolean',
        ]);

        $createdChoices = [];

        foreach ($data['choices'] as $choiceData) {
            $createdChoices[] = $question->choices()->create($choiceData);
        }

        return response()->json([
            'message' => 'Choices added successfully.',
            'choices' => $createdChoices,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
