<?php

namespace App\Console\Commands;

use App\Events\NotificationEvent;
use Illuminate\Console\Command;

class SendCallNotification extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'send:callnotification';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        NotificationEvent::broadcast("Звонит 777799998877");
        // event(new NotificationEvent("Звонит 777799998877"), );
    }
}
