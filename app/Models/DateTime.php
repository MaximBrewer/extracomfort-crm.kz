<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DateTime extends Model
{
    use HasFactory;

    protected $casts = [
        'datetime' => 'datetime',
    ];

    protected $guarded = [];
}
