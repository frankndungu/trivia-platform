<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $fillable = ['game_id', 'question_text'];

    protected $casts = [
        'game_id' => 'integer',
    ];

    public function game()
    {
        return $this->belongsTo(Game::class);
    }

    public function choices()
    {
        return $this->hasMany(Choice::class);
    }
}
