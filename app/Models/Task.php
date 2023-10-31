<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class Task extends Model
{
    use HasFactory;
    protected $fillable = ['title', 'desc', 'range', 'start', 'deadline', 'entity_type', 'entity_id', 'data'];

    protected $casts = [
        'data' => 'array',
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
            $builder->orderBy('deadline', 'desc');
        });
    }

    public function files(): MorphMany
    {
        return $this->morphMany(File::class, 'entity');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    /**
     * Get the post's image.
     */
    public function book(): MorphOne
    {
        return $this->morphOne(Book::class, 'bookable');
    }
}
