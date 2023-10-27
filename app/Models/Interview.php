<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Interview extends Model
{
    use HasFactory;

    protected $fillable = [
        'waiting',
        'bornpremature',
        'bornprematureweek',
        'bornprematureweight',
        'pregnancyfactors',
        'abnormalitiesbirth',
        'conditionafterbirth',
        'babyweight',
        'childbreathingsupport',
        'problemsparentschild',
        'formstreatmentusedfar',
        'childfeedingproblems',
        'childsleepingproblems',
        'childcopeprocedures',
        'motorskilldominate',
        'motordevelopmentprogressed',
        'motordevelopmentprogress',
        'motordevelopmentdeterioration',
        'neurologicaldiseasesfamily',
        'notes',
        'periodhighestlevelmotorskills',
        'biggestproblemfunctions',
        'havepainsymptoms',
        'treatmentbeenfar',
        'treatedbotulinum',
        'treatedbotulinumresult',
        'specialexaminations',
        'xrayshipjoints',
        'intellectualdevelopment',
        'communicationenvironment',
        'extentassistance',
        'reablech',
        'farmlech',
        'hirurglech',
    ];
}
