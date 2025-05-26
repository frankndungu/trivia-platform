<?php

namespace App\Http\Controllers;

use App\Mail\InvitationMail;
use Illuminate\Support\Facades\Mail;
use App\Models\Game;
use App\Models\Invitation;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class InvitationController extends Controller
{
    // Show invite form for a specific game
    public function create(Game $game)
    {

        if ($game->user_id !== auth()->id()) {
            abort(403);
        }

        return inertia('invitations/create', [
            'game' => $game,
        ]);

    }

    // Store the invitation
    public function store(Request $request, Game $game)
    {
        if ($game->user_id !== auth()->id()) {
            abort(403);
        }

        $data = $request->validate([
            'email' => 'required|email',
        ]);

        $invitation = Invitation::create([
            'game_id' => $game->id,
            'email' => $data['email'],
            'token' => Str::uuid(),
        ]);

        // Send the email using Laravel Mail
        Mail::to($invitation->email)->send(new InvitationMail($invitation));

        return redirect()->route('games.index')->with('success', 'Invitation sent!');
    }

    // Handle invitation link (e.g. /invitation/{token})
    public function accept($token)
    {
        $invitation = Invitation::where('token', $token)->firstOrFail();
        $game = $invitation->game;

        if ($game->questions()->count() === 0) {
            abort(404, 'Game has no questions.');
        }

        return redirect()->route('games.play', $game);
    }
}
