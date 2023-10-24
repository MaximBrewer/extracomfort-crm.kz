<?php

namespace App\Listeners;

class SendPatientCreatedNotification
{
    /**
     * Handle the event.
     *
     * @param  \App\Events\PatientCreated  $event
     * @return void
     */
    public function handle(\App\Events\PatientCreated $event)
    {
        if ($event->user->role->name === 'patient') {
            $event->user->sendCreatedNotification();
        }
    }
}
