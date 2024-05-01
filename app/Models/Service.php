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

                $books = $this->books()->whereRaw('start=time')
                    ->where('status', 'completed');
                if (request()->get('start') && request()->get('end') && request()->branch) {
                    $start = Carbon::parse(request()->get('start'));
                    $end = Carbon::parse(request()->get('end'));
                    $books =  $books->where('date', '>=', $start)
                        ->where('date', '<=', $end)
                        ->where('branch_id', request()->branch->id);
                }
                return $books->count();
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
                $books = $this->books()->whereRaw('start=time')
                    ->where('status', 'completed')->with('payments');
                if (request()->get('start') && request()->get('end') && request()->branch) {
                    $start = Carbon::parse(request()->get('start'));
                    $end = Carbon::parse(request()->get('end'));
                    $books =  $books->where('date', '>=', $start)
                        ->where('date', '<=', $end)
                        ->where('branch_id', request()->branch->id);
                }
                $sum = 0;
                foreach ($books->get() as $book) {
                    foreach ($book->payments as $payment) {
                        $sum += $payment->sum;
                    }
                }
                return $sum;
            }
        );
    }
}
