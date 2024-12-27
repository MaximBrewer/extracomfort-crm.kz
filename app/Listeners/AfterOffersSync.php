<?php

namespace App\Listeners;

use App\Models\Offer;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;

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
        Log::info(print_r($event, 1));
        // foreach (Offer::whereNotIn('id', $event->ids)->get() as $offer) {
        //     // $offer->delete();
        // }
    }
}
