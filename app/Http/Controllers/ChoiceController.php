<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\Choice;
use Illuminate\Http\Request;

class ChoiceController extends Controller
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Choice $choice)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Choice $choice)
    {
        // Optional: ensure user owns the related game
        $choice->load('question.game');

        if ($choice->question->game->user_id !== auth()->id()) {
            abort(403);
        }

        return inertia('choices/edit', [
            'choice' => $choice,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Choice $choice)
    {
        $choice->load('question.game');

        if ($choice->question->game->user_id !== auth()->id()) {
            abort(403);
        }

        $data = $request->validate([
            'choice_text' => 'required|string|max:255',
            'is_correct' => 'required|boolean',
        ]);

        $choice->update($data);

        return redirect()->back()->with('success', 'Choice updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Choice $choice)
    {
        $choice->load('question.game');

        if ($choice->question->game->user_id !== auth()->id()) {
            abort(403);
        }

        $choice->delete();

        return redirect()->back()->with('success', 'Choice deleted.');
    }

}
