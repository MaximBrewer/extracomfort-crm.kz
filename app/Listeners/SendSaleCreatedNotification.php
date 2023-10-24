<?php

namespace App\Listeners;

class SendSaleCreatedNotification
{
    /**
     * Handle the event.
     *
     * @param  \App\Events\SaleCreated  $event
     * @return void
     */
    public function handle(\App\Events\SaleCreated $event)
    {
        if ($event->user->role->name === 'sale') {
            $event->user->sendCreatedNotification();
        }
    }
}
