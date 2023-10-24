<?php

namespace App\Listeners;

class SendSpecialistCreatedNotification
{
    /**
     * Handle the event.
     *
     * @param  \App\Events\SpecialistCreated  $event
     * @return void
     */
    public function handle(\App\Events\SpecialistCreated $event)
    {
        if ($event->user->role->name === 'specialist') {
            $event->user->sendCreatedNotification();
        }
    }
}
