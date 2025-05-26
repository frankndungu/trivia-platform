<?php

namespace App\Http\Controllers;

use App\Models\QuizAttempt;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;


class LeaderboardController extends Controller
{
    public function index()
    {
        $leaders = QuizAttempt::select('user_id', DB::raw('COUNT(*) as games_played'), DB::raw('SUM(score) as total_score'), DB::raw('SUM(total) as total_questions'))
            ->with('user')
            ->groupBy('user_id')
            ->orderByDesc(DB::raw('SUM(score) / SUM(total)'))
            ->get()
            ->map(function ($attempt) {
                return [
                    'user' => $attempt->user->name,
                    'games_played' => $attempt->games_played,
                    'percentage' => round(($attempt->total_score / $attempt->total_questions) * 100),
                ];
            });

        return inertia('leaderboard/index', [
            'leaders' => $leaders,
        ]);
    }
}
