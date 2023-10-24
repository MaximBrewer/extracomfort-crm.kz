<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Addon extends Model
{
    use HasFactory;

    protected $fillable = [
        'rentgen_check',
        'rentgen_txt',
        'rentgen_opt',
        'uzi_check',
        'uzi_txt',
        'uzi_opt',
        'ot_check',
        'ot_txt',
        'ot_opt',
        'mrt_check',
        'mrt_txt',
        'mrt_opt',
        'other_check',
        'other_txt',
        'other_opt',
        'kuc_check',
        'kuc_txt',
        'kuc_opt',
    ];
}
