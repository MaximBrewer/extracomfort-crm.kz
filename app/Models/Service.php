<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;

class Service extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'sort',
        'price',
        'title'
    ];

    public function direction(): BelongsTo
    {
        return $this->belongsTo(Direction::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(ServiceCategory::class, 'service_category_id');
    }

    public function books(): HasMany
    {
        return $this->hasMany(Book::class);
    }

    /**
     * Interact with the user's balance.
     */
    protected function quantity(): Attribute
    {

        return Attribute::make(
            get: function () {
                global $filter;
                if ($filter && $filter['start'] && $filter['end'] && $filter['branch']) {
                    $books = $this->books()->whereRaw('start=time')
                        ->where('status', 'completed')
                        ->where('date', '>=', $filter['start'])
                        ->where('date', '<=', $filter['end'])
                        ->where('branch_id', $filter['branch'])
                        ->where('status', 'completed');
                    if (!empty($filter['specialist'])) $books = $books->whereIn('specialist_id', $filter['specialist']);
                    if (!empty($filter['patient'])) $books = $books->where('patient_id', $filter['patient']);
                    if (!empty($filter['service'])) $books = $books->whereIn('service_id', $filter['service']);
                    return $books->count();
                }
                return 0;
            }
        );
    }

    /**
     * Interact with the user's balance.
     */
    protected function sum(): Attribute
    {
        return Attribute::make(
            get: function () {
                global $filter;
                $sum = 0;
                if ($filter && $filter['start'] && $filter['end'] && $filter['branch']) {
                    $books = $this->books()->whereRaw('start=time')
                        ->where('status', 'completed')
                        ->where('date', '>=', $filter['start'])
                        ->where('date', '<=', $filter['end'])
                        ->where('branch_id', $filter['branch'])
                        ->where('status', 'completed');
                    if (!empty($filter['specialist'])) $books = $books->whereIn('specialist_id', $filter['specialist']);
                    if (!empty($filter['patient'])) $books = $books->where('patient_id', $filter['patient']);
                    if (!empty($filter['service'])) $books = $books->whereIn('service_id', $filter['service']);
                    foreach ($books->with('payments')->get() as $book)
                        foreach ($book->payments as $payment)
                            $sum += $payment->sum;
                }

                return $sum;
            }
        );
    }
}
