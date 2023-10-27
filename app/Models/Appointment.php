<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Appointment extends Model
{
    use HasFactory;

    protected $fillable = [
        'сomplaints',
        'anmorbi',
        'anvitae',
        'stlocalic',
        'traumasurgery',
        'laboratorydata',
        'adddiagnosticexam',
        'consultspecialists',
        'conclusion',
        'recommendations',
        'other',
    ];

    public function ods(): HasOne
    {
        return $this->hasOne(Ods::class);
    }

    public function oda(): HasOne
    {
        return $this->hasOne(Oda::class);
    }

    public function podiatry(): HasOne
    {
        return $this->hasOne(Podiatry::class);
    }

    public function addon(): HasOne
    {
        return $this->hasOne(Addon::class);
    }

    public function painmap(): HasOne
    {
        return $this->hasOne(Painmap::class);
    }

    public function kinesio(): HasOne
    {
        return $this->hasOne(Kinesio::class);
    }

    public function reabilitation(): HasOne
    {
        return $this->hasOne(Reabilitation::class);
    }

    public function files(): MorphMany
    {
        return $this->morphMany(File::class, 'entity');
    }
}
