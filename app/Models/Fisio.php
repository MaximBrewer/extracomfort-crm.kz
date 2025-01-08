<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

class Fisio extends Model
{
    use HasFactory;
    protected $fillable = [
        'date',
        'time',
        'service_id',
        'branch_id',
        'patient_id',
        'recieption_id',
        'second',
        'comment',
        'fservice_id'
    ];
    /**
     * Default sort by created_at desc.
     *
     * @return void
     */
    protected static function boot()
    {
        parent::boot();
        static::addGlobalScope('order', function (Builder $builder) {
            $builder->orderBy('created_at', 'desc');
        });
    }
    /**
     * Interact with the user's balance.
     */
    protected function date(): Attribute
    {
        return Attribute::make(
            get: fn($value) => Carbon::parse($value)->format('d.m.Y')
        );
    }
    /**
     * Interact with the user's balance.
     */
    protected function time(): Attribute
    {
        return Attribute::make(
            get: fn($value) => substr($value, 0, 5)
        );
    }
    /**
     * Interact with the user's balance.
     */
    public function patient(): BelongsTo
    {
        return $this->belongsTo(User::class, 'patient_id');
    }
}
