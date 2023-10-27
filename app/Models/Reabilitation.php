<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reabilitation extends Model
{
    use HasFactory;

    protected $fillable = [
        'ms_txt',
        'ms_opt',
        'ms_check',
        'mn_check',
        'ft_check',
        'mn_txt',
        'ft_txt',
        'ft_opt',
        'tp_check',
        'tp_txt',
        'kt_check',
        'kt_txt',
        'op_check',
        'bz_check',
        'bz_txt',
        'vs_check',
        'ko_check',
        'ko_txt',
        'fx_txt',
        'fx_check',
        'om_check',
        'other_txt',
        'other_check',
        'lines1',
        'lines2',
        'bz_radio',
        'om_radio',
        'ko_radio',
        'op_ds',
        'op_pp',
        'op_st',
    ];
}
