<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\Console\Input\InputOption;

class AdminCommand extends Command
{
    /**
     * The console command name.
     *
     * @var string
     */
    protected $name = 'influe:admin';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Make sure there is a user with the admin role that has all of the necessary permissions.';

    /**
     * Get user options.
     */
    protected function getOptions()
    {
        return [
            ['create', null, InputOption::VALUE_NONE, __('Create an admin user'), null],
        ];
    }

    public function fire()
    {
        return $this->handle();
    }

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        // Get or create user
        $user = $this->getUser(
            $this->option('create')
        );

        // the user not returned
        if (!$user) {
            exit;
        }

        // Ensure that the user is admin
        $user->role_id = 1;
        $user->save();

        $this->info(__('The user now has full access to your site.'));
    }

    /**
     * Get command arguments.
     *
     * @return array
     */
    protected function getArguments()
    {
        return [
            ['phone', InputOption::VALUE_REQUIRED, __('The phone of the user.'), null],
        ];
    }

    /**
     * Get or create user.
     *
     * @param bool $create
     *
     * @return \App\User
     */
    protected function getUser($create = false)
    {
        $phone = $this->argument('phone');

        // If we need to create a new user go ahead and create it
        if ($create) {
            $name = $this->ask(__('Enter the admin name'));
            $password = $this->secret(__('Enter admin password'));
            $confirmPassword = $this->secret(__('Confirm Password'));

            // Ask for phone if there wasnt set one
            if (!$phone) {
                $phone = $this->ask(__('Enter the admin phone'));
            }

            // check if user with given phone exists

            if (User::where('phone', $phone)->exists()) {
                $this->info(__("Can't create user. User with the phone :phone exists already.", [
                    'phone' => $phone
                ]));

                return;
            }

            // Passwords don't match
            if ($password != $confirmPassword) {
                $this->info(__("Passwords don't match"));

                return;
            }

            $this->info(__('Creating admin account'));

            return call_user_func('\\App\\Models\\User::forceCreate', [
                'name'     => $name,
                'phone'    => $phone,
                'role'    => 'admin',
                'password' => Hash::make($password),
                'gender' => 'male'
            ]);
        }

        return call_user_func('\\App\\Models\\User::where', 'phone', $phone)->firstOrFail();
    }
}
