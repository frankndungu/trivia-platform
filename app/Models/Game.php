<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Game extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'title', 'description',
    ];

    // Game belongs to a User (creator)
    public function creator()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    // Game has many Questions
    public function questions()
    {
        return $this->hasMany(Question::class);
    }

    // Game has many Invitations
    public function invitations()
    {
        return $this->hasMany(Invitation::class);
    }

    // Game has many Attempts
    public function attempts()
    {
        return $this->hasMany(Attempt::class);
    }
}
