<?php

namespace App\Listeners;

use App\Models\Offer;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class AfterOffersSync
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(object $event): void
    {
        foreach (Offer::whereNotIn('id', $event->ids)->get() as $offer) {
            $offer->delete();
        }
    }
}
