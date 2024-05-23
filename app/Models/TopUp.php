<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

use function GuzzleHttp\Promise\queue;

class TopUp extends Model
{
    use HasFactory;

    public static $paymethods = [
        'cash' => 'Наличными',
        'card' => 'Картой',
        'qr' => 'Kaspi QR',
        'balance' => 'C баланса',
        'free' => 'Бесплатно'
    ];

    protected $fillable = [
        'sum',
        'user_id',
        'recieption_id'
    ];

    public static function getMethodOptions()
    {
        $methods = [];
        foreach (self::$paymethods as $key => $paymethod) {
            $methods[] = [
                'label' => $paymethod,
                'value' => $key,
            ];
        }
        return $methods;
    }

    /**
     * Interact with the user's balance.
     */
    protected function sum(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => (int)$value / 100,
            set: fn ($value) => (float)$value * 100,
        );
    }

    /**
     * The branch`s locality.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * The branch`s locality.
     */
    public function recieption(): BelongsTo
    {
        return $this->belongsTo(User::class, 'recieption_id');
    }
}
