<?php

namespace App\Console\Commands;

use App\Models\User;
use App\Notifications\UserCreatedNotification;
use Illuminate\Console\Command;

class Mail extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:mail';

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
        $user = new User();
        $user->email = '7@mail.ru';
        $user->notify(new UserCreatedNotification());
    }
}
