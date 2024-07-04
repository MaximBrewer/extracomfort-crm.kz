<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Specialist extends User
{
    protected $table = 'users';

    /**
     * The "booted" method of the model.
     */
    protected static function booted(): void
    {
        static::addGlobalScope('specialist', function (Builder $builder) {
            $builder->where('role_id', 4);
        });
    }

    /**
     * The users that belong to the role.
     */
    public function directions(): BelongsToMany
    {
        return $this->belongsToMany(Direction::class, 'user_direction', 'direction_id', 'user_id');
    }
}
