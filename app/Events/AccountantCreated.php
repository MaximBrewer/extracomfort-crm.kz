<?php

namespace App\Events;

use Illuminate\Queue\SerializesModels;

class AccountantCreated
{
    use SerializesModels;

    /**
     * The created user.
     *
     * @var \App\Models\User
     */
    public $user;

    /**
     * Create a new event instance.
     */
    public function __construct(\App\Models\User $user)
    {
        $this->user = $user;
    }
}
