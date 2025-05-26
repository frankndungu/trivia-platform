@component('mail::message')
    # You're Invited to Play a Trivia Game 🎉

    You've been invited to participate in the trivia game:

    ## **{{ $gameTitle }}**

    Click the button below to begin the game:

    @component('mail::button', ['url' => $link])
        Play Now
    @endcomponent

    If you did not expect this email, you can safely ignore it.

    Thanks,<br>
    {{ config('app.name') }}
@endcomponent
