<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;

class Patient extends User
{
    protected $table = 'users';
    /**
     * The "booted" method of the model.
     */
    protected static function booted(): void
    {
        static::addGlobalScope('patient', function (Builder $builder) {
            $builder->where('role_id', 2);
        });
    }

    /**
     * The users that belong to the role.
     */
    public function books(): HasMany
    {
        return $this->hasMany(Book::class, 'patient_id')->where('date', '>=', now())->orderBy('id', 'asc')->with('specialist')->with('service', function (BelongsTo $query) {
            $query->with('direction');
        });
    }

    /**
     * The users that belong to the role.
     */
    public function appointments(): HasMany
    {
        return $this->hasMany(Book::class, 'patient_id')->where('date', '<', now())->orderBy('id', 'asc')->with('specialist')->with('service', function (BelongsTo $query) {
            $query->with('direction');
        });
    }
}
