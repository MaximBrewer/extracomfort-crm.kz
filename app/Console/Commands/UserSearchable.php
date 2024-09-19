<?php

namespace App\Console\Commands;

use App\Models\User;
use App\Observers\User as ObserversUser;
use Illuminate\Console\Command;

class UserSearchable extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'searchable:user';

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
        foreach (User::all() as $user) {
            (new ObserversUser)->updating($user);
            $user->saveQuietly();
        }
    }
}
