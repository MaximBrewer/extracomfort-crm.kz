<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Branch extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'sort',
        'title',
        'locality_id'
    ];

    /**
     * Default sort by created_at desc.
     *
     * @return void
     */
    protected static function boot()
    {
        parent::boot();
        static::addGlobalScope('order', function (Builder $builder) {
            $builder->orderBy('sort', 'asc');
        });
    }

    /**
     * The branch`s locality.
     */
    public function locality(): BelongsTo
    {
        return $this->belongsTo(Locality::class);
    }

    /**
     * The users that belong to the role.
     */
    public function specialists(): HasMany
    {
        return $this->hasMany(User::class, 'branch_id')->whereHas('role',  function (Builder $query) {
            $query->where('name', 'specialist');
        });
    }

    /**
     * The users that belong to the role.
     */
    public function books(): HasMany
    {
        return $this->hasMany(Book::class, 'branch_id');
    }

    /**
     * The users that belong to the role.
     */
    public function reminders(): HasMany
    {
        return $this->hasMany(Reminder::class, 'branch_id');
    }
}
