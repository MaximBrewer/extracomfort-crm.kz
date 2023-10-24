<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Oda extends Model
{
    use HasFactory;

    protected $fillable = [
        'm1standleft',
        'm1standright',
        'm2standleft',
        'm2standright',
        'm3standleft',
        'm3standright',
        'm4standleft',
        'm4standright',
        'm1sitleft',
        'm1sitright',
        'm2sitleft',
        'm2sitright',
        'm3sitleft',
        'm3sitright',
        'm4sitleft',
        'm4sitright',
        'm1lieleft',
        'm1lieright',
        'm2lieleft',
        'm2lieright',
        'm3lieleft',
        'm3lieright',
        'm4lieleft',
        'm4lieright',

        'triggers',
        'viscers',

        'nevrology',

        'coordrom1',
        'coordfuk1',
        'coordzm1',
        'coordrom2',
        'coordfuk2',
        'coordzm2',

        'addons1I',
        'addons1II',
        'addons1III',
        'addons2I',
        'addons2II',
        'addons2III',
        'addons3I',
        'addons3II',
        'addons3III',
        'addons4I',
        'addons4II',
        'addons4III',
        'addons5I',
        'addons5II',
        'addons5III',
        'addons6I',
        'addons6II',
        'addons6III',
        'addons7I',
        'addons7II',
        'addons7III',
        'addons8I',
        'addons8II',
        'addons8III',
        'addons9I',
        'addons9II',
        'addons9III',
        'addons10I',
        'addons10II',
        'addons10III',
        
        'mobilisation',
        'stabilization',
        'strengthening',

        'kraus',
        'webber',
    ];
}