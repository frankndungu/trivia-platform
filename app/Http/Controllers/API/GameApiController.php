<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Game;
use Illuminate\Http\Request;

class GameApiController extends Controller
{
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
}
