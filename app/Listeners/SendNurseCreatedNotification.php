<?php

namespace App\Listeners;

class SendNurseCreatedNotification
{
    /**
     * Handle the event.
     *
     * @param  \App\Events\NurseCreated  $event
     * @return void
     */
    public function handle(\App\Events\NurseCreated $event)
    {
        if ($event->user->role->name === 'nurse') {
            $event->user->sendCreatedNotification();
        }
    }
}
