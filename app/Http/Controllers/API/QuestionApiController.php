<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Game;
use App\Models\Question;
use Illuminate\Http\Request;

class QuestionApiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, Game $game)
    {
        if ($game->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $questions = $game->questions()->with('choices')->get();

        return response()->json([
            'success' => true,
            'questions' => $questions
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Game $game)
    {
        // Ensure only the game owner can add questions
        if ($game->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $data = $request->validate([
            'question_text' => 'required|string|max:255',
        ]);

        $question = $game->questions()->create($data);

        return response()->json([
            'message' => 'Question created successfully.',
            'question' => $question,
        ], 201);
    }


    /**
     * Display the specified resource.
     */
    public function show(Request $request, Question $question)
    {
        if ($question->game->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $question->load('choices');

        return response()->json([
            'success' => true,
            'question' => $question,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Question $question)
    {
        if ($question->game->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $data = $request->validate([
            'question_text' => 'required|string|max:255',
        ]);

        $question->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Question updated successfully.',
            'question' => $question,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Question $question)
    {
        if ($question->game->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $question->delete();

        return response()->json([
            'success' => true,
            'message' => 'Question deleted successfully.'
        ]);
    }
}
