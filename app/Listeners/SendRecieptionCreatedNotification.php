<?php

namespace App\Listeners;

class SendRecieptionCreatedNotification
{
    /**
     * Handle the event.
     *
     * @param  \App\Events\RecieptionCreated  $event
     * @return void
     */
    public function handle(\App\Events\RecieptionCreated $event)
    {
        if ($event->user->role->name === 'recieption') {
            $event->user->sendCreatedNotification();
        }
    }
}
