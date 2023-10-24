<?php

namespace App\Listeners;

class SendSupervisorCreatedNotification
{
    /**
     * Handle the event.
     *
     * @param  \App\Events\SupervisorCreated  $event
     * @return void
     */
    public function handle(\App\Events\SupervisorCreated $event)
    {
        if ($event->user->role->name === 'supervisor') {
            $event->user->sendCreatedNotification();
        }
    }
}
