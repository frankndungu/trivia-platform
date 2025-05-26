<?php

namespace App\Http\Controllers;

use App\Models\Game;
use Illuminate\Http\Request;

class GameController extends Controller
{
    public function index()
    {
        $games = auth()->user()
            ->games()
            ->with('questions.choices') // eager load questions and their choices
            ->latest()
            ->get();
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
        return redirect()->route('games.questions', $game->id)->with('success', 'Game created! Now add your questions.');

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

    public function manageQuestions(Game $game)
    {
        if ($game->user_id !== auth()->id()) {
            abort(403);
        }

        $game->load('questions.choices');

        return inertia('games/questions', [
            'game' => $game,
        ]);
    }

    public function available()
    {
        $games = Game::withCount('questions')
            ->whereHas('questions')
            ->latest()
            ->get();

        return inertia('games/available', [
            'games' => $games,
        ]);
    }

    public function play(Game $game)
    {
        if ($game->user_id !== auth()->id()) {
            abort(403);
        }

        $game->load('questions.choices');

        return inertia('games/play', [
            'game' => $game,
        ]);
    }

}
