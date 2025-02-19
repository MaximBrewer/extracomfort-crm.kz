<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Direction extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'sort',
        'title'
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
     * The users that belong to the role.
     */
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_direction');
    }

    /**
     * The users that belong to the role.
     */
    public function specialists(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_direction')->whereHas('role',  function (Builder $query) {
            $query->where('name', 'specialist');
        });
    }

    /**
     * The users that belong to the role.
     */
    public function categories(): HasMany
    {
        return $this->hasMany(ServiceCategory::class);
    }

    /**
     * Interact with the user's balance.
     */
    protected function quantity(): Attribute
    {
        return Attribute::make(
            get: function () {
                $quantity = 0;
                foreach ($this->categories as $category) {
                    $quantity += $category->quantity;
                }
                return $quantity;
            }
        );
    }

    /**
     * Interact with the user's balance.
     */
    protected function sum(): Attribute
    {
        return Attribute::make(
            get: function () {
                $sum = 0;
                foreach ($this->categories as $category) {
                    $sum += $category->sum;
                }
                return $sum;
            }
        );
    }
}
