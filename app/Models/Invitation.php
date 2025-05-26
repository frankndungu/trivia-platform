<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Invitation extends Model
{
    use HasFactory;

    protected $fillable = ['game_id', 'email', 'token'];

    public function game()
    {
        return $this->belongsTo(Game::class);
    }
}
