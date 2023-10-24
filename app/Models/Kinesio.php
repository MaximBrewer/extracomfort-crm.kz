<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Kinesio extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'observation',
        'sensivity',
        'observationtext',
        'gmfcs',
        'tonus',
        'sp',
        'local',
        'global',
        'walking',
        'doptest',
        'forecast',
        'patterns'
    ];

    public function interview(): HasOne
    {
        return $this->hasOne(Interview::class);
    }
}
