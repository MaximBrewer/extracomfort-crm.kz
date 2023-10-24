<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Payment extends Model
{
    use HasFactory;
    protected $fillable = ['book_id', 'sum', 'method', 'prepay'];

    /**
     * Interact with the user's balance.
     */
    protected function sum(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => (int)$value / 100,
            set: fn ($value) => (float)$value * 100,
        );
    }

    /**
     * The users that belong to the role.
     */
    public function book(): BelongsTo
    {
        return $this->belongsTo(Book::class);
    }
}
