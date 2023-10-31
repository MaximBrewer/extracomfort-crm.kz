<?php

namespace App\Console\Commands;

use App\Events\NotificationEvent;
use App\Models\Notification;
use App\Models\User;
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
        User::find(5)->notifications()->create([
            'notification' => '<b>Звонит</b> ' . time(),
            'link' => [
                'text' => 'перейти',
                'route' => 'appointment',
                'params' => [
                    'appointment' => 19
                ]
            ]
        ]);
    }
}
