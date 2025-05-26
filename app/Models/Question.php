<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Question extends Model
{
    use HasFactory;
    
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
