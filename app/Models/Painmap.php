<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Painmap extends Model
{
    use HasFactory;

    protected $fillable = [
        'lines',
        'paindata',
        'repeatpaindata',
        'dynamicpaindata',
        'frequency',
        'frequencytext',
        'worsing',
        'worsingtext',
        'pomed',
        'pomedtext',
        'ponomed',
        'ponomedtext',
        'sideeffects',
        'sideeffecttext',
        'therapyeffect',
        'comment',
        'localisation',
    ];
}
