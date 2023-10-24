<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Price extends Model
{
    use HasFactory;

    /**
     * Interact with the user's balance.
     */
    protected function value(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => (int)$value / 100,
            set: fn ($value) => (float)$value * 100,
        );
    }

    /**
     * Interact with the user's balance.
     */
    protected function rate(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => (int)$value / 100,
            set: fn ($value) => (float)$value * 100,
        );
    }

    public static function createByMl($price, $offer, $type)
    {
        if (!$priceModel = $offer->prices()->where('type_id', $type->id)->first()) {
            $priceModel = new self();
        }
        $priceModel->value = $price->cost;
        $priceModel->performance = $price->performance;
        $priceModel->currency = $price->currency;
        $priceModel->rate = $price->rate;
        $priceModel->type_id = $type->id;
        $priceModel->save();
        return $priceModel;
    }
}
