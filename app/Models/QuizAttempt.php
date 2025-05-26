<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QuizAttempt extends Model
{
    protected $fillable = ['user_id', 'game_id', 'score', 'total'];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function game() {
        return $this->belongsTo(Game::class);
    }
}

