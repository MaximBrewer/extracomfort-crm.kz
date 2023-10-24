<?php

namespace App\Listeners;

class SendSeniorCreatedNotification
{
    /**
     * Handle the event.
     *
     * @param  \App\Events\SeniorCreated  $event
     * @return void
     */
    public function handle(\App\Events\SeniorCreated $event)
    {
        if ($event->user->role->name === 'senior') {
            $event->user->sendCreatedNotification();
        }
    }
}
