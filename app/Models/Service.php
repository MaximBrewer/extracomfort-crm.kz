<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'sort',
        'title'
    ];

    public function direction(): BelongsTo
    {
        return $this->belongsTo(Direction::class);
    }
}
