<?php

namespace App\Listeners;

use App\Models\Product;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class AfterProductsSync
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
        foreach (Product::whereNotIn('id', $event->ids)->where()->get() as $product) {
            // $product->delete();
        }
    }
}
