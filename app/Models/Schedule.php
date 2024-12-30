<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Schedule extends Model
{
    use HasFactory;

    protected $guarded = [];
    /**
     * Default sort by created_at desc.
     *
     * @return void
     */
    protected static function boot()
    {
        parent::boot();
        static::addGlobalScope('with', function (Builder $builder) {
            $builder->with('datetimes', function (HasMany $builder) {
                $builder->orderBy('datetime');
            });
        });
    }

    public function datetimes(): HasMany
    {
        return $this->hasMany(DateTime::class);
    }
}
