<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class ServiceCategory extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'sort',
        'title'
    ];

    /**
     * The users that belong to the role.
     */
    public function direction(): BelongsTo
    {
        return $this->belongsTo(Direction::class);
    }

    /**
     * The users that belong to the role.
     */
    public function services(): HasMany
    {
        return $this->hasMany(Service::class);
    }

    /**
     * Interact with the user's balance.
     */
    protected function quantity(): Attribute
    {
        return Attribute::make(
            get: function () {
                $quantity = 0;
                foreach ($this->services as $service) {
                    $quantity += $service->quantity;
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
                foreach ($this->services as $service) {
                    $sum += $service->sum;
                }
                return $sum;
            }
        );
    }
}
