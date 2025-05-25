<?php

namespace App\Http\Controllers;

use App\Models\Game;
use Illuminate\Http\Request;

class GameController extends Controller
{
    public function index()
    {
        $games = auth()->user()->games()->latest()->get();
        return inertia('games/index', ['games' => $games]);
    }

    public function create()
    {
        return inertia('games/create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);
        $game = auth()->user()->games()->create($data);
        return redirect()->route('games.index')->with('success', 'Game created!');
    }

    public function show(Game $game)
    {
        // Optionally, check owner or invitation
        return inertia('games/show', [
            'game' => $game->load('questions.choices', 'creator'),
        ]);
    }

    public function edit(Game $game)
    {
        // Ensure only the creator can edit
        if ($game->user_id !== auth()->id()) {
            abort(403);
        }
        return inertia('games/edit', ['game' => $game]);
    }

    public function update(Request $request, Game $game)
    {
        if ($game->user_id !== auth()->id()) {
            abort(403);
        }
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);
        $game->update($data);
        return redirect()->route('games.index')->with('success', 'Game updated!');
    }

    public function destroy(Game $game)
    {
        if ($game->user_id !== auth()->id()) {
            abort(403);
        }
        $game->delete();
        return redirect()->route('games.index')->with('success', 'Game deleted!');
    }

}
