<?php

namespace App\Mail;

use App\Models\Invitation;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class InvitationMail extends Mailable
{
    use Queueable, SerializesModels;

    public Invitation $invitation;

    public function __construct(Invitation $invitation)
    {
        $this->invitation = $invitation;
    }

    public function build()
    {
        $link = route('invitations.accept', $this->invitation->token);

        return $this->subject('You’ve been invited to play a trivia game')
            ->markdown('emails.invitation')
            ->with([
                'gameTitle' => $this->invitation->game->title,
                'link' => $link,
            ]);
    }
}
