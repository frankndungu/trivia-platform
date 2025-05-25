<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Game;
use Illuminate\Http\Request;

class GameApiController extends Controller
{
    public function index(Request $request)
    {
        $games = $request->user()->games()->latest()->get();

        return response()->json([
            'success' => true,
            'games' => $games
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $game = $request->user()->games()->create($data);

        return response()->json([
            'message' => 'Game created successfully',
            'game' => $game,
        ], 201);
    }

    public function show(Request $request, Game $game)
    {
        // Only allow the owner to view the game
        if ($game->user_id !== $request->user()->id) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized access to this game.'
            ], 403);
        }

        // Load future relationships like questions, choices if needed
        // $game->load('questions.choices'); 

        return response()->json([
            'success' => true,
            'game' => $game
        ]);
    }

    public function update(Request $request, Game $game)
    {
        // Check that the game belongs to the authenticated user
        if ($game->user_id !== $request->user()->id) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized to update this game.'
            ], 403);
        }

        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $game->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Game updated successfully',
            'game' => $game,
        ]);
    }

    public function destroy(Request $request, Game $game)
    {
        // Authorize: only the owner can delete
        if ($game->user_id !== $request->user()->id) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized to delete this game.'
            ], 403);
        }

        $game->delete();

        return response()->json([
            'success' => true,
            'message' => 'Game deleted successfully.'
        ]);
    }
}
