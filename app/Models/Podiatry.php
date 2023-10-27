<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Podiatry extends Model
{
    use HasFactory;

    protected $fillable = [
        'insoleslines',
        'insoleselements',
        'heading',
        'file',
        'fpi',
        'insolesnote',

        'medical_check',
        'medical_opt',
        'medical_txt',
        'semi_check',
        'semi_opt',
        'semi_txt',
        'stable_check',
        'stable_opt',
        'stable_txt',
        'extensions',
        'ledges',
        'shoeslines',
        'shoeselements',
        'shoesnote',
    ];
}
