<?php

namespace App\Http\Controllers;

use App\Models\Game;
use Illuminate\Http\Request;
use App\Models\QuizAttempt;

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
        if ($game->questions()->count() === 0) {
            abort(404, 'This game has no questions yet.');
        }

        $game->load('questions.choices');

        return inertia('games/play', [
            'game' => $game,
        ]);
    }

    public function submit(Request $request, Game $game)
    {
        $game->load('questions.choices');

        $data = $request->validate([
            'answers' => 'required|array',
        ]);

        $correctCount = 0;
        $total = $game->questions->count();

        foreach ($game->questions as $question) {
            $selectedChoiceId = $data['answers'][$question->id] ?? null;

            if (!$selectedChoiceId) {
                continue;
            }

            $correct = $question->choices->firstWhere(fn($c) => $c->is_correct && $c->id == $selectedChoiceId);

            if ($correct) {
                $correctCount++;
            }
        }

        QuizAttempt::create([
            'user_id' => auth()->id(),
            'game_id' => $game->id,
            'score' => $correctCount,
            'total' => $total,
        ]);

        // Result to show in frontend
        $score = [
            'correct' => $correctCount,
            'total' => $total,
            'percentage' => $total > 0 ? round(($correctCount / $total) * 100) : 0,
        ];

        return inertia('games/result', [
            'game' => $game,
            'score' => $score,
        ]);
    }

}
